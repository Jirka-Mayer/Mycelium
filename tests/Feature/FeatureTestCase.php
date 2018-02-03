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

    public function setUp()
    {
        parent::setUp();

        $this->migrate();
        $this->mockFilesystem();
    }

    public function applyTestInfo()
    {
        $this->setTestInfo([
            "routeNamespace" => "Tests\\Feature\\{$this->feature}",
            "routesFilePath" => __DIR__ . "/{$this->feature}/routes.php",
            "views" => __DIR__ . "/{$this->feature}",
        ]);
    }
}