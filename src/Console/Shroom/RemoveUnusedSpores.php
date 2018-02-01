<?php

namespace Mycelium\Console\Shroom;

use Illuminate\Console\Command;
use Mycelium\Shroom;

class RemoveUnusedSpores extends Command
{
    protected $signature = "mycelium:shroom:remove-unused-spores";

    protected $description = "Removes unused spores in all shrooms";

    public function handle()
    {
        // get all shrooms
        $shrooms = Shroom::all();

        $freedSpace = 0;

        $bar = $this->output->createProgressBar(count($shrooms));

        // run each shroom through the process
        foreach ($shrooms as $shroom)
        {
            $this->info("Shroom '{$shroom->id}'.");

            $sizeBefore = $shroom->getSize();
            
            $removed = $shroom->removeUnusedSpores();

            if (count($removed) > 0)
            {
                $freedSpace += $sizeBefore - $shroom->getSize();

                $this->info("Removed spores: [" . implode(", ", $removed) . "]");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("");

        $freedSpaceMB = floor($freedSpace / (1024*1024));
        $this->info("Total freed space: {$freedSpaceMB} MB");
    }
}