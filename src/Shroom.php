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

        parent::save($options);
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