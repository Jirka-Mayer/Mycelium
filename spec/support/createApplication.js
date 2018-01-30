const {JSDOM} = require("jsdom")
const Shroom = require("../../assets/js/Shroom.js")
const defaultOptions = require("../../assets/js/utils/defaultOptions.js")
const fs = require("fs")
const decache = require("decache")

/**
 * Sets up the mycelium client side application in editing mode
 */
function createApplication(shroomData)
{
    let dom = new JSDOM(undefined, {
        runScripts: "dangerously",
        resources: "usable"
    })
    let window = dom.window

    // load quill
    global.window = window
    global.document = window.document
    global.Node = window.Node
    global.navigator = window.navigator
    
    decache("../../lib/quill.core.1.3.4.js")
    window.Quill = require("../../lib/quill.core.1.3.4.js")

    global.window = undefined
    global.document = undefined
    global.Node = undefined
    global.navigator = undefined

    // load mycelium
    global.window = window
    global.document = window.document

    decache("../../assets/js/mycelium.js")
    require("../../assets/js/mycelium.js")

    global.window = undefined
    global.document = undefined

    // setup mycelium
    window.mycelium.state = { editing: true, editor: true }
    window.mycelium.config = {
        auth: {
            enabled: true,
            routes: {
                login: "/login",
                logout: "/logout"
            }
        }
    }

    window.mycelium.initialization.setupQuill(window)
    window.mycelium.initialization.registerClasses(window)

    // create the shroom
    window.mycelium.initialization.createShroom(window, defaultOptions(shroomData, {
        id: "my-shroom",
        slug: "my-shroom",
        cluster: null,
        title: "My shroom",
        data: {},
        spores: {},
        url: "http://example.com/"
    }))

    // allow requiring html files as raw text
    require.extensions[".html"] = function (module, filename) {
        module.exports = fs.readFileSync(filename, "utf8")
    }

    // load UI
    window.mycelium.initialization.initializeUI(window)

    return window
}

module.exports = createApplication