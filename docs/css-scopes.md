CSS scopes
==========

CSS scopes are a way to get around the issue of styling contents of iframes.

The problem appeared with table blots - when they are rendered, they are just
a table element, but when edited, they are located inside an iframe element.
This creates a shield for CSS selectors, so there needs to be some scheme
of how to style them.

A CSS scope is just a regular CSS class of the special
form `css-scope__my-scope-name`.

In case of text pads, this class is automatically put on each nested
iframe text pad. That means you can style the contents if you make the CSS
selectors relative to the scope class.

> Note that scope classes of the same scope may be nested - be aware of that
when writing styles for scopes.

The proposed usage is such:

- wherever you have rich text on your website, you style it via a CSS scope
- style it by using nested selectors `.css-scope__my-scope h2`
    - you have to do that anyway, since Quill will not put custom classes
        on the rich text elements