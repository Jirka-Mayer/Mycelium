<?php

namespace Mycelium\ShroomConcerns;

use Mycelium\Update\UpdateException;

trait HasVersion
{
    /**
     * Returns the current shroom version
     */
    public function getCurrentVersion()
    {
        // no version file
        if (!static::$filesystem->exists($this->getDirectoryName(null, "version.json")))
            return null;

        // load version file
        $versionFile = static::$filesystem->get(
            $this->getDirectoryName(null, "version.json"));
        $versionFile = json_decode($versionFile, true);

        // parsing error
        if ($versionFile === null || !array_key_exists("shroom", $versionFile))
            throw new UpdateException("Shroom version file couldn't be loaded.");

        return $versionFile["shroom"];
    }

    /**
     * Sets the new shroom version
     */
    public function setCurrentVersion($version)
    {
        // no version file, create one
        if (!static::$filesystem->exists($this->getDirectoryName(null, "version.json")))
            static::$filesystem->put($this->getDirectoryName(null, "version.json"), "{}");

        // load version file
        $versionFile = static::$filesystem->get(
            $this->getDirectoryName(null, "version.json"));
        $versionFile = json_decode($versionFile, true);

        // parsing error
        if ($versionFile === null)
            throw new UpdateException("Shroom version file couldn't be loaded.");

        // update the value
        $versionFile["shroom"] = $version;

        // save the file
        static::$filesystem->put(
            $this->getDirectoryName(null, "version.json"),
            json_encode($versionFile, JSON_PRETTY_PRINT)
        );
    }
}