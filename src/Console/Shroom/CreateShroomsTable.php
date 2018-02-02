<?php

namespace Mycelium\Console\Shroom;

use Illuminate\Console\Command;
use Schema;
use Illuminate\Database\Schema\Blueprint;

class CreateShroomsTable extends Command
{
    protected $signature = "mc:shroom:table";

    protected $description = "Creates shroom database table";

    public function handle()
    {
        Schema::dropIfExists("shrooms");

        Schema::create("shrooms", function (Blueprint $table) {
            $table->string("id", 255)->unique();
            $table->string("title", 200)->nullable()->default(null);
            $table->timestamps();
            $table->integer("public_revision")->nullable()->unsigned()->default(null);
            $table->softDeletes();
        });

        $this->info("Shrooms table has been created.");
    }
}