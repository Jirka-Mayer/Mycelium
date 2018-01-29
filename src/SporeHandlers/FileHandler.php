<?php

namespace Mycelium\SporeHandlers;

/**
 * Handles general file ony able to be downloaded
 */
class FileHandler extends SporeHandler
{
    /**
     * Handle the download request
     */
    public function handleDownload()
    {
        // return the file
        return response()->file(
            $this->shroom->storage()->path("spores/" . $this->spore["handle"])
        );
    }
}