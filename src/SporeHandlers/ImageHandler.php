<?php

namespace Mycelium\SporeHandlers;

use Illuminate\Http\Request;

class ImageHandler extends SporeHandler
{
    /**
     * Handle the download request
     */
    public function handleDownload(Request $request)
    {
        dd("yep, we're here");
    }
}