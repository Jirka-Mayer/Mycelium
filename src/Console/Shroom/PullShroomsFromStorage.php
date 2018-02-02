<?php

namespace Mycelium\Console\Shroom;

use Illuminate\Console\Command;
use Mycelium\Shroom;

class PullShroomsFromStorage extends Command
{
    protected $signature = "mc:shroom:pull";

    protected $description = "Puts all shrooms into the database";

    public function handle()
    {
        $fs = Shroom::getFilesystem();
        $shroomDirs = $fs->directories("shrooms");
        $shroomIds = collect($shroomDirs)->map(function ($dir) {
            return pathinfo($dir, PATHINFO_FILENAME);
        });

        $bar = $this->output->createProgressBar(count($shroomIds));

        foreach ($shroomIds as $id)
        {
            $this->info("Shroom '{$id}'.");

            Shroom::insertIntoDatabase($id);

            $bar->advance();
        }

        $bar->finish();
        $this->info("");

        $this->info("Done.");
    }
}