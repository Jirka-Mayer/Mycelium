<?php

namespace MyceliumTests;

use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Log\Writer;
use Monolog\Logger as Monolog;
use Monolog\Handler\StreamHandler;
use Mycelium\Update\ShroomUpdater;
use Mycelium\Shroom;

class ShroomUpdaterTest extends TestCase
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

    /**
     * @test
     */
    public function it_obtains_shroom_filesystem()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);

        $fs = $this->updater->createShroomFilesystem($shroom);

        $this->assertTrue($fs->exists("version.json"));
    }

    /**
     * @test
     */
    public function shroom_returns_its_version()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);

        // has version file
        $this->assertEquals(
            json_decode(
                file_get_contents(__DIR__ . "/../../assets/updates/default-shroom-version-file.json"),
                true
            )["shroom"],
            $shroom->getCurrentVersion()
        );

        // no version file
        $fs = $this->updater->createShroomFilesystem($shroom);
        $fs->delete("version.json");

        $this->assertEquals(
            null,
            $shroom->getCurrentVersion()
        );
    }

    /**
     * @test
     */
    public function shroom_sets_its_version()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);

        $shroom->setCurrentVersion("new_version");

        $fs = $this->updater->createShroomFilesystem($shroom);
        $this->assertEquals(
            "new_version",
            json_decode($fs->get("version.json"), true)["shroom"]
        );
    }

    /**
     * @test
     */
    public function it_updates_a_shroom()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);
        $shroom->setCurrentVersion("2017_00_00_000000_old_version");

        $this->updater->updateList->addUpdateRecord(
            "/foo/2017_00_00_000000_old_version.php");
        $this->updater->updateList->addUpdateRecord(
            __DIR__ . "/Mocks/2018_01_25_000000_fake_shroom_update.php");

        // run the update
        $this->updater->updateShroom($shroom);

        // update has done some changes
        $fs = $this->updater->createShroomFilesystem($shroom);
        $this->assertTrue($fs->exists("shroom-update-has-run.txt"));
        $this->assertEquals(
            "Yep, it did!",
            $fs->get("shroom-update-has-run.txt")
        );

        // version has changed
        $this->assertEquals(
            "2018_01_25_000000_fake_shroom_update",
            $shroom->getCurrentVersion()
        );
    }
}