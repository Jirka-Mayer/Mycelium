<?php

namespace Tests\Scenario\StaticTransparentWebsite;

use Illuminate\Routing\Controller;
use Illuminate\Contracts\Session\Session;
use Illuminate\Auth\Access\AuthorizationException;
use Mycelium\ServesShroom;

class IndexController extends Controller
{
    use ServesShroom;

    public function isShroomTransparent()
    {
        return true;
    }

    public function guardEditing(Session $session)
    {
        if (!$session->get("bob is logged in"))
            throw new AuthorizationException;
    }

    public function shroomSlug()
    {
        return "index";
    }

    public function shroomView()
    {
        return "index";
    }
}