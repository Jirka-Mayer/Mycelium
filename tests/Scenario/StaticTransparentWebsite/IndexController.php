<?php

namespace Tests\Scenario\StaticTransparentWebsite;

use Illuminate\Routing\Controller;
use Illuminate\Contracts\Session\Session;
use Mycelium\ServesShroom;

class IndexController extends Controller
{
    use ServesShroom;

    public function isUserAnEditor(Session $session)
    {
        return $session->get("bob is logged in", false);
    }

    public static function isShroomTransparent()
    {
        return true;
    }

    public static function shroomSlug()
    {
        return "index";
    }

    public static function shroomView()
    {
        return "index";
    }
}