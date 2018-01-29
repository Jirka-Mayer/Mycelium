<?php

namespace Mycelium\Services;

use Illuminate\Contracts\Container\Container;
use Mycelium\Shroom;

/**
 * Mycelium services accessible via the Mycelium facade
 */
class Mycelium
{
    /**
     * Reference to the service container
     */
    protected $app = null;

    public function __construct(Container $app)
    {
        $this->app = $app;
    }

    /////////////
    // Routing //
    /////////////

    /**
     * Returns route generator instance
     * @return \Mycelium\RouteGenerator
     */
    public function routes()
    {
        return $this->app["mycelium.routes"];
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

    ////////////
    // Spores //
    ////////////

    /**
     * Returns an initialized instance of proper spore handler
     */
    public function resolveSporeHandler($type, Shroom $shroom)
    {
        // resolve the handler
        $handler = $this->app["mycelium.spore-handler.{$type}"];

        // set shroom reference
        $handler->setShroom($shroom);

        return $handler;
    }
}