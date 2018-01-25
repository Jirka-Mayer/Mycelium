<?php

namespace Mycelium\Update;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Contracts\Logging\Log;

/**
 * Handles update of the mycelium data storage - it's layout
 */
class MyceliumUpdater
{
    /**
     * Reference to the mycelium storage filesystem
     */
    public $myceliumStorage = null;

    /**
     * Reference to a log
     */
    public $log = null;

    /**
     * List of all updates
     */
    public $updateList = null;

    public function __construct(Filesystem $myceliumStorage, Log $log)
    {
        $this->myceliumStorage = $myceliumStorage;
        $this->log = $log;

        $this->updateList = new UpdateList;
    }

    /**
     * Load a repository with updates
     */
    public function loadRepository($path)
    {
        $this->updateList->addRepository($path);
    }

    /**
     * Runs all the necessary updates
     */
    public function update()
    {
        $currentVersion = $this->getCurrentVersion();

        $updatesToRun = $this->updateList->getUpdatesToRun($currentVersion);

        $this->log->info("Starting global update.", [
            "updatesToRun" => $updatesToRun->pluck("name")->all()
        ]);

        foreach ($updatesToRun as $update)
            $this->runUpdate($update, $currentVersion);
    }

    /**
     * Returns current global version, or null if no version file found
     */
    public function getCurrentVersion()
    {
        // no version file
        if (!$this->myceliumStorage->exists("version.json"))
            return null;

        // load version file
        $versionFile = $this->myceliumStorage->get("version.json");
        $versionFile = json_decode($versionFile, true);

        // parsing error
        if ($versionFile === null || !array_key_exists("global", $versionFile))
            throw new UpdateException("Mycelium version file couldn't be loaded.");

        return $versionFile["global"];
    }

    /**
     * Sets the current mycelium version
     */
    public function setCurrentVersion($version)
    {
        // no version file, create one
        if (!$this->myceliumStorage->exists("version.json"))
            $this->myceliumStorage->put("version.json", "{}");

        // load version file
        $versionFile = $this->myceliumStorage->get("version.json");
        $versionFile = json_decode($versionFile, true);

        // parsing error
        if ($versionFile === null)
            throw new UpdateException("Mycelium version file couldn't be loaded.");

        // update the value
        $versionFile["global"] = $version;

        // save the file
        $this->myceliumStorage->put(
            "version.json",
            json_encode($versionFile, JSON_PRETTY_PRINT)
        );
    }

    /**
     * Performs a single update
     */
    public function runUpdate($update, $currentVersion)
    {
        // log what's about to happen
        $this->log->info("Starting the {$update["name"]} global update.", [
            "currentVersion" => $currentVersion,
            "update" => $update->all()
        ]);

        // run the update
        $this->updateList->runUpdate($update, $this->myceliumStorage, $this->log);

        // update current version
        $this->setCurrentVersion($update["name"]);

        // log that we're done
        $this->log->info("Update successful, new version is {$update["name"]}.");
    }
}