Shroom serving
==============

Because serving a shroom is a common thing, it's already implemented in the mycelium.

First you need to setup required routes. You can use the `Mycelium` service inside your `routes/web.php` file:

```php
Mycelium::routes()->shroom("/", "IndexController");
```

You define the URL for the shroom to use and the name of the controller.

This command sets up routes for viewing, editing, async javascript saving and so on.

Now the controller needs to use the `Mycelium\ServesShroom` trait:

```php
namespace App\Http\Controllers;

use Mycelium\ServesShroom;

class IndexController extends Controller
{
    use ServesShroom;

    public function shroomSlug()
    {
        return "index";
    }

    public function shroomView()
    {
        return "index";
    }

    public function isShroomTransparent()
    {
        return true;
    }

    public function isUserAnEditor()
    {
        return someLogicToDetermineAccessRights();
    }
}
```

You can see the methods you have to override for the controller to work.

`shroomSlug` returns the slug (id) of the shroom. This should be globally unique, it's used to identify shroom in database and filesystem.

> If the shroom does not exists, the controller automatically creates it.

`shroomView` returns the name of the view to use for rendering. For more information se [shroom view](shroom-view.md) page.

`isShroomTransparent` determines shroom transparency. Normally if the shroom is not published, a visitor cannot see it. That's ok for an article, but it's not good for your index page. Even if you haven't finished writing your website, when the shroom is transparent, a visitor can see the content.

If the shroom is transparent, it renders master when not published.

`isUserAnEditor` should return true, if the currently authenticated user is allowed to edit the page. This method allows you to define your own authentication system.

> If you don't need to define custom authentication, you can use the [mycelium authentication](authentication.md).

> Note that all of these functions allow for dependency injection.


Render types
------------

There are three main ways, how the shroom can render.

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


Shroom serving flow
-------------------


### Viewing

`GET /` calls `view` method

`view` methods calls `viewAsVisitor` or `viewAsEditor` based on the
result of the `isUserAnEditor` method.


### Editing

`GET /edit` calls `edit` method


Cluster serving
---------------

In the future...