<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShroomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("shrooms", function (Blueprint $table) {
            $table->string("id", 255)->unique();
            $table->string("title", 200)->nullable()->default(null);
            $table->timestamps();
            $table->smallInteger("public_revision")->nullable()->unsigned()->default(null);
            $table->softDeletes();
            $table->json("revisions")->default("{}");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("shrooms");
    }
}
