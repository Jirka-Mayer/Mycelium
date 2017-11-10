<?php

namespace Mycelium;

use Illuminate\Contracts\Container\Container;
use Illuminate\Support\ServiceProvider;

use Mycelium\Services\Mycelium;
use Mycelium\Services\RouteGenerator;
use Mycelium\Services\DeltaRenderer;
use Mycelium\Shroom;

class MyceliumServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Shroom::setFilesystem($this->app["mycelium.filesystem"]);

        $this->loadMigrationsFrom(__DIR__ . "/../assets/migrations");
        
        $this->loadViewsFrom(__DIR__ . "/../assets/views", "mycelium");

        if (config("mycelium.auth.enabled", false))
        {
            $this->loadRoutesFrom(
                __DIR__ . "/../assets/routes/authentication.php"
            );
        }

        $this->publishes([
            __DIR__ . "/../dist/mycelium.js" =>
                public_path("js/vendor/mycelium/mycelium.js"),
            __DIR__ . "/../dist/mycelium.css" =>
                public_path("css/vendor/mycelium/mycelium.css")
        ], "public");

        $this->publishes([
            __DIR__ . "/../assets/config/config.php" =>
                config_path("mycelium.php")
        ], "config");
    }

    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__ . "/../assets/config/config.php", "mycelium"
        );

        $this->app->singleton("mycelium.filesystem", function () {
            return $this->app["filesystem"]->createLocalDriver([
                "root" => storage_path("mycelium")
            ]);
        });

        $this->app->singleton(
            "mycelium.routes",
            RouteGenerator::class
        );
        
        $this->app->singleton(
            "mycelium.deltaRenderer",
            DeltaRenderer::class
        );

        $this->app->singleton("mycelium", function () {
            $mycelium = new Mycelium;
            $mycelium->setRouteGenerator($this->app["mycelium.routes"]);
            return $mycelium;
        });

        // for service injection
        $this->app->alias("mycelium", Mycelium::class);
    }
}