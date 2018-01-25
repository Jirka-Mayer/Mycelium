<?php

namespace MyceliumTests\Update;

use Tests\Update\GlobalUpdateTestCase;

class ModularizeStorageFolderUpdateTest extends GlobalUpdateTestCase
{
    /**
     * @test
     */
    public function it_moves_shrooms()
    {
        // setup
        $this->storage->put("index/shroom-content.txt", "lorem ipsum");
        $this->storage->put("gallery/shroom-content.txt", "lorem ipsum");
        $this->storage->put("about-me/shroom-content.txt", "lorem ipsum");
        $this->storage->put("articles::welcome/shroom-content.txt", "lorem ipsum");

        // update
        $this->updater->updateList->addUpdateRecord(
            __DIR__ . "/../../../assets/updates/global/2018_01_18_113400_modularize_storage_folder_update.php"
        );

        $this->updater->update();

        // check result
        $this->assertEquals("lorem ipsum",
            $this->storage->get("shrooms/index/shroom-content.txt"));
        $this->assertEquals("lorem ipsum",
            $this->storage->get("shrooms/gallery/shroom-content.txt"));
        $this->assertEquals("lorem ipsum",
            $this->storage->get("shrooms/about-me/shroom-content.txt"));
        $this->assertEquals("lorem ipsum",
            $this->storage->get("shrooms/articles::welcome/shroom-content.txt"));
    }
}