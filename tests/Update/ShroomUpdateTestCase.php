<?php

namespace Tests\Update;

use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Log\Writer;
use Monolog\Logger as Monolog;
use Monolog\Handler\StreamHandler;
use Mycelium\Update\ShroomUpdater;
use Mycelium\Shroom;

abstract class ShroomUpdateTestCase extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->migrate();

        // mock filesystem
        Storage::fake("mycelium-fake");
        Shroom::setFilesystem(Storage::drive("mycelium-fake"));

        // mock logger
        $this->log = new Writer(new Monolog("fake-update-log"));
        $this->log->getMonolog()->pushHandler(
            new StreamHandler("php://stderr", Monolog::ERROR)
        );
        
        // create updater
        $this->updater = new ShroomUpdater(
            Storage::drive("mycelium-fake"),
            $this->log
        );
    }
}