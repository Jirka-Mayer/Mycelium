<?php

namespace Mycelium\Facades;

use Illuminate\Support\Facades\Facade;

class Mycelium extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return "mycelium";
    }
}
