<?php

namespace MyceliumTests\Feature\ShroomRenderingType;

use Tests\Feature\FeatureTestCase;
use Mycelium\Shroom;

class ShroomRenderingTypeTest extends FeatureTestCase
{
    public $feature = "ShroomRenderingType";

    public function setUp()
    {
        parent::setUp();

        $this->migrate();
    }

    protected function asVisitor()
    {
        $this->app["session"]->put("bob is editor", false);
    }

    protected function asEditor()
    {
        $this->app["session"]->put("bob is editor", true);
    }

    /////////////
    // Visitor //
    /////////////

    /**
     * @test
     */
    public function visitor_doesnt_load_javascript()
    {
        $this->asVisitor();

        $response = $this->get("/");
        $response->assertDontSee("js/vendor/mycelium/mycelium.js");
    }

    ////////////
    // Editor //
    ////////////

    /**
     * @test
     */
    public function editor_does_load_javascript()
    {
        $this->asEditor();

        $response = $this->get("/");
        $response->assertSee("js/vendor/mycelium/mycelium.js");
    }

    /**
     * @test
     */
    public function editor_does_not_get_shroom_instance_created()
    {
        $this->asEditor();

        $response = $this->get("/");
        $response->assertDontSee(
            "window.mycelium.shroom = new window.mycelium.class.Shroom"
        );
    }

    ////////////////////////////
    // Editor in editing mode //
    ////////////////////////////

    /**
     * @test
     */
    public function editing_editor_does_load_javascript()
    {
        $this->asEditor();

        $response = $this->get("/edit");
        $response->assertSee("js/vendor/mycelium/mycelium.js");
    }

    /**
     * @test
     */
    public function editing_editor_does_get_shroom_instance_created()
    {
        $this->asEditor();

        $response = $this->get("/edit");
        $response->assertSee(
            "window.mycelium.shroom = new window.mycelium.class.Shroom"
        );
    }
}