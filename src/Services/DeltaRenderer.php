<?php

namespace Mycelium\Services;

use DBlackborough\Quill\Render;

class DeltaRenderer
{
    /**
     * Render a delta to HTML
     * @return string
     */
    public function render($delta)
    {
        $quill = new Render(
            json_encode($delta),
            'HTML'
        );

        return $quill->render();
    }
}