Shroom
======

Shroom is the name for a static editable webpage in mycelium.

`Mycelium\Shroom` is an eloquent model that stores information about the page content. Shrooms are saved in database, in the `shrooms` table. This table is created automatically when migrating.

Shroom is identified by a unique `id`, which is a string in slug form.

> Shroom id should be a slug, because it may appear in a URL address.

Shroom can be created like this:

```php
$shroom = Shroom::create([
    "id" => "my-shroom"
]);
```


## Data

Shroom stores data in a key-value manner:

```php
$shroom->data()->put("heading", "Welcome to my website");
$shroom->save()
```

And you can retrieve data later on:

```php
$shroom->data()->get("heading");
```

You can specify the default value, if the data is not present yet:

```php
$shroom->data()->get("heading", "Here comes website heading...");
```

> If no default value specified, `null` is returned in case of no data.

The method `$shroom->data()` actually returns the `data` property of a `Mycelium\ShroomRevision` instance.


## Revisions

Say you have a website. You want to update some content, but you don't want visitors to see the changes as you make them. So you work on the master revision, but visitors see the published revision.

A shroom revision is the actual bag that holds the data. When you call `$shroom->data()`, it gives you the master revision - same as doing `$shroom->data("master")`.

When you are happy with the changes, you can commit the revision:

```php
// update page content
$shroom->data()->put("answer", 42);

// commit changes
$shroom->commit("Got the answer");

// don't forget to always save the shroom to database
$shroom->save();
```

Now the changes are saved, you can no longer edit the commited revision. But you still have the master. Master revision never goes away.

> Revisions are indexed, but contain the title given as the argument.

If you like the latest commit, you can make it public for your visitors:

```php
// make the latest revision public
$shroom->publish();
```

> You have to have a revision, master cannot be published.

You can access a specific revision using an argument:

```php
$shroom->data("public")->get("foo");

$shroom->data(2)->get("foo");
```

> You can set data of other revisions then master, but it's not recommended and the UI won't let you do that.

You can even get the revision object, that holds more information than just the data:

```php
$shroom->revision();
$shroom->revision("master");
$shroom->revision("public");
$shroom->revision(2)
```

For more info, dig into the code of `Mycelium\ShroomRevision` and `Mycelium\Shroom`.


## Storage

Even though there is the `shrooms` table in the database, it is not ideal for storing greater amount of data, like images. So the revisions are actually stored in a file.

The folder `storage/mycelium` is used for storing shrooms. There is one folder for each shroom named using the shroom id.

It contains folder `revisions`, where all revision data is listed - one JSON file for each revision.

> There should be a cache file used to speed up rendering in the future as well.


## Clusters

Apart from single shrooms, you can create shroom clusters. Shrooms in a cluster typically share one layout and are served by a single controller.

> Understand clusters as blog articles - all similar, but with different names, content and URL.

Cluster name is a part of the shroom id and is separated by a double-colon:

```php
"cluster-name::shroom-name"
```

To obtain the cluster name do:

```php
$shroom->cluster; // "cluster-name"
```

To obtain the shroom name do:

```php
$shroom->slug; // "shroom-name"
```

> All of these properties are linked, you can set any one of them and they will update accordingly.

Shrooms in a cluster should typically by named, so that the user can easily distinguish them. For this exists the `$shroom->title` attribute. It is linked to the id, so if you change the title, so will the id, so keep that in mind.

> Title is human readable, id will be a slug.

> Changing the id does not affect the title, it only works the other way around.

> Single shrooms cannot be titled, it would be only confusing.

You can create a clustered shroom like this:

```php
$shroom = Shroom::create([
    "cluster" => "my-cluster",
    "title" => "My shroom"
]);
```