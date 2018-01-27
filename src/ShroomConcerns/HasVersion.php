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
        if (!$this->storage()->exists("version.json"))
            return null;

        // load version file
        $versionFile = $this->storage()->get("version.json");
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
        if (!$this->storage()->exists("version.json"))
            $this->storage()->put("version.json", "{}");

        // load version file
        $versionFile = $this->storage()->get("version.json");
        $versionFile = json_decode($versionFile, true);

        // parsing error
        if ($versionFile === null)
            throw new UpdateException("Shroom version file couldn't be loaded.");

        // update the value
        $versionFile["shroom"] = $version;

        // save the file
        $this->storage()->put(
            "version.json",
            json_encode($versionFile, JSON_PRETTY_PRINT)
        );
    }
}