<?php

namespace Mycelium\Console\Auth;

use Illuminate\Console\Command;
use Mycelium\Auth\User;

class CreateUser extends Command
{
    protected $signature = "mc:user:create {--name=} {--email=} {--password=}";

    protected $description = "Create new mycelium auth user";

    protected $name = null;
    protected $email = null;
    protected $password = null;

    public function handle()
    {
        // get arguments or prompt the user
        $this->obtainName();
        $this->obtainEmail();
        $this->obtainPassword();

        // check that email is unique
        if (User::where("email", $this->email)->count() > 0)
        {
            $this->error("User with this email address already exists.");
            return;
        }

        // create the user
        User::create([
            "name" => $this->name,
            "email" => $this->email,
            "password" => bcrypt($this->password)
        ]);

        $this->info("User has been created.");
    }

    protected function obtainName()
    {
        $this->name = $this->option("name");

        if ($this->name === null)
            $this->name = $this->ask("Name");
    }

    protected function obtainEmail()
    {
        $this->email = $this->option("email");

        if ($this->email === null)
            $this->email = $this->ask("Email");
    }

    protected function obtainPassword()
    {
        $this->password = $this->option("password");

        if ($this->password === null)
            $this->password = $this->secret("Password");
    }
}