<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;
use PHPUnit\Framework\Assert as PHPUnit;

class TextPad extends BaseComponent
{
    public function selector()
    {
        return '[mycelium-text-pad="here"]';
    }

    public function assert(Browser $browser)
    {
        $browser->assertVisible($this->selector());
    }

    public function elements()
    {
        return [
            '@editor' => '.ql-editor',
        ];
    }

    public function selectEntireTextPad($browser)
    {
        $browser->keys("@editor", "{home}", "{shift}", "{end}");
    }

    public function typeIntoPad($browser, $text)
    {
        $browser->keys("@editor", $text);
    }

    /**
     * Assert that text pad delta ops equal
     */
    public function assertPadOpsEqual($browser, $expected)
    {
        $ops = $browser->script(
            "return document.querySelector('"
            . $this->selector()
            . "').textPad.getContents().ops")[0];

        PHPUnit::assertEquals($expected, $ops);
    }

    /**
     * Assert that text pad delta ops contain a subset
     */
    public function assertPadOpsContain($browser, $expected)
    {
        $ops = $browser->script(
            "return document.querySelector('"
            . $this->selector()
            . "').textPad.getContents().ops")[0];

        PHPUnit::assertArraySubset($expected, $ops);
    }
}