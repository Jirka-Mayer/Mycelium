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
        // useful references
        this.$mycelium = mycelium
        this.$window = window
        this.$document = document
        
        /**
         * Root html element
         */
        this.$element = element

        /**
         * Reference to the shroom
         */
        this.shroom = shroom

        /**
         * Shroom data key
         */
        this.key = this.$element.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("RichText widget missing 'key' attribute.")

        /**
         * Default widget value
         */
        this.defaultValue = this.$element.getAttribute("mycelium-default")

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
        this.$quill = new Quill(this.$element)

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

    /**
     * When quill selection changes
     */
    $onSelectionChange(selection)
    {
        // last active widget
        if (selection === null)
            RichText.lastFocusedWidget = this

        // active widget
        if (selection)
        {
            RichText.activeWidget = this
            RichText.bus.fire(
                "selection-change", selection, this.$quill.getFormat()
            )
        }
        else if (selection === null && RichText.activeWidget === this)
        {
            RichText.activeWidget = null
            RichText.bus.fire("selection-change", null, {})
        }
    }

    $registerEvents()
    {
        this.$bindListener("apply-bold", this.$onApplyBold)
        this.$bindListener("apply-italic", this.$onApplyItalic)
        this.$bindListener("apply-header", this.$onApplyHeader)
    }

    /**
     * Bind a rich-text bus listener
     */
    $bindListener(event, listener)
    {
        RichText.bus.on(event, function (a) {
            if (!this.$quill.getSelection())
                return

            listener.apply(this, arguments)

            // selection properties have changed
            RichText.bus.fire(
                "selection-change",
                this.$quill.getSelection(),
                this.$quill.getFormat()
            )
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

    $onApplyItalic()
    {
        this.$quill.format(
            "italic",
            !this.$quill.getFormat().italic
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

/**
 * Event bus for communication between widgets and the toolbar
 */
RichText.bus = new EventBus()

/**
 * Stores the currently active widget
 */
RichText.activeWidget = null

/**
 * The widget that has been the last one to be blurred (/focused)
 *
 * For regaining focus after UI interactions
 */
RichText.lastFocusedWidget = null

// export
module.exports = RichText