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
        // get the public revision
        $revision = $this->shroom->revision("public");

        // if no public revision
        if ($revision === null)
            abort(404);

        // if the file does not exist
        if (!$this->shroom->storage()->exists("spores/" . $this->handle))
            abort(404);

        // return the file
        return response()->file(
            $this->shroom->storage()->path("spores/" . $this->handle)
        );
    }
}