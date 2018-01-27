Single shroom HTTP interface
============================

A shroom has a unique url address, say `/my-shroom` and all requests
associatead with the shroom happen below this url.


`GET /`
-------

Returns the rendered shroom for viewing.

Calls `ServesShroom@view` controller method.

There are no authorization restrictions by default. Override
`ServesShroom@guardViewing` for customization.


`GET /edit`
-----------

Returns the rendered shroom for editing.

Calls `ServesShroom@edit` controller method.

This request is by default prohibited for everyone. Override
`ServesShroom@guardEditing` for customization.


`POST /save-edit`
-----------------

Saves changes made to the shroom when editing.

> This route is called by javascript in the background. Specifically
> by the Shroom@save method.

Authorization is same as in `/edit`.

The only changes saved are changes to the master `data` fields.

> Changes to title make no sense in the context of a single shroom.

The request payload looks like this:

```json
{
    "data": {
        "key": "Lorem ipsum...",
        "key2": { "ops": [] },
        "...": "..."
    }
}
```

Only the listed data keys will be updated.

> Javascript however currently sends all data regardless of individual changes.

> Key removal is not supported (not needed).


`GET /resource/{type}/{params?}/{sporeId}`
------------------------------------------

For downloading spores.

> In the URL address 'resource' is used instead of 'spore'.


`POST /upload-resource`
-----------------------

For uploading new spores to the server.

Think about multipart upload when implementing...

JS -> FILE -> PARTS -> ENCODE 64 -> SEND EACH >> obtain shroom ID

When to generate shroom id? When all data is on the server.
Where to save shroom parts? In a cache with timeout.
Part size? 1MB