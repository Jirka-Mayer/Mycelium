<?php

namespace Tests\Feature\SporeUploadDownload;

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

    public function isUserAnEditor()
    {
        return true;
    }

    public static function shroomSlug()
    {
        return "index";
    }

    public function shroomView()
    {
        throw new \Exception("Shroom has no view - see the controller.");
    }
}