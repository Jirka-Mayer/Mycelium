<?php

namespace Mycelium\Console\Update;

use Illuminate\Console\Command;

class ChangeUserPassword extends Command
{
    protected $signature = "mycelium:init";

    protected $description = "Initialize mycelium update system";

    public function handle()
    {
        /*
            This command should be run at the beginning before any data
            is stored

            It creates the version file that tracks the version of the
            data storage layout
         */

        $fs = app("mycelium.filesystem");

        // create the version file
        $fs->put(
            "version.json",
            file_get_contents(
                __DIR__ . "/../../../assets/updates/default-global-version-file.json"
            )
        );
    }
}