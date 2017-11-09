Shroom serving
==============

Possible ways to display a shroom:

1) Shroom is viewed by a guest
    - no mycelium javascript gets loaded
    - all widgets get compiled
    - ideally the html is fetched from cache
2) Shroom is viewed by an authorized user
    - javascript gets loaded
    - because we need taskbar to be visible
    - widgets get compiled
3) Shroom is viewed by a user in the editing mode
    - widgets are in editing mode


`ServesShroom` flow
-------------------

`GET /` calls `view` method

`view` methods calls `viewAsVisitor` or `viewAsEditor` based on the
result of the `isUserAnEditor` method.

`GET /edit` calls `edit` method

> Distinguish between: "visitor" and "editor"


Commits
-------

- master
- transparency