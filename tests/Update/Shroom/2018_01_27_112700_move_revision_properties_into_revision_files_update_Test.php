<?php

namespace MyceliumTests\Update;

use Tests\Update\ShroomUpdateTestCase;
use Mycelium\Shroom;

class MoveRevisionPropertiesIntoRevisionFilesUpdateTest extends ShroomUpdateTestCase
{
    /**
     * @test
     */
    public function it_moves_properties()
    {
        // setup
        $shroom = Shroom::create(["title" => "Index"]);
        $shroom->storage()->put("revisions/revision-1.json", json_encode([
            "data" => [],
            "spores" => []
        ]));
        $shroom->storage()->put("overview.json", json_encode([
            "revisions" => [
                1 => [
                    "commitedAt" => "2018-01-29 11:40:00",
                    "title" => "Commit title"
                ]
            ]
        ]));

        // ditch version file
        $shroom->setCurrentVersion(null);

        // update
        $this->updater->updateList->addUpdateRecord(
            __DIR__ . "/../../../assets/updates/shroom/2018_01_27_112700_move_revision_properties_into_revision_files_update.php"
        );

        $this->updater->updateShroom($shroom);

        // test
        $this->assertEquals(
            [
                "title" => "Commit title",
                "commitedAt" => "2018-01-29 11:40:00",
                "data" => [],
                "spores" => []
            ],
            json_decode($shroom->storage()->get("revisions/revision-1.json"), true)
        );
    }
}