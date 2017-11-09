<?php

namespace Mycelium\Auth;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable;

    /**
     * Database table name
     * @var string
     */
    protected $table = "mycelium_users";

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        "name", "email", "password",
    ];

    /**
     * The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
        "password", "remember_token",
    ];
}