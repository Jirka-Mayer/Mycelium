<?php

namespace MyceliumTests;

use Tests\TestCase;

use Mycelium\Services\DeltaRenderer;

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
    protected function renderToBlocks($delta)
    {
        // render
        $blocks = $this->renderer->deltaToBlocks($delta);
        $html = $this->renderer->blocksToHtml($blocks);

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
            "<p><strong>Hello</strong> world</p>"
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
                "attributes" => ["width" => 420]],
            ["text" => [["After", []]]]
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
                    "insert" => ["table" => json_encode([
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
                    ])]
                ]
            ]
        ]);

        $this->assertEquals(
            "<table><tr><td><p>Foo</p></td><td><p>Bar</p></td></tr></table>"
        , $html);
    }
}