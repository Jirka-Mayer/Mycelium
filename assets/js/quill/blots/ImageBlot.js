module.exports = function(Quill) {

const getRefs = require("../../utils/getRefs.js")
const IframeBlot = require("./IframeBlot.js")(Quill)
const ClipCache = require("../IframeClipCache.js")
const PlainPad = require("../../PlainPad.js")

class ImageBlot extends IframeBlot
{
    constructor(element, value)
    {
        super(element, value)

        /**
         * Data object in shroom
         */
        this.data = value

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

        /**
         * Plain pad for title editing
         */
        this.pad = new PlainPad(
            this.titleElement,
            this.contentWindow,
            this.contentDocument
        )

        this.pad.on("text-change", () => {
            this.data.title = this.pad.getText()
            this.triggerShroomUpdate()
        })

        this.updateDimensions()

        this.initialized = true
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

        // title element reference
        this.titleElement = refs.title

        // if spore
        if (this.data["@spore"])
        {
            let spore = this.textPad.mycelium.shroom.spores[this.data["@spore"]]

            if (spore)
                refs.img.src = spore.url
        }
        // else if url
        else if (this.data.url)
        {
            refs.img.src = this.data.url
        }

        refs.title.innerText = this.data.title
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
            out = { image: this.data }
        }

        // otherwise get the value
        else
        {
            let value = this.data

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