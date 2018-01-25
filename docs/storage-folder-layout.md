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