<?php

namespace Mycelium\Console\Auth;

use Illuminate\Console\Command;
use Mycelium\Auth\User;

class ListUsers extends Command
{
    protected $signature = "mc:user:list";

    protected $description = "Lists all mycelium users";

    public function handle()
    {
        $headers = ["ID", "Name", "Email", "Created at"];

        $users = User::all(["id", "name", "email", "created_at"])->toArray();

        $this->table($headers, $users);
    }
}