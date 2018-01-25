<?php

namespace Mycelium\Update;

use Illuminate\Support\Str;

/**
 * A container for a list of updates
 */
class UpdateList
{
    /**
     * List of updates - list of collections:
     * [
     *     "name" => update name
     *     "path" => absolute update path
     * ]
     */
    public $updates = null;

    public function __construct()
    {
        $this->updates = collect();
    }

    /**
     * Add a repository of updates (a folder)
     *
     * @param string $path Absolute path to the folder
     */
    public function addRepository($path)
    {
        $contents = scandir($path);
        $files = [];

        foreach ($contents as $c)
        {
            if (!is_file($path . "/" . $c))
                continue;

            if (pathinfo($path . "/" . $c, PATHINFO_EXTENSION) != "php")
                continue;

            $this->addUpdateRecord($path . "/" . $c);
        }
    }

    /**
     * Adds an update record
     */
    public function addUpdateRecord($path)
    {
        // nope, don't do that, cannot test non-existing files
        //$path = realpath($path);

        $file = pathinfo($path, PATHINFO_BASENAME);
        $name = pathinfo($path, PATHINFO_FILENAME);
        $class = Str::studly(
            implode(
                '_',
                array_slice(
                    explode('_', pathinfo($path, PATHINFO_FILENAME)),
                    4
                )
            )
        );

        $this->updates[] = collect([
            "class" => $class,
            "name" => $name,
            "file" => $file,
            "path" => $path
        ]);

        // keep it sorted
        $this->sortUpdates();
    }

    /**
     * Sorts the update list
     */
    public function sortUpdates()
    {
        $this->updates = $this->updates->sortBy("file")->values();
    }

    /**
     * Returns a collection of updates to be run
     */
    public function getUpdatesToRun($currentVersion)
    {
        // sort updates first (just in case)
        $this->sortUpdates();

        // if null, run all updates
        if ($currentVersion === null)
            return $this->updates;

        // test version existance
        if (!$this->updates->contains("name", $currentVersion))
            throw new UpdateException(
                "The version $currentVersion is not present in the loaded repositories."
            );

        // filter newer updates
        return $this->updates->filter(function ($update) use ($currentVersion) {
            return $update["name"] > $currentVersion;
        });
    }

    /**
     * Executes a given update
     *
     * The update has to be the correct one in order and the method
     * does not update current version or anything
     */
    public function runUpdate($updateRecord, $filesystem, $log)
    {
        $this->loadUpdate($updateRecord);

        $update = $this->resolveUpdateInstance($updateRecord, $filesystem, $log);

        $update->run();
    }

    /**
     * Loads update (as a php class)
     */
    protected function loadUpdate($updateRecord)
    {
        require_once $updateRecord["path"];
    }

    /**
     * Returns the resolved update instance
     */
    protected function resolveUpdateInstance($updateRecord, $filesystem, $log)
    {
        $update = new $updateRecord["class"];

        $update->setFilesystem($filesystem);
        $update->setLog($log);

        return $update;
    }
}