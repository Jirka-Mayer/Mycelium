Text pad
========

Text pad is a wrapper around a Quill instance. It provides richer
interface and handles initialization of table blots and other extensions.

It is the main component of rich-text widget, but can be used
outside of the widget.

> When it comes to styling, take a look at [CSS scopes](css-scopes.ms).


## Tables

For table support, text pad has a lot of properties, functions and options,
that are mostly used inside the system. Only few of them are actually
meant as public interface.

For more details look into the code, it's densely commented.


## Active pad

The `TextPad.activePad` static property points to the last selected,
or currently selected text pad. It should have value for most of the time,
however on page load or in some special cases it may have the value of `null`.

When you use static functions, they are mainly just redirected
to the active pad instance. Just for convinience.


## Text pad toolbar

This window is meant to provide control over the active pad.