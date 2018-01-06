<?php

namespace MyceliumTests;

use Tests\TestCase;

use Mycelium\Shroom;
use Mycelium\EmptySlugException;

class ShroomTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->migrate();
    }

    /**
     * @test
     */
    public function it_splits_id_to_parts()
    {
        $shroom = new Shroom([
            "id" => "cluster::slug"
        ]);

        $this->assertEquals("cluster", $shroom->cluster);
        $this->assertEquals("slug", $shroom->slug);

        $shroom = new Shroom([
            "id" => "slug"
        ]);

        $this->assertEquals(null, $shroom->cluster);
        $this->assertEquals("slug", $shroom->slug);
    }

    /**
     * @test
     */
    public function it_composes_id_from_parts()
    {
        $shroom = new Shroom;
        $shroom->slug = "slug";
        $shroom->cluster = "cluster";
        $this->assertEquals("cluster::slug", $shroom->id);

        $shroom = new Shroom;
        $shroom->slug = "slug";
        $this->assertEquals("slug", $shroom->id);

        $this->expectException(EmptySlugException::class);
        $shroom = new Shroom;
        $shroom->cluster = "cluster";
        $shroom->save();
    }

    /**
     * @test
     */
    public function it_updates_slug_based_on_title()
    {
        $shroom = new Shroom;
        $shroom->title = "My shroom";
        $this->assertEquals("my-shroom", $shroom->slug);
    }

    /**
     * @test
     */
    public function there_may_not_be_two_same_slugs()
    {
        $a = Shroom::create(["title" => "My shroom"]);
        $b = Shroom::create(["title" => "My shroom"]);

        $this->assertEquals("my-shroom-2", $b->slug);
    }

    /**
     * @test
     */
    public function you_can_create_clustered_shroom_with_title()
    {
        $shroom = Shroom::create([
            "cluster" => "my-cluster",
            "title" => "My shroom"
        ]);

        $this->assertEquals("my-cluster::my-shroom", $shroom->id);
    }

    /**
     * @test
     */
    public function it_saves_data_for_master_revision()
    {
        $shroom = new Shroom([
            "title" => "Foo"
        ]);
        $shroom->data()->put("bar", 42);
        $shroom->save();

        $loadedShroom = Shroom::find($shroom->id);
        $this->assertEquals(42, $loadedShroom->data()->get("bar"));
    }

    /**
     * @test
     */
    public function it_creates_and_saves_revisions()
    {
        $shroom = new Shroom([
            "title" => "Foo"
        ]);
        $shroom->data()->put("bar", 42);
        $shroom->commit("Calculated the answer");
        $shroom->publish();
        $shroom->save();

        $this->assertEquals(1, $shroom->publicRevision);

        $loadedShroom = Shroom::find($shroom->id);

        $this->assertEquals(42, $loadedShroom->data()->get("bar"));
    }
}