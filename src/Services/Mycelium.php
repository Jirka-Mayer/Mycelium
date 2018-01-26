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

    /////////////////////////////
    // Javascript state export //
    /////////////////////////////

    /**
     * Returns javascript "mycelium.state" object
     * @return array
     */
    public function exportState()
    {
        return [
            "editing" => $this->editing(),
            "editor" => $this->editor()
        ];
    }

    ////////////////////////////////////
    // Helper for asset cache busting //
    ////////////////////////////////////

    /**
     * Returns asset url with the proper cache busting hash
     *
     * (see views/js.blade.php)
     */
    public function cacheBustedAsset($asset)
    {
        $manifestFilename = __DIR__ . "/../../dist/mix-manifest.json";

        // load manifest
        $manifest = json_decode(
            file_get_contents($manifestFilename),
            true
        );

        // in case of error
        $bustedName = $asset;

        // get busted name
        if ($manifest !== null
            && is_array($manifest)
            && array_key_exists($asset, $manifest))
        {
            $bustedName = $manifest[$asset];
        }

        return asset("vendor/mycelium" . $bustedName);
    }    
}