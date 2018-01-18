Data format versioning
======================

Updating mycelium does not only mean updating the source code, but also the corresponding data. Because I don't want to do manual data update, whenever I update mycelium.

But that poses some problems.


## When to update data

Shroom does not care about the type of data, so it's difficult to update the data in PHP. So should JS do it? I don't think so, that would mean either the user would have to open and save all shrooms, or it should be able to update itself during viewing, which is not good - why should the viewing logic update the data.

So the solution is to save data type along with the data and perform the update during source code update.

So there are more ways an update can be performed - either a full folder-structure update, or just some small data update (say a rich-text data type update). Also a web can have custom data types, so theese may be updated as well.

> A shroom is always located inside a folder. Position of that folder may change and the inner arrangement may change, but the folder itself represents the whole shroom.


## How to update shrooms

A shroom may be exported into a zip file, so it needs to take it's format version with itself, otherwise it would be impossible to import older shrooms. So I need to store the overall `mycelium` directory structure version and the shroom version for each shroom folder.

Shroom conversion happens one at a time, not all shrooms at once, because we don't want 2x HDD usage during update.

The shroom gets converted into a different folder and than those folders are swapped.

The conversion happens during the update, so the website is in maintenance mode. I don't want to implement some kind of shroom locking, just stop the entire app during the update.


## The updating logic

The update will be performed simmilarly to migrations database, but I don't want a name clash, so let's call those files *update* files.


## Shroom data

The data fields in a shroom has to now be typed, so we add a special key to some objects, and that key defines the object type:

```json
{
    "data": {
        "my-rich-text-here": {
            // object type
            "@type": "mycelium::rich-text",

            // other object contents
            "ops": []
        }
    }
}
```

> These types, when converting are searched for, deeply even inside other objects, because they may be nested.

The data type is something different to a widget, one type may be handled by many widgets.

Also all the mycelium types will be prefixed and same should apply to custom website specific data types, to avoid collisions.


## Updating scopes

What exactly can be updated and is mutually independent? Update scope.

Listing of update scopes:

- mycelium storage structure
- shroom structure (folder names, spore location, revision file contents and layout...)
- shroom data types
- spore types