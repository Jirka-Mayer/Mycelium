<?php

namespace Mycelium\ShroomConcerns;

use Mycelium\ShroomRevision;
use Carbon\Carbon;

trait HasRevisions
{
    /**
     * Bag of all revisions
     * @var collection
     */
    protected $revisionBag = null;

    /**
     * If the shroom is transparent, there always has to
     * be a revision shown when viewing
     *
     * (this is just a runtime flag, not saved to database, set in controller)
     * @var boolean
     */
    public $transparent = false;

    /**
     * Sets the public revision attribute with some guards
     */
    public function setPublicRevisionAttribute($index)
    {
        if (!$this->revisionBag->has($index))
            throw new ArgumentException("There's no revision with index {$index}.");

        if ($index === "master")
            throw new ArgumentException("You cannot publish master revision.");

        $this->attributes["public_revision"] = $index;
    }

    /**
     * Returns the public revision
     */
    public function getPublicRevisionAttribute()
    {
        return $this->attributes["public_revision"];
    }

    /**
     * Returns a revision
     * @param int|string $index Revision index, or "master" (or null) or "public"
     * @return collection collection of \Mycelium\ShroomRevision
     */
    public function revision($index = null)
    {
        if ($index === null)
            $index = "master";

        $this->initializeRevisionBag();

        if ($index === "public")
        {
            if ($this->isPublished())
                return $this->revision($this->publicRevision);
            else if ($this->transparent)
                return $this->revision("master");
            else
                return null;
        }

        return $this->revisionBag->get($index, null);
    }

    /**
     * Initializes the revision bag instance
     * But not if created already
     * @return null
     */
    protected function initializeRevisionBag()
    {
        if ($this->revisionBag !== null)
            return;

        $this->revisionBag = collect();

        if ($this->exists)
            $this->loadRevisionBag();
        else
            $this->createRevisionBag();
    }

    /**
     * Load revisions from database and filesystem
     * @return null
     */
    protected function loadRevisionBag()
    {
        if (!is_array($this->revisions))
            $this->revisions = [];

        foreach ($this->revisions as $index => $attributes)
        {
            $this->revisionBag->put(
                intval($index),
                ShroomRevision::fromDatabase(
                    $index,
                    $attributes,
                    static::$filesystem->get(
                        $this->getDirectoryName(null, "revisions/revision-{$index}.json")
                    )
                )
            );
        }

        $this->revisionBag->put("master", ShroomRevision::master(
            static::$filesystem->get(
                $this->getDirectoryName(null, "revisions/revision-master.json")
            )
        ));
    }

    /**
     * Create new empty revision bag
     * @return null
     */
    protected function createRevisionBag()
    {
        $this->revisionBag->put("master", new ShroomRevision);
    }

    /**
     * Save revisions
     * @return void
     */
    protected function saveRevisions()
    {
        $this->initializeRevisionBag();

        // prepare for database saving
        $revisions = [];
        foreach ($this->revisionBag as $index => $revision)
        {
            if (is_numeric($index))
                $revisions[$index] = $revision->exportAttributes();
        }
        $this->revisions = $revisions;

        // save to files
        foreach ($this->revisionBag as $index => $revision)
        {
            static::$filesystem->put(
                $this->getDirectoryName(null, "revisions/revision-{$index}.json"),
                $revision->exportToFile()
            );
        }
    }

    /**
     * Commit a revision
     */
    public function commit($commitTitle)
    {
        $master = $this->revision("master");
        $newMaster = clone $master;

        $master->index = $this->getHighestRevisionIndex() + 1;
        $master->title = $commitTitle;
        $master->comittedAt = Carbon::now();

        $this->revisionBag->put($master->index, $master);
        $this->revisionBag->put("master", $newMaster);
    }

    /**
     * Publish revision
     * The latest if no argument; the one indexed if one argument
     */
    public function publish($index = null)
    {
        if ($index === null)
            $index = $this->getHighestRevisionIndex();

        if ($this->revisionBag->count() < 2)
            throw new \RuntimeException("There are no revisions to publish.");

        $this->publicRevision = $index;
    }

    /**
     * Returns true if there exists a public revision
     * @return boolean
     */
    public function isPublished()
    {
        return $this->publicRevision !== null;
    }

    /**
     * Returns index of the highest comitted revision
     */
    protected function getHighestRevisionIndex()
    {
        $max = 0;

        foreach ($this->revisionBag as $index => $revision)
        {
            if (is_numeric($index) && $index > $max)
                $max = $index;
        }

        return $max;
    }
}