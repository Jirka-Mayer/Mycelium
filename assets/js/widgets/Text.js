const PlainPad = require("../PlainPad.js")

class Text
{
    static createInstances(window, document, shroom)
    {
        let elements = document.querySelectorAll(
            '[mycelium-widget="text"]'
        )
        let instances = []

        for (let i = 0; i < elements.length; i++)
            instances.push(new Text(
                window, document, elements[i], shroom
            ))

        return instances
    }

    constructor(window, document, element, shroom)
    {
        // references
        this.window = window
        this.document = document
        this.shroom = shroom

        /**
         * HTML element
         */
        this.element = element

        /**
         * Data key
         */
        this.key = this.element.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("Text widget missing 'key' attribute.")

        // default/initial value is taken from the initial content
        // by the plain pad component

        /**
         * Plain pad that handles the actual text editing
         */
        this.pad = new PlainPad(this.element, this.window, this.document)

        // register events
        this.pad.on("text-change", this.onTextChange.bind(this))
    }

    /**
     * When plain pad content changes
     */
    onTextChange()
    {
        let text = this.pad.getText()

        let data = {
            "@type": "mycelium::rich-text",
            "ops": [
                {"insert": text + "\n"}
            ]
        }

        this.shroom.setData(this.key, data)
    }
}

module.exports = Text