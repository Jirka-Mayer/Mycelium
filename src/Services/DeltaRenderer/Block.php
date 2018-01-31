<?php

namespace Mycelium\Services\DeltaRenderer;

use Mycelium\Services\DeltaRenderer;

/**
 * Block represents a line (paragraph actually) of text or an embed
 */
interface Block
{
    /**
     * Converts block to an array
     */
    public function toArray();

    /**
     * Renders block ton HTML
     */
    public function toHtml(DeltaRenderer $renderer, $options);
}