<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;

class Embed implements Block
{
    /**
     * Value of the embed
     * @var array
     */
    public $value = null;

    /**
     * List of formatting attributes
     * @var array
     */
    public $attributes = [];

    /**
     * Converts embed to an array
     */
    public function toArray()
    {
        $out = [
            "embed" => $this->value
        ];

        if ($this->attributes !== [])
            $out["attributes"] = $this->attributes;

        return $out;
    }

    /**
     * Render embed to HTML
     */
    public function toHtml(DeltaRenderer $renderer, $mangleContacts)
    {
        // render table embed
        if (isset($this->value["table"]))
            return TableEmbed::toHtml(
                $this->value["table"],
                $this->attributes,
                $renderer,
                $mangleContacts
            );

        return "<pre>Unknown embed type.</pre>";
    }
}