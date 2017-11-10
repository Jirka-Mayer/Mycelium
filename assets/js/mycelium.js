///////////////////////////////
// Create mycelium namespace //
///////////////////////////////

if (!window.mycelium)
    window.mycelium = {}

// object for storing mycelium state
if (!window.mycelium.state)
    window.mycelium.state = {}

// exported mycelium php config
if (!window.mycelium.config)
    window.mycelium.config = {}

// namespace for exporting classes
if (!window.mycelium.class)
    window.mycelium.class = {}

//////////////////////
// Register classes //
//////////////////////

window.mycelium.class.Shroom = require("./Shroom.js")

if (!window.mycelium.class.ui)
    window.mycelium.class.ui = {}

window.mycelium.class.ui.Toolbar = require("./ui/Toolbar.js")