const Quill = require("./RichText/quill.js")
require("./RichText/BoldBlot.js")
require("./RichText/ItalicBlot.js")
require("./RichText/HeaderBlot.js")
const EventBus = require("../EventBus.js")

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
        this.$mycelium = mycelium
        this.$window = window
        this.$document = document
        
        this.$el = element

        this.shroom = shroom
        this.key = this.$el.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("RichText widget missing 'key' attribute.")

        this.defaultValue = this.$el.getAttribute("mycelium-default")

        try
        {
            this.defaultValue = JSON.parse(this.defaultValue)
        }
        catch (e) {}

        this.$createQuillInstance()

        this.$registerEvents()
    }

    $createQuillInstance()
    {
        this.$quill = new Quill(this.$el)

        this.$loadQuillContents()

        this.$quill.on("text-change",
            this.$onTextChange.bind(this)
        )

        this.$quill.on("selection-change",
            this.$onSelectionChange.bind(this)
        )
    }

    $loadQuillContents()
    {
        let data = this.shroom.getData(
            this.key,
            this.defaultValue
        )

        try
        {
            if (typeof(data) === "object")
                this.$quill.setContents(data)
            else if (typeof(data) === "string")
                this.$quill.setText(data)
            else
                this.$quill.setText(JSON.stringify(data, null, 2))
        }
        catch (e)
        {
            console.error(e)

            this.$quill.setText("")
        }
    }

    $onTextChange(delta, oldContents, source)
    {
        this.shroom.setData(
            this.key,
            this.$quill.getContents()
        )
    }

    $onSelectionChange(selection)
    {
        // active widget
        if (selection)
            RichText.activeWidget = this
        else if (RichText.activeWidget === this)
            RichText.activeWidget = null
    }

    $registerEvents()
    {
        this.$bindListener("apply-bold", this.$onApplyBold)
        this.$bindListener("apply-header", this.$onApplyHeader)
    }

    $bindListener(event, listener)
    {
        RichText.bus.on(event, function (a) {
            if (!this.$quill.getSelection())
                return

            listener.apply(this, arguments)
        }.bind(this))
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    $onApplyBold()
    {
        this.$quill.format(
            "bold",
            !this.$quill.getFormat().bold
        )
    }

    $onApplyHeader(level)
    {
        if (level == this.$quill.getFormat().header)
            level = false

        this.$quill.format(
            "header",
            level
        )
    }
}

RichText.bus = new EventBus()

RichText.activeWidget = null

module.exports = RichText