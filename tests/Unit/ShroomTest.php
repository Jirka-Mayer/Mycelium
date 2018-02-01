<?php

namespace MyceliumTests;

use Tests\TestCase;

use Mycelium\Shroom;
use Mycelium\EmptySlugException;
use Intervention\Image\ImageManagerStatic as Image;

class ShroomTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->migrate();
        $this->mockFilesystem();
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
    public function it_returns_its_size()
    {
        $shroom = new Shroom(["title" => "My shroom"]);
        
        // not saved yet
        $this->assertEquals(0, $shroom->getSize());

        $shroom->save();

        // some positive size
        $this->assertGreaterThan(0, $shroom->getSize());
    }

    ///////////////
    // Revisions //
    ///////////////

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

    /**
     * @test
     */
    public function revisions_get_loaded_properly()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);
        $shroom->commit("Lorem");
        $shroom->save();

        $loadedShroom = Shroom::first();

        $this->assertEquals(
            [1, "master"],
            $loadedShroom->revision("all")->keys()->toArray()
        );
    }

    /**
     * @test
     */
    public function it_return_null_on_unpublished_public_revision()
    {
        $shroom = new Shroom(["title" => "My shroom"]);

        $this->assertEquals(null, $shroom->revision("public"));

        $shroom->commit("Lorem ipsum");
        $shroom->publish();

        $this->assertNotEquals(null, $shroom->revision("public"));
    }

    /**
     * @test
     */
    public function transparent_shrooms_never_return_null()
    {
        $shroom = new Shroom(["title" => "My shroom"]);
        $shroom->transparent = true;

        $this->assertNotEquals(null, $shroom->revision("public"));

        $shroom->commit("Lorem ipsum");
        $shroom->publish();

        $this->assertNotEquals(null, $shroom->revision("public"));
    }

    /**
     * @test
     */
    public function revision_can_be_removed()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);
        $shroom->data()->put("body", "foo");
        $shroom->save();
        $shroom->commit("Lorem ipsum");

        $this->assertEquals([
            "revisions/revision-1.json",
            "revisions/revision-master.json"
        ], $shroom->storage()->files("revisions"));

        $shroom->removeRevision(1);

        $this->assertEquals([
            "revisions/revision-master.json"
        ], $shroom->storage()->files("revisions"));
    }

    /**
     * @test
     */
    public function removing_revision_resolves_spore_references()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);
        $shroom->data()->put("body", "first data");
        $shroom->save();

        $file = $shroom->storage()->put("upload/data-fake", "data");
        $handle = $shroom->revision("master")->putNewSpore(
            "upload/data-fake",
            "file",
            "My file.dat",
            $shroom,
            app("mycelium")
        );

        $shroom->commit("Lorem ipsum");

        $this->assertArraySubset(
            ["@resolvedReferenceTo" => 1],
            $shroom->spore($handle)
        );

        $this->assertEquals(
            ["@sameAsInRevision" => 1],
            $shroom->revision()->spores[$handle]
        );

        // one more commit
        $shroom->data()->put("body", "second data");
        $shroom->commit("Dolor amet");

        // references get chained
        $this->assertArraySubset(
            ["@resolvedReferenceTo" => 2],
            $shroom->spore($handle)
        );

        $shroom->removeRevision(2);

        // references get repaired
        $this->assertArraySubset(
            ["@resolvedReferenceTo" => 1],
            $shroom->spore($handle)
        );

        $shroom->removeRevision(1);

        $this->assertTrue(
            $shroom->revision()->spores->has($handle));
        $this->assertFalse(
            $shroom->spore($handle)->has("@resolvedReferenceTo"));
        $this->assertFalse(
            collect($shroom->revision()->spores[$handle])->has("@sameAsInRevision"));
        $this->assertTrue(
            collect($shroom->revision()->spores[$handle])->has("handle"));
    }

    ////////////
    // Spores //
    ////////////

    /**
     * @test
     */
    public function it_stores_new_spores()
    {
        $shroom = new Shroom(["title" => "My shroom"]);
        $shroom->save();

        $file = $shroom->storage()->put("upload/data-fake", "JPEG-binary-data-here");
        $handle = $shroom->revision("master")->putNewSpore(
            "upload/data-fake",
            "file",
            "My image.jpg",
            $shroom,
            app("mycelium")
        );

        $spore = $shroom->spore($handle);

        $this->assertEquals(
            ["spores/" . $handle],
            $shroom->storage()->files("spores")
        );

        $this->assertArraySubset(
            [
                "handle" => $handle,
                "type" => "file",
                "extension" => "jpg",
                "filename" => $spore["filename"],
                "attributes" => []
            ],
            $spore->toArray()
        );

        $this->assertEquals(
            $spore->only([
                "handle", "type", "filename", "extension", "attributes"
            ])->toArray(),
            json_decode(
                $shroom->storage()->get("revisions/revision-master.json"),
                true
            )["spores"][$handle]
        );
    }

    /**
     * @test
     */
    public function it_clones_spores_on_commit()
    {
        $shroom = new Shroom(["title" => "My shroom"]);
        $shroom->save();

        $file = $shroom->storage()->put("upload/data-fake", "JPEG-binary-data-here");
        $handle = $shroom->revision("master")->putNewSpore(
            "upload/data-fake",
            "image",
            "My image.jpg",
            $shroom,
            app("mycelium")
        );

        $shroom->commit("Added my image.");

        $this->assertEquals(
            ["@sameAsInRevision" => 1],
            json_decode(
                $shroom->storage()->get("revisions/revision-master.json"),
                true
            )["spores"][$handle]
        );

        $this->assertEquals(
            ["@sameAsInRevision" => 1],
            $shroom->revision("master")->spores[$handle]
        );
    }

    /**
     * @test
     */
    public function it_updates_spore_meta_folder_names_when_comitted()
    {
        $shroom = new Shroom(["title" => "My shroom"]);
        $shroom->save();

        $shroom->storage()->put("upload/data-fake", "");
        Image::canvas(420, 350, "#ccc")
            ->save($shroom->storage()->path("upload/data-fake"));

        $handle = $shroom->revision("master")->putNewSpore(
            "upload/data-fake",
            "image",
            "My image.jpg",
            $shroom,
            app("mycelium")
        );

        $spore = $shroom->spore($handle);

        $this->assertEquals(
            ["spore-meta/{$spore["filename"]}/revision-master"],
            $shroom->storage()->directories("spore-meta/{$spore["filename"]}")
        );

        $shroom->commit("Lorem ipsum");

        $this->assertEquals(
            ["spore-meta/{$spore["filename"]}/revision-1"],
            $shroom->storage()->directories("spore-meta/{$spore["filename"]}")
        );
    }

    /**
     * @test
     */
    public function it_removes_unsused_spores()
    {
        $shroom = Shroom::create(["title" => "My shroom"]);
        $file = $shroom->storage()->put("upload/data-fake", "data");
        $handle = $shroom->revision("master")->putNewSpore(
            "upload/data-fake",
            "file",
            "My file.dat",
            $shroom,
            app("mycelium")
        );

        $spore = $shroom->spore($handle);

        // create some fake metadata
        $shroom->storage()->put("spore-meta/{$spore["filename"]}/meta.txt", "foo");

        // now it's used
        $shroom->data()->put("body", [
            "@spore" => $handle
        ]);
        $shroom->save();

        // try to remove, does nothing
        $shroom->removeUnusedSpores();
        $this->assertTrue($shroom->storage()->exists("spores/{$handle}"));

        // commit, remove, still nothing
        $shroom->commit("Lorem ipsum");
        $shroom->removeUnusedSpores();
        $this->assertTrue($shroom->storage()->exists("spores/{$handle}"));

        // make it useless
        $shroom->data()->put("body", null);
        $shroom->save();

        // still nothing, because it's used in the old revision
        $removed = $shroom->removeUnusedSpores();
        $this->assertEquals([], $removed);
        $this->assertTrue($shroom->storage()->exists("spores/{$handle}"));

        // remove the old revision and keep it useless in the master
        // now it gets removed
        $shroom->removeRevision(1);
        $removed = $shroom->removeUnusedSpores();

        $this->assertEquals([$handle], $removed);

        $this->assertEquals([], $shroom->revision("master")->spores->all());
        $this->assertFalse($shroom->storage()->exists("spores/{$handle}"));

        // check that meta was removed as well
        $this->assertEquals([], $shroom->storage()->directories("spore-meta"));
    }
}