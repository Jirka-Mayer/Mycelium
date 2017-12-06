const Window = require("../Window.js")
const getRefs = require("../../utils/getRefs.js")
const cssClass = require("../../utils/cssClass.js")
const Picker = require("../components/Picker.js")
const RichTextWidget = require("../../widgets/RichText.js")

class RichTextWidgetToolbar extends Window
{
    constructor(window, document, options)
    {
        super(window, document, options)

        this.content.innerHTML = require("./RichTextWidgetToolbar.html")

        this.refs = getRefs(this.content)

        this.headerPicker = new Picker(document, this.refs.header, [
            { key: "p", label: "Normal" },
            { key: "h1", label: "Heading 1" },
            { key: "h2", label: "Heading 2" }
        ])

        this.registerEventListeners()
    }

    registerEventListeners()
    {
        this.refs.bold.addEventListener("click", this.onBoldClick.bind(this))
        this.refs.italic.addEventListener("click", this.onItalicClick.bind(this))
        this.headerPicker.on("user-pick", this.onHeaderPick.bind(this))
        
        this.refs.table.addEventListener("click", this.onTableClick.bind(this))
        this.refs.newRowAfter.addEventListener("click", this.onNewRowAfterClick.bind(this))

        RichTextWidget.bus.on("selection-change", this.onSelectionChange.bind(this))
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    /**
     * When rich-text widget selection changes (any of them)
     */
    onSelectionChange(selection, format)
    {
        // dont' do anything on deselect
        if (selection === null)
            return

        // bold
        cssClass(this.refs.bold, "mc-rtwt__button--active", !!format.bold)

        // italic
        cssClass(this.refs.italic, "mc-rtwt__button--active", !!format.italic)

        // header
        if (format.header === undefined)
            this.headerPicker.pick("p")
        else
            this.headerPicker.pick("h" + format.header)
    }

    onBoldClick()
    {
        RichTextWidget.bus.fire("apply-bold")
    }

    onItalicClick()
    {
        RichTextWidget.bus.fire("apply-italic")
    }

    onHeaderPick(key)
    {
        if (key == "p")
            key = false
        else
            key = parseInt(key[1])

        // refocus the widget
        // (focus has been lost by clicking the picker label)
        if (RichTextWidget.lastFocusedWidget)
            RichTextWidget.lastFocusedWidget.quill.focus()

        RichTextWidget.bus.fire("apply-header", key)
    }

    onTableClick()
    {
        RichTextWidget.bus.fire("insert-table")
    }

    onNewRowAfterClick()
    {
        RichTextWidget.bus.fire("insert-table-row-after")
    }
}

module.exports = RichTextWidgetToolbar