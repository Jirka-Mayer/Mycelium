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

        /*
            This way add resolution information:
            
            srcset="swing-200.jpg 200w, swing-400.jpg 400w, swing-800.jpg 800w"

            https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/
         */
        
        $html .= '<img src="' . htmlentities($value["url"]) . '">';

        $html .= '<figcaption>' . htmlentities($value["title"]) . '</figcaption>';

        return $html . "</figure>";
    }
}