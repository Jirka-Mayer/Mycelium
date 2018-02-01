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

        if ($index === "all")
        {
            // load all revisions and return the bag
            foreach ($this->revisionBag->keys() as $rev)
                $this->revision($rev);

            return $this->revisionBag;
        }

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
        // (master gets inserted into the bag anyway, don't search for it)
        $revisionFiles = $files->filter(function ($file) {
            return preg_match("/^revisions\/revision-(\d+)\.json$/", $file);
        });

        // get revision names (indices)
        // but only numerical, not the master
        $revisions = $revisionFiles->map(function ($file) {
            $matches = [];
            preg_match("/^revisions\/revision-(\d+)\.json$/", $file, $matches);
            return intval($matches[1]);
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
        // clone current master
        $master = $this->revision("master");
        $newMaster = clone $master;

        // turn current master into an ordinary revision
        $master->index = $this->getHighestRevisionIndex() + 1;
        $master->title = $commitTitle;
        $master->comittedAt = Carbon::now();

        // clone spore records -> create references "@sameAsInRevision"
        $newMaster->cloneSpores($master);

        // update storage spore-meta folder names
        $master->renameSporeMetaMasterFolder($this->storage());

        // update revision bag
        $this->revisionBag->put($master->index, $master);
        $this->revisionBag->put("master", $newMaster);

        // the shroom gets saved, because changes to
        // the filesystem has been made
        $this->save();
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

    /**
     * Remove a revision (delete it)
     */
    public function removeRevision($index)
    {
        if ($index === null || $index === "master")
            throw new \Exception("You cannot remove master revision.");

        if (!$this->revisionBag->has($index))
            throw new \Exception("The revision '{$index}' does not exist.");

        // get the removed revision
        $revision = $this->revision($index);

        // resolve spore references for each spore in the revision
        foreach ($revision->spores as $handle => $spore)
        {
            /*
                Note: If this spore is a reference, it won't case a problem,
                that's why we duplicate the content without looking at it
             */

            $references = $this->getAllReferencesToASpore($index, $handle);

            // if empty, no references need to be resolved
            if ($references->count() === 0)
                continue;

            $target = $references->pull(0);
            $this->revision($target)->spores[$handle] = $spore;

            // if this spore is not a reference, move all metadata as well
            if (!array_key_exists("@sameAsInRevision", $spore))
            {
                $from = "spore-meta/{$spore["filename"]}/revision-{$index}";
                $to = "spore-meta/{$spore["filename"]}/revision-{$target}";

                if ($this->storage()->exists($from))
                {
                    if ($this->storage()->exit($to))
                        throw new \Exception("Target folder already exists.");

                    $this->storage()->move($from, $to);
                }
            }
        }

        // remove from bag
        $this->revisionBag->forget($index);

        // remove from storage
        $this->storage()->delete("revisions/revision-{$index}.json");
    }
}