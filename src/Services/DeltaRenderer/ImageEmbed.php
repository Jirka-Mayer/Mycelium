<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;

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
        // srcset="swing-200.jpg 200w, swing-400.jpg 400w, swing-800.jpg 800w"
        
        $shroomUrl = app("mycelium.routes")->getShroomUrl($shroom);
        $handle = $spore->get("handle");

        // get src attribute
        $src = $spore->get("url", "");

        // get srcset attribute
        $widths = collect(collect($spore->get("attributes", []))->get("cache", []));
        $links = $widths->map(function ($width) use ($shroomUrl, $handle) {
            $link = $shroomUrl . "resource/{$width}w/{$handle}";
            return $link . " " . $width . "w";
        });
        $srcset = $links->implode(", ");

        return '<img src="'
            . htmlentities($src)
            . '" srcset="'
            . htmlentities($srcset)
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