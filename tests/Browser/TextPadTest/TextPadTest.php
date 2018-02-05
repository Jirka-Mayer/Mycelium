<?php

namespace Tests\Browser\TextPadTest;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Components\TextPadToolbar;
use Tests\Browser\Components\TextPad;
use Mycelium\Shroom;

class TextPadTest extends DuskTestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->migrate();
        $this->clearStorage();

        if ($shroom = Shroom::find("index"))
            $shroom->delete();
    }

    public function applyTestInfo()
    {
        $this->setTestInfo([
            "routeNamespace" => "Tests\\Browser\\TextPadTest",
            "routesFilePath" => __DIR__ . "/routes.php",
            "views" => __DIR__,
        ]);
    }

    /**
     * @test
     */
    public function it_has_default_content()
    {
        // this is more like a widget test, but you get the point

        $this->browse(function (Browser $browser) {
            $browser->visit("/edit")
                ->assertSee("Default content");
        });
    }

    /**
     * @test
     */
    public function you_can_edit_text()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit("/edit");

            $browser->within(new TextPad, function ($browser) {
                $browser->selectEntireTextPad();
                $browser->typeIntoPad("Lorem ipsum");
            });

            $browser->assertSee("Lorem ipsum");
        });
    }

    /**
     * @test
     */
    public function you_can_format_bold()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit("/edit");

            $browser->within(new TextPad, function ($browser) {
                $browser->selectEntireTextPad();
            });

            $browser->within(new TextPadToolbar, function ($browser) {
                $browser->click("@bold");
            });

            $browser->within(new TextPad, function ($browser) {
                $browser->typeIntoPad("{right}");
            });

            $browser->within(new TextPad, function ($browser) {
                $browser->typeIntoPad(" foo");
            });

            $browser->assertSee("Default content foo");

            $browser->within(new TextPad, function ($browser) {
                $browser->assertPadOpsEqual([
                    [
                        "insert" => "Default content foo",
                        "attributes" => ["bold" => true]
                    ],
                    ["insert" => "\n"]
                ]);
            });
        });
    }

    /**
     * @test
     */
    public function you_can_insert_image()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit("/edit");

            $browser->within(new TextPad, function ($browser) {
                $browser->selectEntireTextPad();
                $browser->typeIntoPad("{backspace}");
            });

            $browser->within(new TextPadToolbar, function ($browser) {
                $browser->attachFileForUpload(__DIR__ . "/fake-upload.jpg");
                $browser->click("@image");
            });
            
            $browser->waitUntilMissing(".mc-toolbar__upload");

            $shroom = Shroom::first();
            $handle = $shroom->revision("master")->spores->first()["handle"];

            $browser->within(new TextPad, function ($browser) use ($handle) {
                $browser->assertPadOpsContain([
                    ["insert" => "\n"],
                    [
                        "insert" => [
                            "image" => ["@spore" => $handle]
                        ]
                    ],
                    ["insert" => "\n"]
                ]);
            });
        });
    }
}
