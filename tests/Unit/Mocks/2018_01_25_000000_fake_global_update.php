<?php

use Mycelium\Update\Update;

class FakeGlobalUpdate extends Update
{
    public function run()
    {
        $this->storage->put("update-has-run.txt", "Yep, it did!");
    }
}