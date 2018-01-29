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
     * The spore handle
     * @var string
     */
    protected $handle = null;

    /**
     * Request parameters
     * @var null|string
     */
    protected $params = null;

    /**
     * Set the shroom reference
     */
    public function setShroom(Shroom $shroom)
    {
        $this->shroom = $shroom;
    }

    /**
     * Set the spore handle
     */
    public function setHandle($handle)
    {
        $this->handle = $handle;
    }

    /**
     * Set the request parameters
     */
    public function setParams($params)
    {
        $this->params = $params;
    }
}