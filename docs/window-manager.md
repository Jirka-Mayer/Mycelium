Window manager
==============

The `ui/WindowManager` class handles creation of and support for windows.

The window manager typically has only a single instance located at `mycelium.windowManager`. It's created in the `mycelium::js` view.

A window is a class extending the `ui/Window` class.

```js
class MyWindow extends Window
{
    constructor(window, document, mycelium)
    {
        super(window, document, mycelium)
    }
}
```

To create a window, you do:

```js
let win = new MyWindow(...)
windowManager.registerWindow(win)
```

The window class creates the window element, `registerWindow` only appends this element into the DOM. All windows are located inside a `div` created by the manager:

```html
<div class="mc-window-manager">
    <!-- windows -->
</div>
```


## Minimize only

Some windows can be *minimize only*, so you cannot actually close them. This flag is specified during the window registration.

```js
windowManager.registerWindow(win, {
    minimizeOnly: true
})
```


## Persistency

Sometimes you want a window to maintain it's state even after page reload. Such behavior is possible, but comes with certain limitations.

Such window has to be always instantiated, even if not used. That is because it needs to keep all dependencies and they are given via the constructor.

> This means that persistent windows are automatically *minimize only*.

Next it needs to be named, that it can be saved in the `localStorage` under a certain name and later resolved.

> Only the instance is named. There can exist other instances without a name.

Persistency has to be specified during the window registration:

```js
windowManager.registerWindow(win, {
    persistent: true,
    name: "MyWindow"
})
```

Also the window has to implement methods `sleep` and `wakeup`. `sleep` is used to serialize necesary information that is needed on wakeup. `sleep` gets called only once, when the page is being closed and `wakeup` only once, right after the registration.

This is, how the API looks like:

```js
class MyWindow extends Window
{
    sleep()
    {
        return {
            name: this.nameTextbox.value
        }
    }

    wakeup(dream)
    {
        this.nameTextbox.value = dream.name
    }
}
```

General window properties, such as position and visibility are serialized automatically.
