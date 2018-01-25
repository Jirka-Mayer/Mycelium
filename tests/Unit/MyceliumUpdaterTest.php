<?php

namespace MyceliumTests;

use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Mycelium\Update\MyceliumUpdater;
use Illuminate\Log\Writer;
use Monolog\Logger as Monolog;
use Monolog\Handler\StreamHandler;

class MyceliumUpdaterTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->migrate();

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

    /**
     * @test
     */
    public function it_gets_current_version()
    {
        // no version file
        $this->assertEquals(null, $this->updater->getCurrentVersion());

        // create version file and test again
        $this->storage->put("version.json", '{"global": "some_version"}');
        $this->assertEquals("some_version", $this->updater->getCurrentVersion());
    }

    /**
     * @test
     */
    public function it_sets_current_version()
    {
        // no version file -> creates one
        $this->assertFalse($this->storage->exists("version.json"));
        $this->updater->setCurrentVersion("some_version");
        $this->assertTrue($this->storage->exists("version.json"));

        // it has set the version
        $this->assertEquals(
            ["global" => "some_version"],
            json_decode($this->storage->get("version.json"), true)
        );

        // overwrite the version
        $this->updater->setCurrentVersion("new_version");

        // it has set the version
        $this->assertEquals(
            ["global" => "new_version"],
            json_decode($this->storage->get("version.json"), true)
        );
    }

    /**
     * @test
     */
    public function it_runs_updates_and_updates_version()
    {
        // set version
        $this->updater->setCurrentVersion("0000_00_00_000000_some_version");

        // register the update (manually)
        $this->updater->updateList->addUpdateRecord(
            "/foo/bar/0000_00_00_000000_some_version.php"
        );
        $this->updater->updateList->addUpdateRecord(
            __DIR__ . "/Mocks/2018_01_25_000000_fake_global_update.php"
        );

        // run the update
        $this->updater->update();

        // check new version
        $this->assertEquals(
            "2018_01_25_000000_fake_global_update",
            $this->updater->getCurrentVersion()
        );

        // check the update
        $this->assertTrue($this->storage->exists("update-has-run.txt"));
    }
}