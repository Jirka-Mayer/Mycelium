Javascript API
==============

All javascript objects for mycelium are hidden under the `window.mycelium`
namespace.

This namespace is initialized in the `js.blade.php` view.


Namespace creation
------------------

First all mycelium related javascript code is loaded. That's the
`dist/mycelium.js` file, exported into the `public` directory.

The file contains the `assets/js/mycelium.js` file that governs the
bootstrapping phase.


Contents
--------

`mycelium.class` is a namespace for exporting javascript classes
belonging to mycelium.

`mycelium.state` is an object of flags describing the current mycelium
state. [see more](state.md)