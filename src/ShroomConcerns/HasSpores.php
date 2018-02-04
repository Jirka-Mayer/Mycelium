<?php

namespace Mycelium\ShroomConcerns;

use Illuminate\Http\UploadedFile;
use Carbon\Carbon;
use Mycelium\Services\Mycelium;
use Illuminate\Support\Str;

trait HasSpores
{
    /**
     * Returns a spore with additional information like url
     * Automatically resolves references "@sameAsInRevision"
     * @return collection
     */
    public function spore($handle, $revision = "master")
    {
        if ($handle === null)
            return null;

        // try to get the spore
        $spore = $this->revision($revision)->spores->get($handle, null);

        // spore does not exist
        if ($spore === null)
            return null;

        // to collection
        $spore = collect($spore);

        // spore is a reference
        if ($spore->has("@sameAsInRevision"))
        {
            // check that it's pointing to an older revision
            if (is_numeric($revision) && $revision <= $spore["@sameAsInRevision"])
                throw new \Exception("Cyclic @sameAsInRevision reference for spore '{$handle}' in revision '{$revision}'.");

            // get the spore recursively
            $resolvedSpore = $this->spore($handle, $spore["@sameAsInRevision"]);

            // check existence
            if ($resolvedSpore === null)
                throw new \Exception("Spore @sameAsInRevision reference is broken for spore '{$handle}' in revision '{$revision}'.");

            // keep a note that it has been resolved
            // (for example if a handler needs to locate a specifinc revision folder)
            $resolvedSpore["@resolvedReferenceTo"] = $spore["@sameAsInRevision"];

            // to collection and overwrite
            $spore = collect($resolvedSpore);
        }

        // add the URL
        $spore["url"] = app("mycelium.routes")
            ->getSporeUrl($this, $spore["handle"]);

        // return the resolved spore
        return $spore;
    }

    /**
     * Handles when a spore part gets uploaded
     */
    public function sporePartUploaded(UploadedFile $file, $params, Mycelium $mycelium)
    {
        // make sure param type is proper
        $params["partIndex"] = intval($params["partIndex"]);
        $params["partCount"] = intval($params["partCount"]);

        // check if the part is valid
        if (!$file->isValid())
            return [
                "success" => false,
                "message" => "File was not uploaded."
            ];

        // context path
        $contextPath = "upload/context-{$params["uploadId"]}.json";
        $context = [];

        // data path
        $dataPath = "upload/data-{$params["uploadId"]}";

        // if the first part just arrived
        if ($params["partIndex"] === 0)
        {
            // check that file extension matches type
            $handler = $mycelium->resolveSporeHandler($params["type"], $this);
            $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $extension = Str::lower($extension);
            if (!$handler->isFileExtensionOk($extension))
                return [
                    "success" => false,
                    "message" => "This file extension is not allowed for given spore type."
                ];

            // create upload context
            $context = [
                "originalName" => $file->getClientOriginalName(),
                "type" => $params["type"],
                "partCount" => $params["partCount"],
                "lastReceivedPart" => 0
            ];
        }
        else
        {
            // check context existance
            if (!$this->storage()->exists($contextPath))
                return [
                    "success" => false,
                    "message" => "This upload ID is wrong."
                ];

            // load context
            $context = json_decode(
                $this->storage()->get($contextPath),
                true
            );

            // check that the context matches
            if (
                $context["originalName"] !== $file->getClientOriginalName()
                || $context["type"] !== $params["type"]
                || $context["partCount"] !== $params["partCount"]
            )
            {
                return [
                    "success" => false,
                    "message" => "Filename does not appear to match the context."
                ];
            }

            if ($context["lastReceivedPart"] !== $params["partIndex"] - 1)
                return [
                    "success" => false,
                    "message" => "This part index was not expected."
                ];
        }

        // create data file if needed
        if (!$this->storage()->exists($dataPath))
            $this->storage()->put($dataPath, "");
        
        // append the part to the file
        $dataFile = fopen($this->storage()->path($dataPath), "a");
        fwrite($dataFile, file_get_contents($file->getRealPath()));
        fclose($dataFile);

        // update context
        $context["lastReceivedPart"] = $params["partIndex"];

        // set updated-at time for timeout erase
        $context["updatedAt"] = Carbon::now()->format("Y-m-d H:i:s");

        // save context
        $this->storage()->put(
            $contextPath,
            json_encode($context, JSON_PRETTY_PRINT)
        );

        // last part has arrived
        if ($params["partIndex"] === $params["partCount"] - 1)
        {
            // delete context file
            $this->storage()->delete($contextPath);

            // create spore
            $handle = $this->revision("master")->putNewSpore(
                $dataPath,
                $context["type"],
                $context["originalName"],
                $this,
                $mycelium
            );

            // fetch the spore
            $spore = $this->spore($handle);

            // save the shroom
            $this->save();

            return [
                "success" => true,
                "message" => "Upload was successful.",
                "spore" => $spore
            ];
        }
        else
        {
            return [
                "success" => true,
                "message" => "Waiting for the next part.",
                "spore" => null
            ];
        }
    }

    /**
     * Returns a collection of all revisions, that reference this spore
     * (resp. all spore versions of this spore that reference this version)
     * (a spore cannot be referenced from a different spore obviously)
     */
    public function getAllReferencesToASpore($revisionIndex, $sporeHandle)
    {
        if ($revisionIndex === "master" || $revisionIndex === null)
            throw new \Exception("Master spore cannot be referenced, there's no point in calling this method on master.");

        $references = collect();

        foreach ($this->revisionBag as $name => $revision)
        {
            // older revision cannot reference a newer one, obviously
            if ($name !== "master")
                if ($name <= $revisionIndex)
                    continue;

            $spore = $revision->spores->get($sporeHandle, []);
            $spore = collect($spore);

            if ($spore->get("@sameAsInRevision", null) === $revisionIndex)
                $references[] = $name;
        }

        // sort and keep master last
        return $references->sort(function ($a, $b) {
            if ($a === "master")
                return true;
            if ($b === "master")
                return false;
            return $a > $b;
        })->values();
    }

    /**
     * Goes through the shroom and remvoes unused spored
     * (spores that are not referenced in data)
     *
     * Returns an array of removed spore handles
     */
    public function removeUnusedSpores()
    {
        $removedSpores = [];

        /*
            Note: spore cannot be explicitly deleted, so if it was
            used in an old revision, it is still present in the
            master revision. To delete such spore, delete the old revision
            and run this method.
         */
        
        // all spores in the shroom
        $sporeHandles = $this->revision("master")->spores->keys();
        $revisions = $this->revision("all");

        // for each spore
        foreach ($sporeHandles as $handle)
        {
            // is it referenced in data of any revision?
            $referenced = false;
            foreach ($revisions as $revision)
            {
                if ($revision->isSporeReferencedInData($handle))
                {
                    $referenced = true;
                    break;
                }
            }

            // if so, don't remove it
            if ($referenced)
                continue;

            // get the spore info
            $spore = $this->spore($handle);

            // now we can remove the spore, because it's not used anywhere

            // take all places where it's located and remove
            foreach ($revisions as $revision)
            {
                if ($revision->spores->has($handle))
                    $revision->spores->forget($handle);
            }

            // remove from storage
            $this->storage()->delete("spores/{$handle}");
            
            if ($spore->has("filename"))
                $this->storage()->deleteDirectory("spore-meta/{$spore["filename"]}");

            // add to list
            $removedSpores[] = $handle;
        }

        // save revision files
        $this->saveRevisions();

        return $removedSpores;
    }
}