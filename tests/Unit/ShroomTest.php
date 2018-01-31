<?php

namespace MyceliumTests;

use Tests\TestCase;

use Mycelium\Shroom;
use Mycelium\EmptySlugException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManagerStatic as Image;

class ShroomTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->migrate();

        // mock filesystem
        Storage::fake("mycelium-fake");
        Shroom::setFilesystem(Storage::drive("mycelium-fake"));
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
}