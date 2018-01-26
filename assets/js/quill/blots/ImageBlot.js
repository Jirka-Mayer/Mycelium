module.exports = function(Quill) {

const getRefs = require("../../utils/getRefs.js")
const IframeBlot = require("./IframeBlot.js")(Quill)
const ClipCache = require("../IframeClipCache.js")

class ImageBlot extends IframeBlot
{
    constructor(element, value)
    {
        super(element, value)

        /**
         * Initial blot value
         */
        this.initialValue = value

        /**
         * Flag
         */
        this.initialized = false
    }

    initialize()
    {
        super.initialize()

        // set iframe body class
        this.contentBody.className = "mc-ql-image-blot__content"

        this.createDOM()

        this.loadQuill(() => {

            this.updateDimensions()

            this.initialized = true
        })
    }

    createDOM()
    {
        this.contentDiv.innerHTML = `
            <figure>
                <img ref="img">
                <figcaption ref="title"></figcaption>
            </figure>
        `

        // get image reference
        let refs = getRefs(this.contentDiv)

        refs.img.src = this.initialValue.url
        refs.title.innerText = this.initialValue.title
    }

    /**
     * Trigger shroom data update
     */
    triggerShroomUpdate()
    {
        // tell pad that a change occured
        // (trigger text-change event)
        this.textPad.quill.insertText(0, "")
    }

    /**
     * Returns quill delta value
     */
    value()
    {
        // returned value
        let out

        // if not initialized yet, return the initial value
        if (!this.initialized)
        {
            out = { image: this.initialValue }
        }

        // otherwise get the value
        else
        {
            let value = this.initialValue

            out = {
                image: value
            }
        }

        // save value to clip-cache
        ClipCache.setValue(this.clipCacheId, out)

        return out
    }
}

ImageBlot.blotName = "image"
ImageBlot.className = "mc-ql-image-blot"

Quill.register(ImageBlot)

}