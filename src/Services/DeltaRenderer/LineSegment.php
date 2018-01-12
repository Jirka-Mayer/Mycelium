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
        $html = htmlentities($this->text);

        // wrap bold
        if (isset($this->attributes["bold"]) && $this->attributes["bold"])
            $html = "<b>{$html}</b>";

        // wrap italic
        if (isset($this->attributes["italic"]) && $this->attributes["italic"])
            $html = "<i>{$html}</i>";

        // wrap emphasis
        if (isset($this->attributes["emphasis"]) && $this->attributes["emphasis"])
            $html = "<em>{$html}</em>";

        // wrap links
        if (isset($this->attributes["link"]) && $this->attributes["link"])
        {
            $html = '<a href="' . htmlentities($this->attributes["link"]) .
                '" target="_blank">' . $html . '</a>';
        }

        return $html;
    }
}