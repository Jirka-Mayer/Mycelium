Storage updates
===============

Here is an [essay on how I came up with the current update system design](data-format-versioning.md).


## Updating mycelium

First you should backup the entire storage folder, just in case. There is some
backing up, when updating shrooms, but it's actually quite limited.

There is also no revert system or transactions so if the update fails, it just
stops in the middle of work. That can be however due to any exception.

> The update process is logged into to `storage/mycelium/update/update.log` file,
so you can exactly identify what has been completed and what has not.

When updating you should first update the code via composer. This fetches the
latest updates and makes sure they will be able to run.

    composer update jirka-mayer/mycelium

Then you run:

    php artisan mycelium:update

This should perform all updates automatically.


## How does the update process works

First are executed the global updates. These modify the layout of the entire
`storage/mycelium` folder.

These updates perform no backing up, but should be written in such a way,
that if something gets wrong, they deal with it as good as they can and
no loss of data should happen.

These may move shrooms around so they have to be executed first and
only then should be run any other updates (like shroom updates), because
the new code relies on a specific storage layout.

Next are run shroom updates. These are run for each shroom independently
and each time the update starts, the whole shroom gets backed up
into the `storage/mycelium/update/shroom-backup` folder.


## Pushing a new update into production

An update is very simmilar to a database migration, except it has only
the method `run`.

```php
use Mycelium\Update\Update;

class ModularizeStorageFolderUpdate extends Update
{
    public function run()
    {
        // perform your logic
    }
}
```

All updates (global, shroom) have the same layout - they inherit
the `Update` base class.

> You should not access mycelium code from within the update. They should
be Mycelium version independent. And Laravel version independent
as much as possible.

The class has only two properties you can access:

```php
// this is a Illuminate\Contracts\Filesystem instance
// it's root is either in mycelium storage folder
// or in shroom folder - depends on the update type
$this->storage

// Instance of a logger, use this to add records
// to the `storage/mycelium/update/update.log` file
$this->log
```

When you add updates, you usually update the mycelium code as well, so
now when the code creates new shroom / new mycelium instance is installed, it
assumes, that it works with the latest storage version.

So you should not forget to update these files as well!

- `assets/updates/default-global-version-file.json`
- `assets/updates/default-shroom-version-file.json`
