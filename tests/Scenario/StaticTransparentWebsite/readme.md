Static transparent website scenario
===================================

The entire web consists of a single page - index. This page is
a single shroom and is served by the `IndexController`.

The page is transparent so it's visible to visitors even if it's not published.
That means there's no need to worry about publishing or comitting.

When serving a single shroom, it's title will be `null` and it shouldn't be set,
because it would cause id to change as well. Single static shroom
doesn't need a title.