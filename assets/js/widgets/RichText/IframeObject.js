/*
    Basically a way to glue object instances on top
    of static blot methods and provide some
    general API via method inheritance
 */

/**
 * A base class for block embedded ifram objects
 */
class IframeObject
{
    constructor(node, value, widgetElement)
    {
        /**
         * The blot element (the iframe itself)
         */
        this.node = node

        /**
         * Initial embed value
         */
        this.initialValue = value

        /**
         * The parent widget element
         */
        this.widgetElement = widgetElement

        /**
         * The parent widget instance (rich text widget)
         */
        this.richText = widgetElement.widgetInstance

        /**
         * Document of the iframe content
         */
        this.contentDocument = node.contentDocument

        /**
         * Window of the iframe content
         */
        this.contentWindow = node.contentWindow

        /**
         * Body of the content document
         */
        this.contentBody = this.contentDocument.body

        /**
         * Content div of the iframe
         */
        this.contentDiv = this.node.contentDiv

        this.initialize()

        this.bindEventListeners()
    }

    /**
     * Handles initialization
     *
     * Efectively replaces constructor
     */
    initialize()
    {
        // override this
    }

    /**
     * Return delta blot value
     */
    getValue()
    {
        // override this
        return {}
    }

    /**
     * This is called when element removal is noticed
     * (from IframeBlot)
     */
    destructor()
    {
        this.freeEventListeners()
    }

    /**
     * Updates iframe height
     */
    updateDimensions()
    {
        this.node.style.height = this.contentDiv.offsetHeight + "px"
    }

    /**
     * Loads quill.js in the iframe
     */
    loadQuill()
    {
        let rootQuillScript = document.querySelector(
            'script[mycelium-quill-script]'
        )

        if (!rootQuillScript)
        {
            console.error("Mycelium quill script not found!")
            return
        }

        quillLink = this.contentDocument.createElement("script")
        
        quillLink.onload = () => {
            this.onQuillLoaded()
        }

        quillLink.src = rootQuillScript.src

        this.contentBody.appendChild(quillLink)
    }

    /**
     * Called when quill is loaded in the iframe
     */
    onQuillLoaded()
    {
        // override me
    }

    ////////////
    // Events //
    ////////////

    bindEventListeners()
    {
        // override this
    }

    freeEventListeners()
    {
        // override this
        // (make sure not to forget)
    }
}

module.exports = IframeObject