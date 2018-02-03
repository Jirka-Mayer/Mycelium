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

    public function setUp()
    {
        parent::setUp();

        $this->migrate();
        $this->mockFilesystem();
    }

    public function applyTestInfo()
    {
        $this->setTestInfo([
            "routeNamespace" => "Tests\\Scenario\\{$this->scenario}",
            "routesFilePath" => __DIR__ . "/{$this->scenario}/routes.php",
            "views" => __DIR__ . "/{$this->scenario}",
        ]);
    }
}