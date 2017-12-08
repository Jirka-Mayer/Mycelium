<?php

namespace Mycelium\Services\DeltaRenderer;

class LineSegment
{
    /**
     * Line segment text
     * @var string
     */
    public $text = "";

    /**
     * List of formatting attributes
     * @var array
     */
    public $attributes = [];

    /**
     * Render segment to HTML
     */
    public function toHtml()
    {
        $html = $this->text;

        // wrap bold
        if (isset($this->attributes["bold"]) && $this->attributes["bold"])
            $html = "<strong>{$html}</strong>";

        // wrap italic
        if (isset($this->attributes["italic"]) && $this->attributes["italic"])
            $html = "<em>{$html}</em>";

        return $html;
    }
}