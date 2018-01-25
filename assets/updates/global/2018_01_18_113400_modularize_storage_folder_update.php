<?php

use Mycelium\Update\Update;
use Mycelium\Update\UpdateException;

/**
 * Separates mycelium storage folder into modules (or sections or whatever)
 *
 * (actually just moves shrooms from root to "shrooms" folder)
 */
class ModularizeStorageFolderUpdate extends Update
{
    public function run()
    {
        // check that no folder "shrooms" exists yet (shouldn't really)
        if ($this->storage->exists("shrooms"))
        {
            $message = "There already exists a shroom folder, I don't know if it's a shroom with that name or some mycelium version mismatch. Aborting update.";

            $this->log->error($message);

            throw new UpdateException($message);
        }

        // get all shrooms
        $shrooms = $this->storage->directories();

        // "update" is not a shroom, this folder has been created by the
        // updater code for logging and stuff
        if (($key = array_search("update", $shrooms)) !== false)
            unset($shrooms[$key]);

        // create the shrooms folder
        $this->log->info("Creating shrooms folder.");
        $this->storage->makeDirectory("shrooms");

        // move all shrooms
        // 
        // (I rely on the OS handling, that it won't lose
        // the shroom in case of an error)
        foreach ($shrooms as $shroom)
        {
            $this->log->info("Moving shroom '{$shroom}'");
            $this->storage->move($shroom, "shrooms/" . $shroom);
        }

        $this->log->info("Shrooms have been moved succesfully.");
    }
}