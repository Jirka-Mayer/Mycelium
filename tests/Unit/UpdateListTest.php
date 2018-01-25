<?php

namespace MyceliumTests;

use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Mycelium\Update\UpdateList;
use Mycelium\Update\UpdateException;
use Illuminate\Log\Writer;
use Monolog\Logger as Monolog;

class UpdateListTest extends TestCase
{
    /**
     * @test
     */
    public function it_adds_a_repo()
    {
        $list = new UpdateList;

        $list->addRepository(__DIR__ . "/../../assets/updates/global");

        // add some custom updates
        $list->addUpdateRecord("/lorem/ipsum/2017_00_00_000000_old_update.php");
        $list->addUpdateRecord("/lorem/ipsum/2018_01_25_000000_newer_update.php");

        $take = $list->updates->take(3);

        $this->assertEquals(
            "OldUpdate",
            $take[0]["class"]
        );

        $this->assertEquals(
            "2018_01_18_113400_modularize_storage_folder_update.php",
            $take[1]["file"]
        );

        $this->assertEquals(
            "ModularizeStorageFolderUpdate",
            $take[1]["class"]
        );

        $this->assertEquals(
            "NewerUpdate",
            $take[2]["class"]
        );
    }

    /**
     * @test
     */
    public function it_returns_updates_to_run()
    {
        $list = new UpdateList;
        $list->addUpdateRecord("/lorem/ipsum/2017_00_00_000000_first.php");
        $list->addUpdateRecord("/lorem/ipsum/2018_01_20_000000_second.php");
        $list->addUpdateRecord("/lorem/ipsum/2018_01_25_000000_third.php");
        $list->addUpdateRecord("/lorem/ipsum/2018_01_26_000000_fourth.php");

        // all updates
        $toRun = $list->getUpdatesToRun(null);
        $this->assertEquals($list->updates->all(), $toRun->all());

        // weird current version
        $this->expectException(UpdateException::class);
        $list->getUpdatesToRun("non-existent_version");

        // general case
        $toRun = $list->getUpdatesToRun("2018_01_20_000000_second");
        $this->assertEquals([
            "2018_01_25_000000_third",
            "2018_01_26_000000_fourth"
        ], $toRun->pluck("name")->all());
    }

    /**
     * @test
     */
    public function it_executes_updates()
    {
        // mock filesystem
        Storage::fake("mycelium-fake");
        $storage = Storage::drive("mycelium-fake");

        // create update list
        $list = new UpdateList;
        $list->addUpdateRecord(
            __DIR__ . "/Mocks/2018_01_25_000000_fake_global_update.php"
        );

        // run the update
        $list->runUpdate(
            $list->updates[0],
            $storage,
            new Writer(new Monolog("fake-update-log"))
        );

        // test result
        $this->assertTrue($storage->exists("update-has-run.txt"));
        $this->assertEquals(
            "Yep, it did!",
            $storage->get("update-has-run.txt")
        );
    }
}