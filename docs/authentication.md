Authentication
==============

Mycelium provides a small authentication module for websites that doesn't necessarily need to implement their own.

> Users in this system are always editors - this system is not meant for end user registration.

First you need to enable auth in the mycelium configuration `config/mycelium.php`:

```php
"auth" => [
    "enabled" => true
]
```

Now you need to tell Laravel to use this auth system. Add a provider in the `config/auth.php` file:

```php
"providers" => [
    "mycelium" => [
        "driver" => "eloquent",
        "model" => Mycelium\Auth\User::class,
    ],
]
```

And make it use that provider:

```php
"guards" => [
    "web" => [
        "driver" => "session",
        "provider" => "mycelium",
    ]
]
```

Now, when the `"auth" => true` is set, you need to migrate so that the mycelium creates the `mycelium_users` table for storing users.

    php artisan migrate


## Routes

When you set the `"auth" => true` option in config file, mycelium automatically registers routes for login and logout. You can customize these routes in the `config/mycelium.php` file:

```php
"auth" => [
    "routes" => [
        // these are the default values
        "login" => "/login",
        "logout" => "/logout"
    ]
]
```


## Shroom serving

Now that the system is loaded and prepared, you need to tell the `ServesShroom` controller to use it.

```php
namespace App\Http\Controllers;

use Mycelium\ServesShroom;
use Mycelium\Auth\AuthorizesShroomEditor;

class IndexController extends Controller
{
    use ServesShroom, AuthorizesShroomEditor {
        AuthorizesShroomEditor::isUserAnEditor insteadof ServesShroom;
    }

    /*
        Other code...
     */

    // No longer needed
    /*public function isUserAnEditor()
    {
        return someLogicToDetermineAccessRights();
    }*/
}
```

The `Mycelium\Auth\AuthorizesShroomEditor` trait overrides the `isUserAnEditor` method and handles all the logic for you.


## Manage accounts

You don't need to use tinker to register new accounts, you can use the artisan:

```
    php artisan mc:user:create
```

You will be promted for the credentials and a password.

You can specify all properties inline if you want to call this via a script:

```
    php artisan mc:user:create --name=John --email=john@doe.com --password=secret
```

You can list all users by running:

```
    php artisan mc:user:list
```

Removing users is done via this command:

```
    php artisan mc:user:remove --id=? --name=? --email=?
```

All three options are optional, if multiple users match the query, all will be removed.

> You will be promted to confirm the removal after a table of users to be deleted is shown.
