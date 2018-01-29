Storage folder layout
=====================

> If you're looking for an overview of the update system,
take a look [here](storage-updates.md).


## `/version.json`

This file contains version of the storage folder layout.

```json
{
    // without the ".php" extension
    "global": "2018_01_25_121345_some_version_here"
}
```


## `/shrooms`

This folder contains all shrooms. Their folders correspond to the
`$shroom->slug` value.


## `/update`

This folder contains all data about updates, mostly temporary however.

`/update/update.log` is a log containg the update process information.

`/update/backup-shroom` is a folder, where shrooms are backed up during
their update (one at a time into this very folder).


## `/upload`

This folder is used when uploading multipart data.

`/upload/data-{uploadId}` is a file contain the uploaded data.

`/upload/context-{uploadId}` is a file containing metadata about the upload.


## `spores`

Contains raw spores as they were uploaded. Theese files are immutable,
so it's not split by revisions.

Each spore here has name according to it's handle.


## `spore-meta`

This folder contains any metadata about spores or caches or anything
that a spore handler wants. It's split into folders by revision and spore:

    + spore-meta
        + my-HD-photo_1f3l
            + revision-1
                my-HD-photo_1f3l_w1920.jpg
                my-HD-photo_1f3l_w1280.jpg
            + revision-master
                my-HD-photo_1f3l_w720.jpg
                my-HD-photo_1f3l_w1920.jpg

