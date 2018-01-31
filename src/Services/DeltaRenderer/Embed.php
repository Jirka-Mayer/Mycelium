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
    public function toHtml(DeltaRenderer $renderer, $options)
    {
        // render table embed
        if (isset($this->value["table"]))
            return TableEmbed::toHtml(
                $this->value["table"],
                $this->attributes,
                $renderer,
                $options
            );

        // render image embed
        if (isset($this->value["image"]))
            return ImageEmbed::toHtml(
                $this->value["image"],
                $this->attributes,
                $options
            );

        return "<pre>Unknown embed type - see DeltaRenderer.</pre>";
    }
}