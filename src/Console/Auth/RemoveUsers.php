<?php

namespace Mycelium\Console\Auth;

use Illuminate\Console\Command;
use Mycelium\Auth\User;

class RemoveUsers extends Command
{
    protected $signature = "mycelium:user:remove {--id=} {--name=} {--email=}";

    protected $description = "Removes a mycelium auth user";

    public function handle()
    {
        $parameters = [];

        if ($this->option("id") !== null)
            $parameters["id"] = $this->option("id");

        if ($this->option("name") !== null)
            $parameters["name"] = $this->option("name");

        if ($this->option("email") !== null)
            $parameters["email"] = $this->option("email");

        $users = User::where($parameters)->get();

        if ($users->count() == 0)
        {
            $this->error("No users matched the specifications.");
            return;
        }

        $listed = $users->map(function ($user) {
            return collect($user->toArray())
                ->only(["id", "name", "email", "created_at"])
                ->all();
        });

        $headers = ["ID", "Name", "Email", "Created at"];
        $this->table($headers, $listed);

        if (!$this->confirm("Are you sure you want to remove these users?"))
            return;

        foreach ($users as $user)
            $user->delete();

        $this->info("Users have been removed.");
    }
}