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

Initialize mycelium storage folder and update system:

```
php artisan mc:init
```

Create shrooms table

```
php artisan mc:shroom:table
```

Migrate

```
php artisan migrate
```


Mycelium auth
-------------

Create users table:

```
php artisan mc:user:table
```

Create a user account:

```
php artisan mc:user:create --name=John --email=john@doe.com
```

For more information see the [account management](authentication.md#manage-accounts) section.