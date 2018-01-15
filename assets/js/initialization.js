
function setupQuill(window)
{
    let Quill = window.Quill

    // register blots
    require("./quill/blots/BoldBlot.js")(Quill)
    require("./quill/blots/ItalicBlot.js")(Quill)
    require("./quill/blots/LinkBlot.js")(Quill)
    require("./quill/blots/HeaderBlot.js")(Quill)
    require("./quill/blots/TableBlot.js")(Quill)
}

function registerClasses(window)
{
    window.mycelium.class.Shroom = require("./Shroom.js")

    if (!window.mycelium.class.widgets)
        window.mycelium.class.widgets = {}

    window.mycelium.class.widgets.RichText = require("./widgets/RichText.js")

    if (!window.mycelium.class.ui)
        window.mycelium.class.ui = {}

    window.mycelium.class.ui.Toolbar = require("./ui/Toolbar.js")
    window.mycelium.class.ui.WindowManager = require("./ui/WindowManager.js")
}

function createShroom(window, shroomData)
{
    window.mycelium.shroom = new window.mycelium.class.Shroom(
        window,
        window.document,
        window.mycelium,
        shroomData
    )

    window.mycelium.shroom.initializeAutosave()
}

function initializeUI(window)
{
    window.mycelium.windowManager = new window.mycelium.class.ui.WindowManager(
        window,
        window.document
    )

    window.mycelium.toolbar = new window.mycelium.class.ui.Toolbar(
        window,
        window.document,
        window.mycelium
    )
}

module.exports = {
    setupQuill,
    registerClasses,
    createShroom,
    initializeUI,
}