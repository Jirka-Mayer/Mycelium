<?php

namespace Mycelium\ShroomConcerns;

use Illuminate\Support\Str;
use ArgumentException;

trait HandlesShroomId
{
    /**
     * Indicates if the id has changed
     * and so if we have to handle
     * it properly on saving
     * @var boolean
     */
    protected $idChanged = false;

    /**
     * Actual id currently used
     * @var string|null
     */
    protected $actualId = null;

    /**
     * Setter for the ID
     * @param string $id
     */
    public function setIdAttribute($id)
    {
        // id cannot be changed if it hasn't been created yet
        if (!$this->exists)
        {
            $this->attributes["id"] = $id;
            return;
        }

        if (!$this->idChanged)
            $this->actualId = $this->attributes["id"];

        $this->attributes["id"] = $id;
        $this->idChanged = true;
    }

    /**
     * Getter for the cluster name
     * @return string|null
     */
    public function getClusterAttribute()
    {
        return $this->separateShroomId($this->id)[0];
    }

    /**
     * Setter for the cluster name
     * @param string $cluster
     */
    public function setClusterAttribute($cluster)
    {
        if (Str::slug($cluster) !== $cluster)
            throw new ArgumentException("Cluster name must be a valid slug.");

        $this->id = $this->composeShroomId($cluster, $this->slug);
    }

    /**
     * Getter for the slug
     * @return string
     */
    public function getSlugAttribute()
    {
        return $this->separateShroomId($this->id)[1];
    }

    /**
     * Setter for the slug
     * @param string $slug
     */
    public function setSlugAttribute($slug)
    {
        if (Str::slug($slug) !== $slug)
            throw new ArgumentException("Slug attribute must be a valid slug.");

        $this->id = $this->composeShroomId($this->cluster, $slug);
    }
    
    /**
     * Splits shroom id into it's parts
     * @return array cluster and slug
     */
    protected function separateShroomId($id)
    {
        $pos = strpos($id, "::");

        if ($pos === false)
            return [null, $id];

        return [Str::substr($id, 0, $pos), Str::substr($id, $pos + 2)];
    }

    /**
     * Combines cluster and slug into an id and sets it
     * @param  array $cluster
     * @param  array $slug
     * @return string
     */
    protected function composeShroomId($cluster, $slug)
    {
        if ($cluster === null)
            return $slug;

        return $cluster . "::" . $slug;
    }
}