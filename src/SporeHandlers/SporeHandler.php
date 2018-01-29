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
     * The spore reference
     * @var collection
     */
    protected $spore = null;

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
     * Set the spore
     */
    public function setSpore($spore)
    {
        $this->spore = $spore;
    }

    /**
     * Set the request parameters
     */
    public function setParams($params)
    {
        $this->params = $params;
    }
}