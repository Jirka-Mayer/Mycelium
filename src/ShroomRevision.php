<?php

namespace Mycelium;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\COntracts\Filesystem\Filesystem;

/**
 * Represents data of a single shroom revision
 */
class ShroomRevision
{
    /**
     * Revision index, null defines a master
     * @var int|null
     */
    public $index = null;

    /**
     * Revision title (null for master)
     * @var string|null
     */
    public $title = null;

    /**
     * Commit time, (null for master)
     * @var \Carbon\Carbon|null
     */
    public $comittedAt = null;

    /**
     * Data in the shroom
     * @var collection
     */
    public $data;

    /**
     * Spores in the shroom
     * @var collection
     */
    public $spores;

    /**
     * Creates new revision instance
     */
    public function __construct()
    {
        $this->data = collect();
        $this->spores = collect();
    }

    /**
     * Create a revision save in database
     */
    public static function fromDatabase($index, $attributes, $fileContents)
    {
        $revision = new static;
        $revision->index = $index;
        $revision->readAttributes($attributes);
        $revision->readFile($fileContents);
        return $revision;
    }

    /**
     * Create master revision
     */
    public static function master($fileContents)
    {
        $revision = new static;
        $revision->readFile($fileContents);
        return $revision;
    }

    /**
     * Clone the revision
     */
    public function __clone()
    {
        $this->data = clone $this->data;
    }

    /**
     * Load properties saved in the database
     */
    protected function readAttributes($attributes)
    {
        $attributes = collect($attributes);

        $this->title = $attributes->get("title");
        $this->comittedAt = new Carbon($attributes->get("comittedAt"));
    }

    /**
     * Export properties saved in the database
     * @return array
     */
    public function exportDatabaseAttributes()
    {
        $attributes = collect();

        $attributes->put("title", $this->title);
        $attributes->put("comittedAt", $this->comittedAt->format("Y-m-d H:i:s"));

        return $attributes->toArray();
    }

    /**
     * Load properties saved in a file
     */
    protected function readFile(string $fileContents)
    {
        $attributes = json_decode($fileContents, true);

        if ($attributes === null)
            $this->readFileError($fileContents);

        $attributes = collect($attributes);

        $this->data = collect($attributes->get("data", []));
        $this->spores = collect($attributes->get("spores", []));
    }

    protected function readFileError($fileContents)
    {
        // log the error
        // note the file as damaged and so on...
        dump([
            "error" => json_last_error(),
            "msg" => json_last_error_msg(),
            "file" => $fileContents
        ]);
    }

    /**
     * Save data stored in the file
     * @return string
     */
    public function saveFile(Filesystem $storage)
    {
        // get revision name
        $name = $this->index;
        if ($name === null)
            $name = "master";

        // prepare file contents
        $attributes = collect();
        $attributes->put("data", $this->data);
        $attributes->put("spores", $this->spores);
        $file = $attributes->toJson(JSON_PRETTY_PRINT);

        // save the file
        $storage->put(
            "revisions/revision-{$name}.json",
            $file
        );
    }

    ////////////
    // Spores //
    ////////////

    /**
     * This method clones all spores,
     * called on revision commit
     */
    public function cloneSpores(ShroomRevision $oldMaster)
    {
        // erase local spores
        $this->spores = collect();

        // set reference for each spore
        foreach ($oldMaster->spores as $handle => $spore)
        {
            $this->spores->put(
                $handle,
                ["@sameAsInRevision" => $oldMaster->index]
            );
        }
    }

    /**
     * Put into the revision a new spore
     */
    public function putNewSpore($file, Filesystem $storage)
    {
        // slugify name
        $name = $file->name;

        // get filename
        $filename = pathinfo($name, PATHINFO_FILENAME);

        // if no extension, "" is returned
        $extension = Str::lower(pathinfo($name, PATHINFO_EXTENSION));

        // get random string
        $randomString = Str::random(5);

        // create file handle
        $handle = $filename . "_" . $randomString . "." . $extension;

        // get mime type
        $mime = $file->getMimeType();

        /*
            Create a spore class that can handle all of this
         */

        // create a record in the revision
        $spore = [
            "handle" => $handle,
            "type" => "image",
            "extension" => $extension,
            "mime" => $mime,
            "attributes" => []
        ];
        $this->spores->put($handle, $spore);

        // store the file
        $storage->putFileAs("spores", $file, $handle);

        // save spore records
        $this->saveFile($storage);

        return $spore;
    }
}