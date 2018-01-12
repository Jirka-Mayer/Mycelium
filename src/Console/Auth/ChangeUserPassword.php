<?php

namespace Mycelium\Console\Auth;

use Illuminate\Console\Command;
use Mycelium\Auth\User;

class ChangeUserPassword extends Command
{
    protected $signature = "mycelium:user:password {--id=} {--name=} {--email=}";

    protected $description = "Change mycelium user's password";

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

        if ($users->count() > 1)
        {
            $this->error("Multiple users matched the specifications.");
            return;
        }

        $user = $users->first();
        $this->info("User: $user->id $user->name $user->email");

        $password = $this->secret("Type new password for this user");

        $user->password = bcrypt($password);
        $user->save();

        $this->info("Password has been changed.");
    }
}