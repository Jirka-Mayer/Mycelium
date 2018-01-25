<?php

namespace Mycelium\Console\Update;

use Illuminate\Console\Command;
use Mycelium\Shroom;

class ChangeUserPassword extends Command
{
    protected $signature = "mycelium:update";

    protected $description = "Update mycelium storage";

    public function handle()
    {
        /*
            This command updates the mycelium storage folder layout,
            layout and contents of all shrooms and so on.

            Basically everything other than code - that is handled by composer
         */

        // update the mycelium storage folder layout (global updates)
        $this->info("Running global update...");
        $this->runGlobalUpdates();
        $this->info("Global update done.");

        // update individual shrooms
        // (now that they are in the correct location)
        $this->info("Running shroom updates...");
        $this->runShroomUpdates();
        $this->info("Shroom updates done.");

        $this->info("All updates have been successfully run.");
    }

    protected function runGlobalUpdates()
    {
        $updater = app("mycelium.updater");

        $updater->update();
    }

    protected function runShroomUpdates()
    {
        $updater = app("mycelium.shroom-updater");

        // get all shrooms
        $shrooms = Shroom::all();

        $bar = $this->output->createProgressBar(count($shrooms));

        // run each shroom through the updater
        foreach ($shrooms as $shroom)
        {
            $this->info("Shroom {$shroom->slug}.");
            
            $updater->updateShroom($shroom)

            $bar->advance();
        }

        $bar->finish();
    }
}