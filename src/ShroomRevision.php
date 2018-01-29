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
    public function __construct($index = null)
    {
        $this->index = $index;
        $this->data = collect();
        $this->spores = collect();
    }

    /**
     * Clone the revision
     */
    public function __clone()
    {
        $this->data = clone $this->data;
        $this->spores = clone $this->spores;
    }

    /**
     * Load the revision from file
     */
    public function load(Filesystem $storage)
    {
        // revision file name
        $name = $this->index;
        if ($name === null)
            $name = "master";

        $filename = "revisions/revision-{$name}.json";

        // does the file exist?
        if (!$storage->exists($filename))
            $storage->put($filename, "{}");

        // load the file
        $file = $storage->get($filename);

        // parse
        $attributes = json_decode($file, true);

        // parsing error
        if (!is_array($attributes))
            $this->loadError($file);

        // array to collection
        $attributes = collect($attributes);

        // load commited at property
        if ($attributes->get("comittedAt") === null)
            $this->comittedAt = null;
        else
            $this->comittedAt = new Carbon($attributes->get("comittedAt"));

        // load other properties
        $this->title = $attributes->get("title", "");

        // load data and spores
        $this->data = collect($attributes->get("data", []));
        $this->spores = collect($attributes->get("spores", []));
    }

    /**
     * Handle file loading error
     */
    protected function loadError($fileContents)
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
     * Save data into the file
     */
    public function save(Filesystem $storage)
    {
        // prepare file contents
        $attributes = collect();
        
        $attributes->put("title", $this->title);

        if ($this->comittedAt === null)
            $attributes->put("comittedAt", null);
        else
            $attributes->put("comittedAt", $this->comittedAt->format("Y-m-d H:i:s"));

        $attributes->put("data", $this->data);
        $attributes->put("spores", $this->spores);

        $file = $attributes->toJson(JSON_PRETTY_PRINT);

        // get revision file name
        $name = $this->index;
        if ($name === null)
            $name = "master";

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
     *
     * Causes the revision to be saved.
     */
    public function putNewSpore($filePath, $sporeType, $name, Filesystem $storage)
    {
        // if this is not a master, you cannot add a spore
        if ($this->index !== null)
            throw new \Exception(
                "You cannot put new spore into an already comitted revision.");

        // get filename
        $filename = Str::slug(pathinfo($name, PATHINFO_FILENAME));

        // if no extension, "" is returned
        $extension = Str::slug(Str::lower(pathinfo($name, PATHINFO_EXTENSION)));

        // create file handle
        $handle = $filename . "_" . Str::random(5) . "." . $extension;

        // create a record in the revision
        $spore = [
            "handle" => $handle,
            "type" => $sporeType,
            "extension" => $extension,
            "attributes" => []
        ];
        $this->spores->put($handle, $spore);

        // store the file (move it)
        // (move because the filePath points into the "upload" folder)
        $storage->move($filePath, "spores/{$handle}");

        // save spore records
        $this->save($storage);

        return $spore;
    }
}