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
     * @param bool $mangleContacts Mangle emails to it's hard to scrape them
     * @return string
     */
    public function renderHtml($delta, $mangleContacts = true, $trimEmbedNewlines = true)
    {
        $blocks = $this->deltaToBlocks($delta, $trimEmbedNewlines);
        $html = $this->blocksToHtml($blocks, $mangleContacts);
        return $html;
    }

    /**
     * Render delta to text
     *
     * This removes all embeds and formatting though
     */
    public function renderText($delta)
    {
        $text = "";

        foreach ($delta["ops"] as $op)
        {
            if (!is_string($op["insert"]))
                continue;

            $text .= $op["insert"];
        }

        // remove trailing "\n" ever present in deltas
        // (if the last character is "\n")
        if (substr($text, strlen($text) - 1, 1) === "\n")
            $text = substr($text, 0, strlen($text) - 1);

        return $text;
    }

    /**
     * Converts delta format into an array of blocks (line/embed)
     */
    public function deltaToBlocks($delta, $trimEmbedNewlines = true)
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

        if ($trimEmbedNewlines)
            $this->trimEmbedNewlines($blocks);

        return $blocks;
    }

    /**
     * Removes newlines on beginning and end if before/after an embed
     */
    protected function trimEmbedNewlines(&$blocks)
    {
        // leading newline before embed
        if (count($blocks) < 2)
            return;

        if ($blocks[0] instanceof Line && $blocks[1] instanceof Embed)
        {
            if (count($blocks[0]->segments) == 1
                && $blocks[0]->segments[0]->text == ""
                && $blocks[0]->segments[0]->attributes == []
            )
            {
                array_splice($blocks, 0, 1);
            }
        }

        // trailing newline after embed
        $len = count($blocks);
        if ($len < 2)
            return;

        if ($blocks[$len - 1] instanceof Line && $blocks[$len - 2] instanceof Embed)
        {
            if (count($blocks[$len - 1]->segments) == 1
                && $blocks[$len - 1]->segments[0]->text == ""
                && $blocks[$len - 1]->segments[0]->attributes == []
            )
            {
                array_splice($blocks, $len - 1, 1);
                $len -= 1;
            }
        }
    }

    /**
     * Renders blocks to HTML
     */
    public function blocksToHtml($blocks, $mangleContacts = true)
    {
        $html = "";

        foreach ($blocks as $block)
            $html .= $block->toHtml($this, $mangleContacts);

        return $html;
    }
}