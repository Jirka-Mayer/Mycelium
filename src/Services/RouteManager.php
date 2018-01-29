<?php

namespace Mycelium\Services;

use Illuminate\Support\Str;
use Route;

/**
 * Service for generating routes
 */
class RouteManager
{
    /**
     * Binds shroom ids to urls
     * @var array
     */
    protected $singleShroomUrlBindings = [];

    /**
     * Register routes for a shroom serving controller
     * @param  string $url        URL of the route group
     * @param  string $controller Controller name
     * @return null
     */
    public function shroom($url, $controller)
    {
        if (!Str::endsWith($url, "/"))
            $url .= "/";

        $rootRoute = Route::get($url, $controller . "@view");
        Route::get($url . "edit", $controller . "@edit");
        Route::post($url . "edit", $controller . "@saveEdit");
        
        Route::post(
            $url . "upload-resource",
            $controller . "@uploadSpore"
        );

        Route::get(
            $url . "resource/{handle}",
            $controller . "@getResource"
        );

        Route::get(
            $url . "resource/{params}/{handle}",
            $controller . "@getResourceWithParams"
        );

        // bind shroom with a url
        $controllerClass = $rootRoute->action["namespace"] . "\\" . $controller;
        $slug = $controllerClass::shroomSlug();
        
        $url = url($rootRoute->uri);
        if (!Str::endsWith($url, "/"))
            $url .= "/";
        $this->singleShroomUrlBindings[$slug] = $url;
    }

    /**
     * Returns url of a shroom or shroom id
     */
    public function getShroomUrl($id, $append = "")
    {
        if (is_object($id))
            $id = $id->id;

        // for now, only single shroms
        if (array_key_exists($id, $this->singleShroomUrlBindings))
            return $this->singleShroomUrlBindings[$id] . $append;
        else
            return null;
    }

    /**
     * Returns url of a spore
     */
    public function getSporeUrl($shroom, $sporeHandle)
    {
        return $this->getShroomUrl($shroom, "resource/{$sporeHandle}");
    }
}