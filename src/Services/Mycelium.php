<?php

namespace Mycelium\Services;

/**
 * Mycelium services accessible via the Mycelium facade
 */
class Mycelium
{
    /**
     * Route generator instance
     * @var \Mycelium\RouteGenerator
     */
    protected $routeGenerator;

    /**
     * Is the current mode set to editing?
     * @var boolean
     */
    protected $isEditing = false;

    /**
     * Sets the Route generator dependency
     * @param RouteGenerator $routeGenerator mycelium route generator service
     */
    public function setRouteGenerator(RouteGenerator $routeGenerator)
    {
        $this->routeGenerator = $routeGenerator;
    }

    /**
     * Returns route generator instance
     * @return \Mycelium\RouteGenerator
     */
    public function routes()
    {
        return $this->routeGenerator;
    }

    /**
     * Setting and getting the editing mode
     * @return boolean
     */
    public function editing($set = null)
    {
        if ($set === null)
            return $this->isEditing;
        else
            return $this->isEditing = $set;
    }
}