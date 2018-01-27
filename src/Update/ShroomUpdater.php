<?php

namespace Mycelium\Update;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Contracts\Logging\Log;
use Mycelium\Shroom;

class ShroomUpdater
{
    /**
     * Reference to the mycelium storage
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
     * Updates a shroom to make it up to date
     */
    public function updateShroom(Shroom $shroom)
    {
        $currentVersion = $shroom->getCurrentVersion();

        $updatesToRun = $this->updateList->getUpdatesToRun($currentVersion);

        $this->log->info("Starting shroom update.", [
            "updatesToRun" => $updatesToRun->pluck("name")->all()
        ]);

        foreach ($updatesToRun as $update)
            $this->runUpdate($shroom, $update, $currentVersion);
    }

    /**
     * Executes a single update on the shroom
     */
    public function runUpdate(Shroom $shroom, $update, $currentVersion)
    {
        // log what's about to happen
        $this->log->info("Starting the {$update["name"]} shroom update.", [
            "shroom" => $shroom->slug,
            "currentVersion" => $currentVersion,
            "update" => $update->all()
        ]);

        // backup the shroom first
        $this->backupShroom($shroom);

        // run the update
        $this->updateList->runUpdate(
            $update,
            $shroom->storage(),
            $this->log
        );

        // update current version
        $shroom->setCurrentVersion($update["name"]);

        // all has been fine, clear backup
        $this->clearBackupDirectory();

        // log that we're done
        $this->log->info("Shroom update successful, new version is {$update["name"]}.");
    }

    /**
     * Emptys the backup directory
     */
    protected function clearBackupDirectory()
    {
        $this->myceliumStorage->deleteDirectory("update/shroom-backup");
    }

    /**
     * Copy shroom folder to make a backup in case of failure
     */
    protected function backupShroom(Shroom $shroom)
    {
        $this->clearBackupDirectory();

        app("files")->copyDirectory(
            $this->myceliumStorage->path($shroom->getDirectoryName()),
            $this->myceliumStorage->path("update/shroom-backup")
        );
    }
}