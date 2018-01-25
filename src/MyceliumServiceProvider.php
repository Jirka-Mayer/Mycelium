<?php

namespace Mycelium;

use Illuminate\Contracts\Container\Container;
use Illuminate\Support\ServiceProvider;
use Illuminate\Log\Writer;
use Monolog\Logger as Monolog;

use Mycelium\Services\Mycelium;
use Mycelium\Services\RouteGenerator;
use Mycelium\Services\DeltaRenderer;
use Mycelium\Update\MyceliumUpdater;
use Mycelium\Update\ShroomUpdater;
use Mycelium\Shroom;

class MyceliumServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Shroom::setFilesystem($this->app["mycelium.filesystem"]);

        $this->loadMigrationsFrom(__DIR__ . "/../assets/migrations");
        
        $this->loadViewsFrom(__DIR__ . "/../assets/views", "mycelium");

        $this->loadTranslationsFrom(__DIR__ . "/../assets/lang", "mycelium");

        if (config("mycelium.auth.enabled", false))
        {
            $this->loadRoutesFrom(
                __DIR__ . "/../assets/routes/authentication.php"
            );
        }

        $this->publishes([
            __DIR__ . "/../dist/mycelium.js" =>
                public_path("vendor/mycelium/mycelium.js"),
            
            __DIR__ . "/../lib/quill.core.1.3.4.js" =>
                public_path("vendor/mycelium/quill.core.1.3.4.js"),

            __DIR__ . "/../dist/mycelium.css" =>
                public_path("vendor/mycelium/mycelium.css")
        ], "public");

        $this->publishes([
            __DIR__ . "/../assets/config/config.php" =>
                config_path("mycelium.php")
        ], "config");

        if ($this->app->runningInConsole())
        {
            $this->commands([
                \Mycelium\Console\Auth\CreateUser::class,
                \Mycelium\Console\Auth\ListUsers::class,
                \Mycelium\Console\Auth\RemoveUsers::class,
                \Mycelium\Console\Auth\ChangeUserPassword::class,
            ]);

            $this->bootMyceliumUpdating();
        }
    }

    /**
     * Boot logic surrounding mycelium updating
     */
    protected function bootMyceliumUpdating()
    {
        $this->commands([
            \Mycelium\Console\Update\InitializeUpdateSystem::class,
            \Mycelium\Console\Update\Update::class,
        ]);

        // load internal update repositories
        $this->app["mycelium.updater"]->loadRepository(
            __DIR__ . "/../assets/updates/global");
        $this->app["mycelium.shroom-updater"]->loadRepository(
            __DIR__ . "/../assets/updates/shroom");

        // load external repos
        // TODO... via config
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

        if ($this->app->runningInConsole())
            $this->registerMyceliumUpdating();

        $this->app->singleton("mycelium", function () {
            $mycelium = new Mycelium;
            $mycelium->setRouteGenerator($this->app["mycelium.routes"]);
            return $mycelium;
        });

        // for service injection
        $this->app->alias("mycelium", Mycelium::class);
    }

    /**
     * Register all services surrounding mycelium updating
     */
    protected function registerMyceliumUpdating()
    {
        $this->app->singleton("mycelium.update-log", function () {
            $writer = new Writer(
                new Monolog("mycelium-update-log")
            );

            $writer->useFiles(
                storage_path("mycelium/update/update.log"),
                "debug"
            );

            return $writer;
        });

        $this->app->singleton("mycelium.updater", function () {
            return new MyceliumUpdater(
                $this->app["mycelium.filesystem"],
                $this->app["mycelium.update-log"]
            );
        });

        $this->app->singleton("mycelium.shroom-updater", function () {
            return new ShroomUpdater(
                $this->app["mycelium.filesystem"],
                $this->app["mycelium.update-log"]
            );
        });
    }
}