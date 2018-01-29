<?php

namespace Mycelium\SporeHandlers;

use Illuminate\Http\Request;

class ImageHandler extends FileHandler
{
    /**
     * Handle the download request
     */
    public function handleDownload()
    {
        // if no params provided, just let the user
        // see the original image
        if ($this->params === null)
            return parent::handleDownload();

        dd("parameters were provided: ", $this->params);
    }
}