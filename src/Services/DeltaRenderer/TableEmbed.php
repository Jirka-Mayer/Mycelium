<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;

class TableEmbed
{
    /**
     * Render table embed to HTML
     */
    public static function toHtml($value, $attributes, DeltaRenderer $renderer)
    {
        if (!is_array($value))
            $value = [];

        $html = "<table>";

        if (!isset($value["rows"]))
            $value["rows"] = [];

        foreach ($value["rows"] as $row)
        {
            if (!is_array($row))
                continue;

            $html .= "<tr>";

            foreach ($row as $cell)
                $html .= "<td>" . $renderer->renderHtml($cell) . "</td>";

            $html .= "</tr>";
        }

        return $html . "</table>";
    }
}