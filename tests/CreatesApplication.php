<?php

namespace Tests;

use Illuminate\Foundation\Console\Kernel;

trait CreatesApplication
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $this->applyTestInfo();

        $app = require __DIR__ . '/App/bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Sets info about where to load routes and views
     */
    public function setTestInfo($info)
    {
        $json = json_encode($info, JSON_PRETTY_PRINT);
        file_put_contents(__DIR__ . "/App/.test", $json);
    }

    /**
     * Removes the test info file
     */
    public function clearTestInfo()
    {
        if (file_exists(__DIR__ . "/App/.test"))
            unlink(__DIR__ . "/App/.test");
    }

    /**
     * Override this if you need test info control
     */
    public function applyTestInfo()
    {
        // default is clearing
        $this->clearTestInfo();
    }
}