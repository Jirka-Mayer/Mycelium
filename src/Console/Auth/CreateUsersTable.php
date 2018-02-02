<?php

namespace Mycelium\Console\Auth;

use Illuminate\Console\Command;
use Schema;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Command
{
    protected $signature = "mc:user:table";

    protected $description = "Creates or refreshes user database table";

    public function handle()
    {
        Schema::dropIfExists("mycelium_users");

        Schema::create("mycelium_users", function (Blueprint $table) {
            $table->increments("id");
            $table->string("name");
            $table->string("email")->unique();
            $table->string("password");
            $table->rememberToken();
            $table->timestamps();
        });

        $this->info("Users table has been created.");
    }
}