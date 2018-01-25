<?php

namespace Mycelium\Update;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Contracts\Logging\Log;

/**
 * Update base class
 */
abstract class Update
{
    /**
     * Filesystem reference
     */
    public $storage = null;

    /**
     * Log reference
     */
    public $log = null;

    /**
     * Used to set the filesystem reference
     */
    public function setFilesystem(Filesystem $storage)
    {
        $this->storage = $storage;
    }

    /**
     * Used to set the logger reference
     */
    public function setLog(Log $log)
    {
        $this->log = $log;
    }

    /**
     * Run the update
     */
    public function run()
    {
        // override this ...
    }
}