<?php

namespace MyceliumTests;

use Tests\TestCase;

use Mycelium\Services\DeltaRenderer;
use Mycelium\Shroom;
use Intervention\Image\ImageManagerStatic as Image;

class DeltaRendererTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->renderer = new DeltaRenderer;
    }

    /**
     * Helper for rendering to an array
     */
    protected function renderToBlocks($delta, $optionsOverride = [])
    {
        $options = collect([
            "shroom" => null,
            "mangleContacts" => false,
            "trimEmbedNewlines" => false
        ])->merge($optionsOverride);

        // render
        $blocks = $this->renderer->deltaToBlocks($delta, $options);
        $html = $this->renderer->blocksToHtml($blocks, $options);

        // to array for comparison
        $blocks = array_map(function ($block) {
            return $block->toArray();
        }, $blocks);

        // return
        return [$blocks, $html];
    }

    /**
     * @test
     */
    public function it_converts_plain_text()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "Hello\nworld\n"]
            ]
        ]);

        $this->assertEquals([
            // line
            ["text" => [
                // segment
                ["Hello", []]
            ]],

            ["text" => [["world", []]]]
        ], $blocks);

        $this->assertEquals(
            "<p>Hello</p><p>world</p>"
        , $html);
    }

    /**
     * @test
     */
    public function it_converts_inline_styles()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "Hello", "attributes" => ["bold" => true]],
                ["insert" => " world\n"]
            ]
        ]);

        $this->assertEquals([
            ["text" => [["Hello", ["bold" => true]], [" world", []]]]
        ], $blocks);

        $this->assertEquals(
            "<p><b>Hello</b> world</p>"
        , $html);
    }

    /**
     * @test
     */
    public function it_converts_line_styles()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "Hello world\nLorem ipsum"],
                ["insert" => "\n", "attributes" => ["header" => 1]]
            ]
        ]);

        $this->assertEquals([
            ["text" => [["Hello world", []]]],
            ["text" => [["Lorem ipsum", []]], "attributes" => ["header" => 1]]
        ], $blocks);

        $this->assertEquals(
            "<p>Hello world</p><h1>Lorem ipsum</h1>"
        , $html);
    }

    /**
     * @test
     */
    public function it_converts_links()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "Hello "],
                ["insert" => "world", "attributes" => ["link" => "http://url"]],
                ["insert" => "\n"],
            ]
        ]);

        $this->assertEquals([
            ["text" => [
                ["Hello ", []],
                ["world", ["link" => "http://url"]]
            ]],
        ], $blocks);

        $this->assertEquals(
            "<p>Hello <a href=\"http://url\" target=\"_blank\">world</a></p>"
        , $html);
    }

    /**
     * @test
     */
    public function it_mangles_emails()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "Hello "],
                ["insert" => "world", "attributes" => ["link" => "mailto:world@example.com"]],
                ["insert" => "\n"],
            ]
        ], ["mangleContacts" => true]);

        $this->assertEquals([
            ["text" => [
                ["Hello ", []],
                ["world", ["link" => "mailto:world@example.com"]]
            ]],
        ], $blocks);

        $this->assertEquals(
            false, strpos($html, "world@example.com"),
            "The email can still be simply detected in the output."
        );
    }

    /**
     * @test
     */
    public function it_converts_embeds()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "Before\n"],
                [
                    "insert" => ["image" => "kitten.jpg"],
                    "attributes" => ["width" => 420]
                ],
                ["insert" => "After\n"]
            ]
        ]);

        $this->assertEquals([
            ["text" => [["Before", []]]],
            [
                "embed" => ["image" => "kitten.jpg"],
                "attributes" => ["width" => 420]
            ],
            ["text" => [["After", []]]]
        ], $blocks);
    }

    /**
     * @test
     */
    public function it_removes_newlines_before_and_after_embeds()
    {
        /*
            When you have an embed as the very first thing
            in the delta, quill will insert a newline before it.
            But we don't want that to render. It doesn't
            make for a pretty spacing.

            Same with trailing newlines after embed.
         */
        
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                ["insert" => "\n"],
                [
                    "insert" => ["some-embed" => 42]
                ],
                ["insert" => "\n"]
            ]
        ], ["trimEmbedNewlines" => true]);

        $this->assertEquals([
            [
                "embed" => ["some-embed" => 42]
            ]
        ], $blocks);
    }

    /**
     * @test
     */
    public function it_renders_tables()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                [
                    "insert" => ["table" => [
                        "rows" => [
                            [
                                ["ops" => [
                                    ["insert" => "Foo\n"]
                                ]],
                                ["ops" => [
                                    ["insert" => "Bar\n"]
                                ]]
                            ]
                        ]
                    ]]
                ]
            ]
        ]);

        $this->assertEquals(
            "<table><tr><td><p>Foo</p></td><td><p>Bar</p></td></tr></table>"
        , $html);
    }

    /**
     * @test
     */
    public function it_renders_image_using_url_only()
    {
        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                [
                    "insert" => ["image" => [
                        "url" => "http://example.com/",
                        "title" => "Blah blah"
                    ]]
                ]
            ]
        ]);

        $this->assertContains('src="http://example.com/"', $html);
        $this->assertContains(
            '<figcaption>Blah blah</figcaption>',
            $html
        );
    }

    /**
     * @test
     */
    public function it_renders_image_with_caches()
    {
        $this->migrate();
        $this->mockFilesystem();

        $shroom = Shroom::create(["title" => "My shroom"]);
        app("mycelium.routes")->fakeShroomUrlBinding($shroom, "/");

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

        // now the spore exists, we can work with it

        list($blocks, $html) = $this->renderToBlocks([
            "ops" => [
                [
                    "insert" => ["image" => [
                        "@spore" => $handle,
                        "title" => "Blah blah"
                    ]]
                ]
            ]
        ], ["shroom" => $shroom]);

        $this->assertContains('src="' . url("/resource/{$handle}") . '"', $html);
        $this->assertContains("/resource/240w/my-image", $html);
        $this->assertContains('alt="Blah blah"', $html);
        $this->assertContains('mycelium-spore="' . $handle . '"', $html);
    }
}