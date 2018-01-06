Installation
============

Add mycelium as a dependency via composer:

```
composer require jirka-mayer/mycelium
```

Add service provider to the list of providers in your `config/app.php`:

```php
"providers" => [
    // ...

    Mycelium\MyceliumServiceProvider::class,
]
```

Also an alias for the `Mycelium` service is recommended:

```php
"aliases" => [
    // ...

    "Mycelium" => Mycelium\Facades\Mycelium::class,
]
```

Publish related files:

```
php artisan vendor:publish --provider=Mycelium\\MyceliumServiceProvider
```

Customize config `config/mycelium.php`.

> If you want to use [mycelium auth](authentication.md), setup the config now.

Migrate:

```
php artisan migrate
```


Mycelium auth
-------------

Create a user account:

```
    php artisan mycelium:user:create --name=John --email=john@doe.com
```

For more information see the [account management](authentication.md#manage-accounts) section.