Testing setup
-------------

Tests are run from outside the package - from a full laravel application.

In the laravel application add repository (`composer.json`) to load mycelium package:

    ...
    "repositories": [
        {
            "type": "path",
            "url": "../Mycelium",
            "options": {
                "symlink": true
            }
        }
    ],
    ...

And some other props:

    "minimum-stability": "dev",
    "prefer-stable": false,

And register tests to load with PHPUnit:

    <testsuite name="Mycelium">
        <directory suffix="Test.php">./vendor/jiri-mayer/mycelium/tests</directory>
    </testsuite>

And then just run phpunit and it will work.


Testing workflow
----------------

When creating new test, put it under the `Mycelium\Tests` namespace and be sure to add:

    use Tests\TestCase;

This line allows you to use the test case of the full laravel application.