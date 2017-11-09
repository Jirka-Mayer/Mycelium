<?php

namespace Mycelium\Auth;

use Illuminate\Contracts\Auth\Guard;

/**
 * This trait uses the mycelium authorization
 * for serving single shroom
 */
trait AuthorizesShroomEditor
{
    /**
     * Return true if the user requesting this page is an editor
     * @return boolean
     */
    public function isUserAnEditor(Guard $guard)
    {
        return $guard->check();
    }
}