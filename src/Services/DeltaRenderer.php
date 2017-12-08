<?php

namespace Mycelium\Services;

use Mycelium\Services\DeltaRenderer\Line;
use Mycelium\Services\DeltaRenderer\Embed;

/**
 * A singleton service registered as "mycelium.deltaRenderer"
 */
class DeltaRenderer
{
    /**
     * Render a delta to HTML
     * @return string
     */
    public function renderHtml($delta)
    {
        $blocks = $this->deltaToBlocks($delta);
        $html = $this->blocksToHtml($blocks);
        return $html;
    }

    /**
     * Converts delta format into an array of blocks (line/embed)
     */
    public function deltaToBlocks($delta)
    {
        $blocks = [];
        $block = new Line;

        foreach ($delta["ops"] as $op)
        {
            // insert text
            if (is_string($op["insert"]))
            {
                // line format
                if ($op["insert"] === "\n")
                {
                    // get attributes
                    if (isset($op["attributes"]))
                        $attributes = $op["attributes"];
                    else
                        $attributes = [];

                    // style the last line
                    $block->attributes = $attributes;

                    // push the line
                    $blocks[] = $block;
                    $block = new Line;
                }

                // general text
                else
                {
                    // split by newline
                    $parts = explode("\n", $op["insert"]);

                    // get attributes
                    if (isset($op["attributes"]))
                        $attributes = $op["attributes"];
                    else
                        $attributes = [];

                    // append each part
                    for ($i = 0; $i < count($parts); $i++)
                    {
                        $block->append($parts[$i], $attributes);

                        // push to blocks if newline (so not the last time)
                        if ($i < count($parts) - 1)
                        {
                            $blocks[] = $block;
                            $block = new Line;
                        }
                    }
                }
            }

            // insert embed
            elseif (is_array($op["insert"]))
            {
                // get attributes
                if (isset($op["attributes"]))
                    $attributes = $op["attributes"];
                else
                    $attributes = [];

                $embed = new Embed;
                $embed->value = $op["insert"];
                $embed->attributes = $attributes;

                $blocks[] = $embed;
            }
        }

        return $blocks;
    }

    /**
     * Renders blocks to HTML
     */
    public function blocksToHtml($blocks)
    {
        $html = "";

        foreach ($blocks as $block)
            $html .= $block->toHtml($this);

        return $html;
    }
}