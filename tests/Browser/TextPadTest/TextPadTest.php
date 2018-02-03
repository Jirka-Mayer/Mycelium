<?php

namespace Tests\Browser\TextPadTest;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class TextPadTest extends DuskTestCase
{
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
    public function example_test()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit("/edit")
                    ->assertSee("Default content");
        });
    }
}
