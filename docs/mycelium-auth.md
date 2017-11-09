Authentication
==============

Mycelium provides a small authorization for websites that don't have
their own custom authentication.

First setup config:

    "auth.php"
    ----------

        'providers' => [
            'mycelium' => [
                'driver' => 'eloquent',
                'model' => Mycelium\Auth\User::class,
            ],
        ]

    "mycelium.php"
    --------------

        "auth" => [
            "enabled" => true
        ]

Enable authentication in a shroom serving controller by using the
`Mycelium\Auth\AuthorizesShroomEditor trait.