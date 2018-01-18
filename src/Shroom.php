<?php

namespace Mycelium;

use Illuminate\Database\Eloquent\Model;

class Shroom extends Model
{
    use ShroomConcerns\HandlesShroomId,
        ShroomConcerns\GeneratesSlug,
        ShroomConcerns\HasFilesystem,
        ShroomConcerns\HasRevisions;

    /**
     * Database table to save shrooms to
     * @var string
     */
    protected $table = "shrooms";

    /**
     * Primary key field
     * @var string
     */
    protected $primaryKey = "id";

    /**
     * Primary key is a string
     * @var string
     */
    protected $keyType = "string";

    /**
     * String key does not increment
     * @var boolean
     */
    public $incrementing = false;

    /**
     * Default values
     * @var array
     */
    protected $attributes = [
        "title" => null,
        "public_revision" => null
    ];

    /**
     * Make the model mass assignable
     * @var array
     */
    protected $guarded = [];

    /**
     * Type casting for attributes
     * @var array
     */
    protected $casts = [
        "revisions" => "array"
    ];

    /**
     * Filesystem for saving shrooms
     * @var \Illuminate\Contracts\Filesystem
     */
    protected static $filesystem;

    /**
     * Returns data stored in the shroom
     * @return collection
     */
    public function data($revision = null)
    {
        $revisionInstance = $this->revision($revision);

        if ($revisionInstance === null)
            return null;

        return $revisionInstance->data;
    }

    /**
     * Saves the model to database and filesystem
     * @return void
     */
    public function save(array $options = [])
    {
        if ($this->slug === "")
            throw new EmptySlugException("Slug of a shroom cannot be empty.");

        $this->prepareStorageDirectory();

        $this->saveRevisions();

        // this data is stored primarily in the database, but a backup
        // in a file is made in case of database crash
        $this->saveOverview();

        parent::save($options);
    }

    /**
     * Saves the overview file containing all the data normally
     * stored in the database
     */
    protected function saveOverview()
    {
        // create overview data
        $overview = collect();

        $overview->put("id", $this->id);
        $overview->put("title", $this->title);
        $overview->put("created_at", $this->created_at->format("Y-m-d H:i:s"));
        $overview->put("updated_at", $this->updated_at->format("Y-m-d H:i:s"));
        $overview->put("public_revision", $this->public_revision);
        $overview->put("deleted_at", $this->deleted_at);
        $overview->put("revisions", $this->revisions);

        // save to file
        static::$filesystem->put(
            $this->getDirectoryName(null, "overview.json"),
            $overview->toJson(JSON_PRETTY_PRINT)
        );
    }

    /**
     * Serializes shroom to an array
     * @return array
     */
    public function toArray()
    {
        return [
            "id" => $this->id,
            "slug" => $this->slug,
            "cluster" => $this->cluster,

            "title" => $this->title,

            "data" => $this->data("master")
        ];
    }
}