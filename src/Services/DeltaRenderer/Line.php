<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;

class Line implements Block
{
    /**
     * Line segments if a text line
     * @var array
     */
    public $segments = [];

    /**
     * List of formatting attributes (for the entire line)
     * @var array
     */
    public $attributes = [];

    /**
     * Reference to the last segment
     * @var null
     */
    protected $lastSegment = null;

    public function __construct()
    {
        $this->segments[] = new LineSegment;
        $this->lastSegment = $this->segments[0];
    }

    /**
     * Append some text to the line
     */
    public function append($text, $attributes = [])
    {
        if ($text === "")
            return;

        // attributes match
        if ($attributes === $this->lastSegment->attributes)
        {
            // append to the segment
            $this->lastSegment->text .= $text;
        }

        // attributes differ
        else
        {
            // appending to empty segment -> overwrite
            if ($this->lastSegment->text === "")
            {
                $this->lastSegment->text = $text;
                $this->lastSegment->attributes = $attributes;
            }

            // create new segment
            else
            {
                $newSegment = new LineSegment;
                $newSegment->text = $text;
                $newSegment->attributes = $attributes;

                $this->segments[] = $newSegment;
                $this->lastSegment = $newSegment;
            }
        }
    }

    /**
     * Converts line to an array
     */
    public function toArray()
    {
        $out = [
            "text" => array_map(function ($segment) {
                return [$segment->text, $segment->attributes];
            }, $this->segments)
        ];

        if ($this->attributes !== [])
            $out["attributes"] = $this->attributes;

        return $out;
    }

    /**
     * Renders line as HTML
     */
    public function toHtml(DeltaRenderer $renderer)
    {
        $html = "";

        foreach ($this->segments as $segment)
            $html .= $segment->toHtml();

        // headers
        if (isset($this->attributes["header"]))
        {
            $tag = "h" . $this->attributes["header"];
            return "<{$tag}>{$html}</{$tag}>";
        }

        // totally empty line has a break inside
        if ($html === "")
            $html = "<br>";

        // default style is a paragraph
        return "<p>{$html}</p>";
    }
}