<?php

namespace Mycelium;

use Carbon\Carbon;

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
     * Creates new revision instance
     */
    public function __construct()
    {
        $this->data = collect();
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
    public function exportAttributes()
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
        $attributes = json_decode($fileContents, JSON_OBJECT_AS_ARRAY);

        if ($attributes === null)
            $this->readFileError($fileContents);

        $attributes = collect($attributes);

        $this->data = collect($attributes->get("data", []));
        // spores
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
     * Export properties saved in file
     * @return string
     */
    public function exportToFile()
    {
        $attributes = collect();

        $attributes->put("data", $this->data);
        $attributes->put("spores", []);

        return $attributes->toJson(JSON_PRETTY_PRINT);
    }
}