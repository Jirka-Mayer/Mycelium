<?php

use Mycelium\Update\Update;

class FakeShroomUpdate extends Update
{
    public function run()
    {
        $this->storage->put("shroom-update-has-run.txt", "Yep, it did!");
    }
}