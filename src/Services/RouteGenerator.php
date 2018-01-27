<?php

namespace Mycelium\Services;

use Illuminate\Support\Str;
use Route;

/**
 * Service for generating routes
 */
class RouteGenerator
{
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

        Route::get($url, $controller . "@view");
        Route::get($url . "edit", $controller . "@edit");
        Route::post($url . "edit", $controller . "@saveEdit");
        Route::post($url . "upload-resource", $controller . "@uploadSpore");
    }
}