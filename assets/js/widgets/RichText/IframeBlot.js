const Quill = require("./quill.js")
const BlockEmbed = Quill.import("blots/block/embed")

DIMENSION_TIMER_INTERVAL = 5000
CSS_SCOPE_CLASS_PREFIX = "css-scope__"

class IframeBlot extends BlockEmbed
{
    static create(value, createIframeHandler)
    {
        // create an element
        let node = super.create()

        // set iframe attributes
        node.setAttribute("scrolling", "no")
        node.setAttribute("frameborder", "0")
        
        // we need a tick such that the contentDocument is available  
        setTimeout(() => {

            // check compatibility
            if (!node.contentDocument || !node.contentWindow)
            {
                console.error("iframe javascript interface not supported")
                return
            }

            // create content
            IframeBlot.createContentDocument(node, value, createIframeHandler)

        }, 1)

        return node
    }

    /**
     * Create content document
     */
    static createContentDocument(node, value, createIframeHandler)
    {
        // create and register content div
        node.contentDocument.body.innerHTML = "<div></div>"
        node.contentDiv = node.contentDocument.body.children[0]

        // remove margin and margin overflow
        node.contentDocument.body.style.margin = "0"
        node.contentDiv.style.padding = "1px"

        // set css scopes
        IframeBlot.setCssScopes(node)
        
        // apply styles
        IframeBlot.copyCssStyles(node)

        // let inherited blots initialize themselves
        if (createIframeHandler)
            createIframeHandler(node, value)

        // start dimension update loop
        IframeBlot.startDimensionTimer(node)
    }

    static setCssScopes(node)
    {
        // find parent widet
        let el = node
        let widget = null

        while (el.parentElement)
        {
            if (el.getAttribute("mycelium-widget") == "rich-text")
            {
                widget = el
                break
            }

            el = el.parentElement
        }

        if (!widget)
        {
            console.error("Unable to find parent widget!")
            return
        }

        // get css scope
        let scope = widget.getAttribute("mycelium-css-scope")

        // set scope class
        node.contentDiv.className = CSS_SCOPE_CLASS_PREFIX + scope
    }

    /**
     * Applies all CSS styles to the iframe content
     * that are in the main document body
     */
    static copyCssStyles(node)
    {
        let links = node.ownerDocument.querySelectorAll(
            'link[rel="stylesheet"]'
        )

        for (let i = 0; i < links.length; i++)
        {
            let copy = node.contentDocument.createElement("link")
            copy.setAttribute("href", links[i].getAttribute("href"))
            copy.setAttribute("type", links[i].getAttribute("type"))
            copy.setAttribute("rel", links[i].getAttribute("rel"))

            node.contentDocument.body.appendChild(copy)
        }
    }

    /**
     * Starts the dimension timer
     */
    static startDimensionTimer(node)
    {
        // call the update once right after initialization
        setTimeout(() => {
            IframeBlot.dimensionTimerTick(node)
        }, 500)

        // random offset
        setTimeout(() => {

            // interval
            node.dimensionTimerId = setInterval(() => {
                IframeBlot.dimensionTimerTick(node)
            }, DIMENSION_TIMER_INTERVAL)

        }, Math.random() * DIMENSION_TIMER_INTERVAL)
    }

    /**
     * Tick of the dimension check timer
     */
    static dimensionTimerTick(node)
    {
        // check node removal
        if (!node.parentElement)
        {
            clearInterval(node.dimensionTimerId)
            return
        }

        IframeBlot.updateDimensions(node)
    }

    /**
     * Updates iframe height
     */
    static updateDimensions(node)
    {
        node.style.height = node.contentDiv.offsetHeight + "px"
    }
}

IframeBlot.tagName = "iframe"

module.exports = IframeBlot