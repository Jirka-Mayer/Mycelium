<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class TextPadToolbar extends BaseComponent
{
    public function selector()
    {
        return '.mc-rtwt';
    }

    public function assert(Browser $browser)
    {
        $browser->assertVisible($this->selector());
    }

    public function elements()
    {
        return [
            '@bold' => 'button[ref="bold"]',
            '@italic' => 'button[ref="italic"]',

            '@image' => 'button[ref="image"]',

            '@testing-file-upload' => 'input[ref="testingFileUpload"]',
        ];
    }

    /**
     * Set a file into the testing file input so the javascript can take it
     */
    public function attachFileForUpload($browser, $filename)
    {
        $browser->attach("@testing-file-upload", $filename);
    }
}