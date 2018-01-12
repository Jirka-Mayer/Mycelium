const RichTextWidgetToolbar = require("./windows/RichTextWidgetToolbar.js")
const LinkBlotProperties = require("./windows/LinkBlotProperties.js")
const getRefs = require("../utils/getRefs.js")

class Toolbar
{
    constructor(window, document, mycelium)
    {
        // reference to the mycelium namespace
        this.mycelium = mycelium

        /**
         * References to elements
         */
        this.refs = {}

        this.createDOM(document)

        // create rich-text widget toolbar window
        if (this.mycelium.state.editing)
        {
            // Link blot properties
            this.linkBlotProperties = new LinkBlotProperties(
                window, document, this.mycelium
            )

            this.mycelium.windowManager.registerWindow(
                this.linkBlotProperties,
                {
                    barless: true,
                    minimized: true
                }
            )

            // Toolbar
            this.richTextToolbar = new RichTextWidgetToolbar(
                window, document, this.mycelium,
                this.linkBlotProperties
            )

            this.mycelium.windowManager.registerWindow(
                this.richTextToolbar,
                {
                    persistent: true,
                    name: "RichTextWidgetToolbar"
                }
            )
        }
    }

    /**
     * Creates all elements and appends them to the document
     */
    createDOM(document)
    {
        // create toolbar element
        let element = document.createElement("div")
        element.innerHTML = require("./Toolbar.html")
        element.className = "mc-toolbar"

        // create spacer
        let spacer = document.createElement("div")
        spacer.style.height = "50px"

        // add elemnts to the page
        document.body.appendChild(element)
        document.body.appendChild(spacer)

        this.element = element
        this.spacer = spacer
        this.refs = getRefs(this.element)

        // register event listeners
        this.refs.logout.addEventListener(
            "click", this.onLogoutClick.bind(this)
        )
        this.refs.toggleEdit.addEventListener(
            "click", this.onToggleEditClick.bind(this)
        )

        if (this.mycelium.state.editing)
        {
            this.refs.richTextToolbar.addEventListener(
                "click", () => {
                    this.richTextToolbar.maximize()
                }
            )
        }
        else
        {
            this.refs.richTextToolbar.remove()
        }

        this.initializeElements()
    }

    /**
     * Initializes individual elements based on the mycelium state
     */
    initializeElements()
    {
        this.initializeLogoutButton()
    }

    /**
     * Initializes logout button
     */
    initializeLogoutButton()
    {
        if (!this.mycelium.config.auth.enabled)
            this.refs.logout.remove()
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    onLogoutClick()
    {
        window.location.href = this.mycelium.config.auth.routes.logout
    }

    onToggleEditClick()
    {
        var path = window.location.pathname

        if (path[path.length - 1] !== "/")
            path += "/"

        if (this.mycelium.state.editing)
        {
            // exit edit mode
            window.location.href = path + ".."
        }
        else
        {
            // enter edit mode
            window.location.href = path + "edit"
        }
    }
}

module.exports = Toolbar