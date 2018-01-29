<?php

namespace Mycelium\SporeHandlers;

use Mycelium\Shroom;

abstract class SporeHandler
{
    /**
     * Shroom reference
     */
    protected $shroom = null;

    /**
     * Set the shroom reference
     */
    public function setShroom(Shroom $shroom)
    {
        $this->shroom = $shroom;
    }
}