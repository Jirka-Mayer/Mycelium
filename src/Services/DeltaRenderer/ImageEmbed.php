<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;
use Mycelium\SporeHandlers\ImageHandler;

class ImageEmbed
{
    /**
     * Render image embed to HTML
     */
    public static function toHtml($value, $attributes, $options)
    {
        /*
            https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/
         */
        
        // if the value is not an array
        if (!is_array($value))
            $value = [];

        // value as collection
        $value = collect($value);

        // get spore
        $spore;
        if ($options["shroom"])
            $spore = $options["shroom"]->spore($value->get("@spore", null));
        else
            $spore = null;

        // begin HTML
        $html = "<figure>";

        // render <img> tag
        if ($spore === null)
            $html .= static::noSporeUsed($value);
        else
            $html .= static::sporeHasBeenUsed($options["shroom"], $spore, $value);

        // render <figcaption>
        $html .= static::renderTitle($value);

        // end HTML
        return $html . "</figure>";
    }

    /**
     * Renders the <img> tag without a spore
     */
    protected static function noSporeUsed($value)
    {
        return '<img src="' . htmlentities($value->get("url", "")) . '">';
    }

    /**
     * Renders <img> with a spore used
     */
    protected static function sporeHasBeenUsed($shroom, $spore, $value)
    {
        return '<img src="'
            . htmlentities($spore->get("url", ""))
            . '" srcset="'
            . htmlentities(ImageHandler::getSrcset($shroom, $spore))
            . '" alt="'
            . htmlentities($value->get("title", ""))
            . '" mycelium-spore="'
            . htmlentities($value["@spore"])
            . '">';
    }

    /**
     * Renders the <figcaption> element if title present
     */
    protected static function renderTitle($value)
    {
        if (!$value->has("title"))
            return "";

        return '<figcaption>' . htmlentities($value["title"]) . '</figcaption>';
    }
}