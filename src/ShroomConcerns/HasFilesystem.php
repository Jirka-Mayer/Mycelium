<?php

namespace Mycelium\ShroomConcerns;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;

trait HasFilesystem
{
    /**
     * Prepare directory name and location based on the id
     * @return void
     */
    protected function prepareStorageDirectory()
    {
        // handle ID change
        if ($this->idChanged)
        {
            // remove the old directory
            static::$filesystem->deleteDirectory(
                $this->getDirectoryName($this->actualId)
            );

            $this->idChanged = false;
        }

        // create directory if needed
        static::$filesystem->makeDirectory($this->getDirectoryName());

        // copy the version file if needed
        // (but don't touch it otherwise, HasVersion trait handles the rest!)
        if (!static::$filesystem->exists($this->getDirectoryName(null, "version.json")))
        {
            static::$filesystem->put(
                $this->getDirectoryName(null, "version.json"),
                file_get_contents(
                    __DIR__ . "/../../assets/updates/default-shroom-version-file.json"
                )
            );
        }
    }

    /**
     * Returns directory name for a given ID
     * You can append extra path to it
     * If no ID provided, curently set in this instance will be used
     * @param  string|null $id
     * @param  string|null $append
     * @return string
     */
    public function getDirectoryName($id = null, $append = null)
    {
        if ($id === null)
            $id = $this->id;

        list($cluster, $slug) = $this->separateShroomId($id);

        if ($this->cluster)
            $path = $cluster . "/" . $slug;
        else
            $path = $slug;

        if (is_string($append))
        {
            if (Str::startsWith($append, "/"))
                return $path . $append;
            else
                return $path . "/" . $append;
        }
        else
        {
            return $path;
        }
    }

    /**
     * Sets the filesystem instance
     * @param \Illuminate\Contracts\Filesystem $filesystem
     */
    public static function setFilesystem(Filesystem $filesystem)
    {
        static::$filesystem = $filesystem;
    }

    /**
     * Returns the set filesystem isntance
     * @return \Illuminate\Contracts\Filesystem|null
     */
    public static function getFilesystem()
    {
        if (!isset(static::$filesystem))
            return null;

        return static::$filesystem;
    }
}