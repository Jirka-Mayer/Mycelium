<?php

namespace Tests\Scenario;

use Tests\TestCase;

class ScenarioTestCase extends TestCase
{
    /**
     * Scenario name - override this
     * @var string
     */
    public $scenario = null;

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
             ->namespace("Tests\\Scenario\\{$this->scenario}")
             ->group(__DIR__ . "/{$this->scenario}/routes.php");
    }

    /**
     * Replaces the view finder with a new one that points to
     * the proper scenario directory
     * @return void
     */
    public function addViewLocation($app)
    {
        $app["view"]->addLocation(__DIR__ . "/{$this->scenario}");
    }
}