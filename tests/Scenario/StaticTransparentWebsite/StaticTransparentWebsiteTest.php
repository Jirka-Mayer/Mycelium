<?php

namespace MyceliumTests\Scenario\StaticTransparentWebsite;

use Tests\Scenario\ScenarioTestCase;
use Mycelium\Shroom;

class StaticTransparentWebsiteTest extends ScenarioTestCase
{
    public $scenario = "StaticTransparentWebsite";

    public function setUp()
    {
        parent::setUp();

        $this->migrate();
    }

    /**
     * Disables guard in the index controller
     */
    protected function login()
    {
        $this->app["session"]->put("bob is logged in", true);
    }

    /**
     * Enables guard in the index controller
     */
    protected function logout()
    {
        $this->app["session"]->put("bob is logged in", false);
    }

    /**
     * @test
     */
    public function accessing_new_page_creates_shroom_instance()
    {
        $this->assertDatabaseMissing("shrooms", [
            "id" => "index"
        ]);

        $this->get("/");

        $this->assertDatabaseHas("shrooms", [
            "id" => "index"
        ]);
    }

    /**
     * @test
     */
    public function visitor_can_view_index_page_with_default_title()
    {
        $response = $this->get("/");
        
        $response->assertSee("Default page title");
        $response->assertSee("Nothing to see here yet");
    }

    /**
     * @test
     */
    public function visitor_cannot_edit_the_page()
    {
        $response = $this->get("/edit");

        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function signed_in_user_can_edit_the_page()
    {
        $this->login();

        $response = $this->get("/edit");
        
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function user_can_edit_content_and_visitor_sees_it()
    {
        $this->login();
        $response = $this->post("/edit", [
            "data" => [
                "content" => [
                    "@type" => "mycelium::rich-text",
                    "ops" => [
                        ["insert" => "New page content!\n"]
                    ]
                ]
            ]
        ]);
        $response->assertStatus(200);

        $this->logout();
        $response = $this->get("/");
        $response->assertSee("New page content!");
    }

    /**
     * @test
     */
    public function user_cannot_edit_shroom_title()
    {
        $this->login();
        $response = $this->post("/edit", [
            "title" => [
                    "@type" => "mycelium::rich-text",
                    "ops" => [
                        ["insert" => "New title!\n"]
                    ]
                ]
        ]);
        $response->assertStatus(200);

        $this->assertDatabaseHas("shrooms", [
            "id" => "index",
            "title" => null
        ]);
    }
}