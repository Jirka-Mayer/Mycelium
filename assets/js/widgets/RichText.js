const Quill = require("./RichText/quill.js")
require("./RichText/BoldBlot.js")
require("./RichText/ItalicBlot.js")
require("./RichText/HeaderBlot.js")
require("./RichText/LinkBlot.js")
require("./RichText/TableBlot.js")
const EventBus = require("../EventBus.js")

// quill events are registered a little bit later,
// because loading may trigger "text-change" which
// triggers autosave, but that is wrong behaviour
const QUILL_EVENT_REGISTRATION_DELAY = 1000

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

        // bind the widget to the element (used in IframeObject)
        this.element.widgetInstance = this

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

        try
        {
            this.defaultValue = JSON.parse(this.defaultValue)
        }
        catch (e) {}

        this.createQuillInstance()

        this.registerEvents()
    }

    /**
     * Create and initialize quill instance
     */
    createQuillInstance()
    {
        this.quill = new Quill(this.element)

        this.loadQuillContents()

        setTimeout(() => {

            this.quill.on("text-change",
                this.onTextChange.bind(this)
            )

            this.quill.on("selection-change",
                this.onSelectionChange.bind(this)
            )

        }, QUILL_EVENT_REGISTRATION_DELAY)
    }

    /**
     * Load contents from shroom data
     */
    loadQuillContents()
    {
        let data = this.shroom.getData(
            this.key,
            this.defaultValue
        )

        try
        {
            // data as delta
            if ((data instanceof Object) && (data.ops instanceof Array))
            {
                this.quill.setContents(data, "silent")
            }

            // data as string
            else if (typeof(data) === "string")
            {
                this.quill.setText(data, "silent")
            }

            // when something strange happens, put the data as JSON
            // into the editor body
            else
            {
                this.quill.setText(JSON.stringify(data, null, 2), "silent")
            }
        }

        // silence any crashes
        catch (e)
        {
            console.error(e)

            this.quill.setText("", "silent")
        }

    }

    /**
     * When quill content changes
     */
    onTextChange()
    {
        this.shroom.setData(
            this.key,
            this.quill.getContents()
        )
    }

    /**
     * When quill selection changes
     */
    onSelectionChange(selection)
    {
        // last active widget
        if (selection === null)
            RichText.lastFocusedWidget = this

        // active widget
        if (selection)
        {
            RichText.activeWidget = this
            RichText.lastFocusedWidget = this
            RichText.bus.fire(
                "selection-change", selection, this.quill.getFormat()
            )
            RichText.bus.fire("active-widget-change", this)
        }
        else if (selection === null && RichText.activeWidget === this)
        {
            RichText.activeWidget = null
            RichText.bus.fire("selection-change", null, {})
            RichText.bus.fire("active-widget-change", null)
        }
    }

    registerEvents()
    {
        this.bindListener("apply-bold", this.onApplyBold)
        this.bindListener("apply-italic", this.onApplyItalic)
        this.bindListener("apply-header", this.onApplyHeader)
        this.bindListener("apply-link", this.onApplyLink)
        this.bindListener("insert-table", this.onInsertTable)
    }

    /**
     * Bind a rich-text bus listener
     */
    bindListener(event, listener)
    {
        RichText.bus.on(event, function (a) {
            if (!this.quill.getSelection())
                return

            listener.apply(this, arguments)

            // selection properties have changed
            RichText.bus.fire(
                "selection-change",
                this.quill.getSelection(),
                this.quill.getFormat()
            )
        }.bind(this))
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    onApplyBold()
    {
        this.quill.format(
            "bold",
            !this.quill.getFormat().bold
        )
    }

    onApplyItalic()
    {
        this.quill.format(
            "italic",
            !this.quill.getFormat().italic
        )
    }

    onApplyHeader(level)
    {
        if (level == this.quill.getFormat().header)
            level = false

        this.quill.format(
            "header",
            level
        )
    }

    onApplyLink(href)
    {
        console.log(href)

        this.quill.format(
            "link",
            href
        )
    }

    onInsertTable()
    {
        let range = this.quill.getSelection(true)
        this.quill.insertText(range.index, "\n")
        this.quill.insertEmbed(range.index + 1, "table", "{}")
        this.quill.setSelection(range.index + 2)
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

/**
 * Returns selection of the active widget
 * null if no active widget
 */
RichText.getSelection = function()
{
    if (RichText.activeWidget)
        return RichText.activeWidget.quill.getSelection()

    return null
}

/**
 * Returns focus to the last focused widget
 */
RichText.refocus = function()
{
    if (RichText.lastFocusedWidget)
        RichText.lastFocusedWidget.quill.focus()
}

/**
 * Returns format of selected text, {} if no selection
 */
RichText.getFormat = function(index, length)
{
    if (RichText.activeWidget)
        return RichText.activeWidget.quill.getFormat(index, length)

    return {}
}

// export
module.exports = RichText