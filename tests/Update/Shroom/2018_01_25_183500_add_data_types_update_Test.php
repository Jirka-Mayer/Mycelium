<?php

namespace MyceliumTests\Update;

use Tests\Update\ShroomUpdateTestCase;
use Mycelium\Shroom;

class AddDataTypesUpdateTest extends ShroomUpdateTestCase
{
    /**
     * @test
     */
    public function it_adds_type_to_rich_text()
    {
        // setup
        $shroom = Shroom::create(["title" => "Index"]);
        
        // test plain-text
        $shroom->data()->put("title", "Lorem ipsum");

        // test rich-text with table
        $shroom->data()->put("body", ["ops" => [
            ["insert" => ["table" => '{"some": "json", "bar": 42}']]
        ]]);

        $shroom->save();

        // ditch version file
        $shroom->setCurrentVersion(null);

        // update
        $this->updater->updateList->addUpdateRecord(
            __DIR__ . "/../../../assets/updates/shroom/2018_01_25_183500_add_data_types_update.php"
        );

        $this->updater->updateShroom($shroom);

        // load shroom again
        $shroom = Shroom::find("index");

        // test plain text
        $this->assertEquals(
            [
                "@type" => "mycelium::rich-text",
                "ops" => [["insert" => "Lorem ipsum"]]
            ],
            $shroom->data()->get("title")
        );

        // test rich-text
        $this->assertEquals(
            [
                "@type" => "mycelium::rich-text",
                "ops" => [["insert" => [
                    "table" => [
                        "some" => "json",
                        "bar" => 42
                    ]
                ]]]
            ],
            $shroom->data()->get("body")
        );
    }
}