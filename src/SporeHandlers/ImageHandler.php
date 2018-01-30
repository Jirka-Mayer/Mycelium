<?php

namespace Mycelium\SporeHandlers;

use Intervention\Image\ImageManagerStatic as Image;
use Intervention\Image\Exception\NotReadableException;
use Carbon\Carbon;

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

        // TODO - serve cached files!
        dd("parameters were provided: ", $this->params);
    }

    /**
     * Returns true if the extension is fine
     */
    public function isFileExtensionOk($extension)
    {
        return collect(["jpg", "jpeg"])->contains($extension);
    }

    /**
     * Do any specific processing of a newly uploaded spore
     */
    public function processNewSpore()
    {
        // image attributes that are going to be built here
        $attributes = collect();

        $filename = $this->shroom->storage()
            ->path("spores/{$this->spore["handle"]}");

        $image;
        try
        {
            $image = Image::make($filename);
        }
        catch (NotReadableException $e)
        {
            // the file is probbably corrupted, lets just give up
            // on any processing, the user will notice when it
            // won't display the image on the page
            return;
        }

        // store image dimensions
        $attributes["width"] = $image->getSize()->width;
        $attributes["height"] = $image->getSize()->height;
        
        // setup the cache
        $this->setupImageCache($filename, $attributes);

        // save attributes and spore
        $this->spore["attributes"] = $attributes->toArray();
        
        $this->shroom->revision("master")
            ->spores[$this->spore["handle"]] = $this->spore;
    }

    /**
     * Creates image cache for multiple widths
     */
    protected function setupImageCache($filename, &$attributes)
    {
        // spore handle, filename and extension
        $handle = $this->spore["handle"];
        $sporeFilename = $this->spore["filename"];
        $sporeExtension = $this->spore["extension"];

        // cache image quality
        $quality = config("mycelium.spores.image.quality", 90);

        // get all widths
        $widths = config("mycelium.spores.image.caches", []);
        $cachedWidths = [];

        foreach ($widths as $width)
        {
            // never increase image size in cache
            if ($width >= $attributes["width"])
                continue;

            // create cache file
            $height = floor(($attributes["height"] / $attributes["width"]) * $width);
            $cacheFilename = "spore-meta/{$sporeFilename}/revision-master/{$sporeFilename}_w{$width}.{$sporeExtension}";

            // touch
            $this->shroom->storage()->put($cacheFilename, "");

            // to real path
            $cacheFilename = $this->shroom->storage()->path($cacheFilename);
            
            // create
            Image::make($filename)->resize($width, $height)
                ->save($cacheFilename, $quality);

            // note, that cache exists
            $cachedWidths[] = $width;
        }

        // cached widths
        $attributes["cache"] = $cachedWidths;

        // caching date
        $attributes["cachedAt"] = Carbon::now()->format("Y-m-d H:i:s");
    }
}