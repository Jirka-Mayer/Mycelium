module.exports = function(Quill) {

const Embed = Quill.import("blots/embed")
const ClipCache = require("../IframeClipCache.js")
const cssClass = require("../../utils/cssClass.js")

const DIMENSION_TIMER_INTERVAL = 5000
const CSS_SCOPE_CLASS_PREFIX = "css-scope__"

class IframeBlot extends Embed
{
    constructor(element, value)
    {
        super(element, value)

        /*
            NOTE: I'm creating custom variables even if they already
            exist on the blot, because I like consistent naming with
            the rest of my library
         */

        /**
         * The html element
         */
        this.element = element

        /**
         * ID of the clip-cache storage
         */
        this.clipCacheId = ClipCache.generateId()

        // a tick to let Quill put the element into the DOM
        setTimeout(() => {

            // check compatibility
            if (!element.contentDocument || !element.contentWindow)
            {
                console.error("iframe javascript interface not supported")
                return
            }

            this.initialize()

        }, 0)
    }

    deleteAt(index, length)
    {
        if (this.delete)
            this.delete()

        super.deleteAt(index, length)
    }

    value()
    {
        // override this
        return super.value()
    }

    ///////////////////////////
    // Custom implementation //
    ///////////////////////////

    /**
     * Initialize all necessary things
     */
    initialize()
    {
        /**
         * Parent text pad
         */
        this.textPad = null

        /**
         * Document of the iframe content
         */
        this.contentDocument = this.element.contentDocument

        /**
         * Window of the iframe content
         */
        this.contentWindow = this.element.contentWindow

        /**
         * Body of the content document
         */
        this.contentBody = this.contentDocument.body

        /**
         * Content div of the iframe
         */
        this.contentDiv = null

        this.getParentTextPad()

        this.setupDomAndStyles()

        this.startDimensionTimer()
    }

    /**
     * Finds the parent text pad element
     */
    getParentTextPad()
    {
        // find parent widet
        let el = this.element
        let padElement = null

        while (el.parentElement)
        {
            if (el.getAttribute("mycelium-text-pad") === "here")
            {
                padElement = el
                break
            }

            el = el.parentElement
        }

        if (!padElement)
        {
            console.error("Unable to find parent text pad!")
            return null
        }

        this.textPad = padElement.textPad
    }

    /**
     * Create content document
     */
    setupDomAndStyles()
    {
        // set iframe attributes
        this.element.setAttribute("scrolling", "no")
        this.element.setAttribute("frameborder", "0")

        // set clip-cache id
        this.element.setAttribute("mycelium-clip-cache-id", this.clipCacheId)

        // create and register content div
        this.contentBody.innerHTML = `<div></div>`
        this.contentDiv = this.contentBody.children[0]

        // remove margin and margin overflow
        this.contentBody.style.margin = "0"
        this.contentDiv.style.padding = "1px"

        this.copyCssStyles()
        this.applyCssScopes()
    }

    /**
     * Applies all CSS styles to the iframe content
     * that are in the main document body
     */
    copyCssStyles()
    {
        let links = this.element.ownerDocument.querySelectorAll(
            'link[rel="stylesheet"]'
        )

        for (let i = 0; i < links.length; i++)
        {
            let copy = this.contentDocument.createElement("link")
            copy.setAttribute("href", links[i].getAttribute("href"))
            copy.setAttribute("type", links[i].getAttribute("type"))
            copy.setAttribute("rel", links[i].getAttribute("rel"))

            this.contentDocument.body.appendChild(copy)
        }


        let styles = this.element.ownerDocument.querySelectorAll("style")

        for (let i = 0; i < styles.length; i++)
        {
            let copy = this.contentDocument.createElement("style")
            copy.innerHTML = styles[i].innerHTML

            this.contentDocument.body.appendChild(copy)
        }
    }

    /**
     * Adds css scopes to the content div element
     */
    applyCssScopes()
    {
        let scopes = this.textPad.options.cssScope

        if (scopes === null)
            return

        if (typeof(scopes) === "string")
            scopes = [scopes]

        for (let i = 0; i < scopes.length; i++)
        {
            cssClass(
                this.contentDiv,
                CSS_SCOPE_CLASS_PREFIX + scopes[i],
                true
            )
        }
    }

    /**
     * Starts the dimension timer
     */
    startDimensionTimer()
    {
        // call the update once right after initialization
        setTimeout(() => {
            this.updateDimensions()
        }, 500)

        // random offset
        setTimeout(() => {

            // interval
            this.dimensionTimerId = setInterval(() => {
                this.updateDimensions()
            }, DIMENSION_TIMER_INTERVAL)

        }, Math.random() * DIMENSION_TIMER_INTERVAL)
    }

    /**
     * Updates iframe height
     */
    updateDimensions()
    {
        this.element.style.height = this.contentDiv.offsetHeight + "px"
    }

    /**
     * Loads quill.js in the iframe
     * (not called by default, you have to call this yourself)
     */
    loadQuill(callback)
    {
        let rootQuillScript = this.element.ownerDocument.querySelector(
            'script[mycelium-quill-script]'
        )

        if (!rootQuillScript)
        {
            console.error("Mycelium quill script not found!")
            return
        }

        quillLink = this.contentDocument.createElement("script")
        
        quillLink.onload = () => {
            // register blots
            require("../../initialization.js").setupQuill(this.contentWindow)

            // redirect undo and redo commands
            let history = this.contentWindow.Quill.import("modules/history")
            history.prototype.undo = () => {
                this.textPad.quill.history.undo()
            }
            history.prototype.redo = () => {
                this.textPad.quill.history.redo()
            }
            
            callback()
        }

        quillLink.src = rootQuillScript.src
        this.contentBody.appendChild(quillLink)
    }

    /**
     * Called, when the blot is being deleted
     */
    destroy()
    {
        // remove timer
        clearInterval(this.dimensionTimerId)
    }
}

IframeBlot.tagName = "iframe"

return IframeBlot

}