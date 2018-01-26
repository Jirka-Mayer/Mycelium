<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;

class ImageEmbed
{
    /**
     * Render image embed to HTML
     */
    public static function toHtml($value, $attributes, DeltaRenderer $renderer)
    {
        if (!is_array($value))
            $value = [];

        if (!isset($value["url"]))
            $value["url"] = "";

        if (!isset($value["title"]))
            $value["title"] = "";

        $html = "<figure>";
        
        $html .= "<picture>";
        $html .= '<img src="' . htmlentities($value["url"]) . '">';
        $html .= "</picture>";

        $html .= '<figcaption>' . htmlentities($value["title"]) . '</figcaption>';

        return $html . "</figure>";
    }
}