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
         * CSS scope(s)
         */
        this.cssScope = this.element.getAttribute("mycelium-css-scope")

        try {
            this.cssScope = JSON.parse(this.cssScope)
        } catch (e) {}

        /**
         * Allowed formats
         */
        this.formats = this.element.getAttribute("mycelium-formats")

        try {
            this.formats = JSON.parse(this.formats)
        } catch (e) {}

        /**
         * Allowed table formats
         */
        this.tableFormats = this.element.getAttribute("mycelium-table-formats")

        try {
            if (this.tableFormats)
                this.tableFormats = JSON.parse(this.tableFormats)
        } catch (e) {}

        /**
         * Header settings
         */
        this.headers = this.element.getAttribute("mycelium-headers")

        try {
            this.headers = JSON.parse(this.headers)
        } catch (e) {}

        /**
         * Table header settings
         */
        this.tableHeaders = this.element.getAttribute("mycelium-table-headers")

        try {
            if (this.tableHeaders)
                this.tableHeaders = JSON.parse(this.tableHeaders)
        } catch (e) {}

        /**
         * Text pad for the actual text editing
         */
        this.pad = new TextPad(this.element, this.window.Quill, this.mycelium, {
            cssScope: this.cssScope,
            initialContents: this.shroom.getData(this.key),

            formats: this.formats,
            tableFormats: this.tableFormats,
            headers: this.headers,
            tableHeaders: this.tableHeaders,
        })

        this.pad.on("text-change", this.onTextChange.bind(this))
    }

    /**
     * When pad content changes
     */
    onTextChange()
    {
        let data = this.pad.getContents()

        // add type
        data["@type"] = "mycelium::rich-text"

        this.shroom.setData(this.key, data)
    }
}

module.exports = RichText