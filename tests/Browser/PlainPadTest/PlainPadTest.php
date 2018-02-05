<?php

namespace Tests\Browser\PlainPadTest;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Mycelium\Shroom;

class PlainPadTest extends DuskTestCase
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
            "routeNamespace" => "Tests\\Browser\\PlainPadTest",
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
}
