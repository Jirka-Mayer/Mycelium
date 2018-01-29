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

        // load if needed
        if ($this->revisionBag->get($index) === "to-be-loaded")
        {
            $revision = new ShroomRevision($index === "master" ? null : $index);
            $revision->load($this->storage());
            $this->revisionBag->put($index, $revision);
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

        // if the shroom exists
        if ($this->exists)
            $this->loadRevisionBag();
        else
            $this->createRevisionBag();
    }

    /**
     * Load existing revisions from filesystem
     * @return null
     */
    protected function loadRevisionBag()
    {
        $files = collect($this->storage()->files("revisions"));

        // filter revision files (filter junk out)
        $revisionFiles = $files->filter(function ($file) {
            return preg_match("/^revisions\/revision-(master|\d+)\.json$/", $file);
        });

        // get revision names (indices)
        // but only numerical, not the master
        $revisions = $files->map(function ($file) {
            return preg_match("/^revisions\/revision-(\d+)\.json$/", $file);
        });

        /*
            Note: only revision references are loaded,
            the revisions themselves are loaded on demand
            in the ->revision() method
         */

        // reference commited revisions
        foreach ($revisions as $revisionIndex)
            $this->revisionBag->put($revisionIndex, "to-be-loaded");

        // reference master revision
        // (in case the file would not exist, create anyway)
        $this->revisionBag->put("master", "to-be-loaded");
    }

    /**
     * Create new empty revision bag
     * @return null
     */
    protected function createRevisionBag()
    {
        $this->revisionBag = collect();
        $this->revisionBag->put("master", new ShroomRevision(null));
    }

    /**
     * Save revisions
     * @return void
     */
    protected function saveRevisions()
    {
        $this->initializeRevisionBag();

        // save to files
        foreach ($this->revisionBag as $revision)
        {
            // no need to save not even loaded revisions
            if ($revision === "to-be-loaded")
                continue;

            $revision->save($this->storage());
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

        $newMaster->cloneSpores($master);

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