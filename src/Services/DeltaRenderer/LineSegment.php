<?php

namespace Mycelium\Services\DeltaRenderer;

class LineSegment
{
    /**
     * Line segment text
     * @var string
     */
    public $text = "";

    /**
     * List of formatting attributes
     * @var array
     */
    public $attributes = [];

    /**
     * Render segment to HTML
     */
    public function toHtml($options)
    {
        $html = htmlentities($this->text);

        // wrap bold
        if (isset($this->attributes["bold"]) && $this->attributes["bold"])
            $html = "<b>{$html}</b>";

        // wrap italic
        if (isset($this->attributes["italic"]) && $this->attributes["italic"])
            $html = "<i>{$html}</i>";

        // wrap emphasis
        if (isset($this->attributes["emphasis"]) && $this->attributes["emphasis"])
            $html = "<em>{$html}</em>";

        // wrap links
        if (isset($this->attributes["link"]) && $this->attributes["link"])
        {
            $html = $this->convertLinkToHtml(
                $this->attributes["link"],
                $html,
                $options
            );
        }

        return $html;
    }

    /**
     * Converts a link to html
     */
    protected function convertLinkToHtml($href, $content, $options)
    {
        $mangleContacts = $options["mangleContacts"];

        // if not email/tel disable mangling (for this link)
        if (substr($href, 0, 7) !== "mailto:" && substr($href, 0, 4) !== "tel:")
            $mangleContacts = false;

        // simple print without mangling
        if (!$mangleContacts)
            return '<a href="' . htmlentities($href) .
                '" target="_blank">' . $content . '</a>';

        // mangle the whole thing
        return $this->mangleHtml('<a href="' . htmlentities($href) .
                '" target="_blank">' . $content . '</a>');
    }

    /**
     * Turns html into a self-reconstructing mess
     */
    protected function mangleHtml($html)
    {
        // mangle the href and text
        $js = "";

        // get parts
        $parts = collect(str_split($html, 4));

        // setup index array
        $indices = [];
        for ($i = 0; $i < count($parts); $i++)
            $indices[] = $i;

        // shuffle indices
        $indices = collect($indices)->shuffle();

        // shuffle parts
        $shuffledParts = clone $parts;
        for ($i = 0; $i < count($parts); $i++)
            $shuffledParts[$indices[$i]] = $parts[$i];

        $js .= "var parts = " . json_encode($shuffledParts) . ";";
        $js .= "var indices = " . json_encode($indices) . ";";
        $js .= "for (var i = 0; i < parts.length; i++) {";
        $js .= "document.write(parts[indices[i]]);";
        $js .= "}";

        return "<script>{$js}</script>";
    }
}