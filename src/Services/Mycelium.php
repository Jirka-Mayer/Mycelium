<?php

namespace Mycelium\Services;

/**
 * Mycelium services accessible via the Mycelium facade
 */
class Mycelium
{
    /////////////
    // Routing //
    /////////////
    
    /**
     * Route generator instance
     * @var \Mycelium\RouteGenerator
     */
    protected $routeGenerator;

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

    /////////////
    // Editing //
    /////////////

    /**
     * Is the current mode set to editing?
     * @var boolean
     */
    protected $isEditing = false;

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

    ///////////////
    // Is editor //
    ///////////////

    /**
     * Is the user an editor?
     * @var boolean
     */
    protected $isUserEditor = false;

    /**
     * Sets of gets if the user is an editor
     * @return boolean
     */
    public function editor($set = null)
    {
        if ($set === null)
            return $this->isUserEditor;
        else
            return $this->isUserEditor = $set;
    }
}