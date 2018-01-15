const TextPad = require("../TextPad.js")

class RichText
{
    static createInstances(window, document, mycelium, shroom)
    {
        let elements = document.querySelectorAll(
            '[mycelium-widget="rich-text"]'
        )
        let instances = []

        for (let i = 0; i < elements.length; i++)
            instances.push(new RichText(
                window, document, elements[i], mycelium, shroom
            ))

        return instances
    }

    constructor(window, document, element, mycelium, shroom)
    {
        // useful references
        this.mycelium = mycelium
        this.window = window
        this.document = document
        
        /**
         * Root html element
         */
        this.element = element

        /**
         * Reference to the shroom
         */
        this.shroom = shroom

        /**
         * Shroom data key
         */
        this.key = this.element.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("RichText widget missing 'key' attribute.")

        /**
         * Default widget value
         */
        this.defaultValue = this.element.getAttribute("mycelium-default")

        try {
            this.defaultValue = JSON.parse(this.defaultValue)
        } catch (e) {}

        /**
         * Text pad for the actual text editing
         */
        this.pad = new TextPad(this.element, this.window.Quill)

        this.pad.on("text-change", this.onTextChange.bind(this))
    }

    /**
     * When pad content changes
     */
    onTextChange()
    {
        this.shroom.setData(
            this.key,
            this.pad.getContents()
        )
    }
}

module.exports = RichText