<?php

namespace Tests\Feature\ShroomRenderingType;

use Illuminate\Routing\Controller;
use Illuminate\Contracts\Session\Session;
use Mycelium\ServesShroom;

class IndexController extends Controller
{
    use ServesShroom;

    public function isShroomTransparent()
    {
        return true;
    }

    public function isUserAnEditor(Session $session)
    {
        return $session->get("bob is editor", false);
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