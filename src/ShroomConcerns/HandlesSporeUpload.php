<?php

namespace Mycelium\ShroomConcerns;

use Illuminate\Http\UploadedFile;
use Carbon\Carbon;

trait HandlesSporeUpload
{
    /**
     * Handles when a spore part gets uploaded
     */
    public function sporePartUploaded(UploadedFile $file, $params)
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
            $spore = $this->revision("master")->putNewSpore(
                $dataPath,
                $context["type"],
                $context["originalName"],
                $this->storage()
            );

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
}