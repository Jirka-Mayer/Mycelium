<?php

namespace Mycelium;

use Illuminate\Database\Eloquent\Model;

class Shroom extends Model
{
    use ShroomConcerns\HandlesShroomId,
        ShroomConcerns\GeneratesSlug,
        ShroomConcerns\HasFilesystem,
        ShroomConcerns\HasRevisions,
        ShroomConcerns\HasVersion,
        ShroomConcerns\HasSpores;

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
    protected $casts = [];

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
            throw new EmptySlugException("Slug of the shroom cannot be empty.");

        $this->prepareStorageDirectory();

        $this->saveRevisions($this->storage());

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
        
        if ($this->created_at !== null)
            $overview->put("created_at", $this->created_at->format("Y-m-d H:i:s"));
        else
            $overview->put("created_at", null);

        if ($this->updated_at !== null)
            $overview->put("updated_at", $this->updated_at->format("Y-m-d H:i:s"));
        else
            $overview->put("updated_at", null);

        $overview->put("public_revision", $this->public_revision);

        if ($this->deleted_at !== null)
            $overview->put("deleted_at", $this->deleted_at->format("Y-m-d H:i:s"));
        else
            $overview->put("deleted_at", null);

        // save to file
        $this->storage()->put(
            "overview.json",
            $overview->toJson(JSON_PRETTY_PRINT)
        );
    }

    /**
     * Serializes shroom to an array
     * @return array
     */
    public function toArray()
    {
        $spores = $this->revision("master")->spores->map(function ($spore, $handle) {
            return $this->spore($handle);
        });

        return [
            "id" => $this->id,
            "slug" => $this->slug,
            "cluster" => $this->cluster,

            "title" => $this->title,

            "data" => $this->data("master"),
            "spores" => $spores->toArray(),

            // add shroom base url
            "url" => app("mycelium.routes")->getShroomUrl($this)
        ];
    }
}