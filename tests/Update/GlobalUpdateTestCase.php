<?php

namespace Tests\Update;

use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Mycelium\Update\MyceliumUpdater;
use Illuminate\Log\Writer;
use Monolog\Logger as Monolog;
use Monolog\Handler\StreamHandler;

abstract class GlobalUpdateTestCase extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        // mock filesystem
        Storage::fake("mycelium-fake");
        $this->storage = Storage::drive("mycelium-fake");

        // mock logger
        $this->log = new Writer(new Monolog("fake-update-log"));
        $this->log->getMonolog()->pushHandler(
            new StreamHandler("php://stderr", Monolog::ERROR)
        );
        
        // create updater
        $this->updater = new MyceliumUpdater(
            $this->storage,
            $this->log
        );
    }
}