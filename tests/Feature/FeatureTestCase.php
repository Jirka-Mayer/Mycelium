<?php

namespace Tests\Feature;

use Tests\TestCase;

class FeatureTestCase extends TestCase
{
    /**
     * Feature name - override this
     * @var string
     */
    public $feature = null;

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = parent::createApplication();

        $this->registerRoutes($app);
        $this->addViewLocation($app);

        return $app;
    }

    /**
     * Registers routes for the given scenario
     * @return void
     */
    public function registerRoutes($app)
    {
        $app["router"]->middleware('web')
             ->namespace("Tests\\Feature\\{$this->feature}")
             ->group(__DIR__ . "/{$this->feature}/routes.php");
    }

    /**
     * Replaces the view finder with a new one that points to
     * the proper scenario directory
     * @return void
     */
    public function addViewLocation($app)
    {
        $app["view"]->addLocation(__DIR__ . "/{$this->feature}");
    }
}