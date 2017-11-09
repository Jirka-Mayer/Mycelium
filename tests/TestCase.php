<?php

namespace Tests;

use Illuminate\Config\Repository;

class TestCase extends \Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
    
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__ . '/../vendor/laravel/laravel/bootstrap/app.php';
        
        // config
        $app->instance("config", $config = new Repository);
        $app["config"]->set(
            "mycelium",
            require __DIR__ . "/../assets/config/config.php"
        );

        // register service provider
        $app->register(\Mycelium\MyceliumServiceProvider::class);

        // register facade alias (if not already)
        if (!class_exists("Mycelium"))
            class_alias(\Mycelium\Facades\Mycelium::class, "Mycelium");
        
        $app->make(\Illuminate\Contracts\Console\Kernel::class)
            ->bootstrap();

        return $app;
    }

    /**
     * Run migrations to the database.
     *
     * @return void
     */
    public function migrate()
    {
        require_once __DIR__ . "/../assets/migrations/2017_08_29_193421_create_shrooms_table.php";
        (new \CreateShroomsTable)->up();
    }
}