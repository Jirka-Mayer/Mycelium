<?php

namespace Tests\App;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class TestingServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $testInfo = $this->getTestInfo();

        if (!$testInfo)
            return;

        // register routes
        Route::middleware("web")
            ->namespace($testInfo["routeNamespace"])
            ->group($testInfo["routesFilePath"]);

        // register views
        $this->app["view"]->addLocation($testInfo["views"]);
    }

    /**
     * Returns information about the running test
     */
    protected function getTestInfo()
    {
        if (!file_exists(__DIR__ . "/.test"))
            return null;

        $json = file_get_contents(__DIR__ . "/.test");

        return json_decode($json, true);
    }
}
