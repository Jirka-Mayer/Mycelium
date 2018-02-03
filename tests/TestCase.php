<?php

namespace Tests;

use Illuminate\Support\Facades\Storage;
use Mycelium\Shroom;
use Artisan;

class TestCase extends \Illuminate\Foundation\Testing\TestCase
{
    use CreatesApplication;

    public function migrate()
    {
        /*require_once __DIR__ . "/../assets/migrations/2017_08_29_193421_create_shrooms_table.php";
        (new \CreateShroomsTable)->up();*/

        Artisan::call("mc:shroom:table");
    }

    public function mockFilesystem()
    {
        Storage::fake("mycelium-fake");
        Shroom::setFilesystem(Storage::drive("mycelium-fake"));
    }
}