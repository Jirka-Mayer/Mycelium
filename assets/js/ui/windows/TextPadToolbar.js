const Window = require("../Window.js")
const getRefs = require("../../utils/getRefs.js")
const cssClass = require("../../utils/cssClass.js")
const Picker = require("../components/Picker.js")
const Menu = require("../components/Menu.js")
const TextPad = require("../../TextPad.js")

class TextPadToolbar extends Window
{
    constructor(window, document, mycelium, linkBlotProperties)
    {
        super(window, document, mycelium)

        /**
         * Reference to the linkBlotProperties window
         */
        this.linkBlotProperties = linkBlotProperties

        this.buildDOM()

        this.registerEventListeners()
    }

    buildDOM()
    {
        this.content.innerHTML = require("./TextPadToolbar.html")
        this.refs = getRefs(this.content)

        this.headerPicker = new Picker(document, this.refs.header, [
            { key: "p", label: "Normal" }
        ])

        this.tableInsertMenu = new Menu(
            document,
            this.refs.tableInsert,
            "Insert",
            [
                { key: "row-below", label: "Row below" },
                { key: "row-above", label: "Row above" },
                { key: "column-left", label: "Column left" },
                { key: "column-right", label: "Column right" }
            ]
        )

        this.tableRemoveMenu = new Menu(
            document,
            this.refs.tableRemove,
            "Remove",
            [
                { key: "row", label: "Row" },
                { key: "column", label: "Column" }
            ]
        )
    }

    registerEventListeners()
    {
        this.refs.bold.addEventListener("click", this.onBoldClick.bind(this))
        this.refs.italic.addEventListener("click", this.onItalicClick.bind(this))

        this.headerPicker.on("user-pick", this.onHeaderPick.bind(this))
        this.headerPicker.on("expand", this.onHeaderPickerExpand.bind(this))

        this.refs.link.addEventListener("click", this.onLinkClick.bind(this))
        this.refs.image.addEventListener("click", this.onImageClick.bind(this))
        
        this.refs.table.addEventListener("click", this.onTableClick.bind(this))

        this.tableInsertMenu.on("user-click", this.onTableInsertMenuClick.bind(this))
        this.tableInsertMenu.on("expand", this.onTableInsertMenuExapnd.bind(this))

        this.tableRemoveMenu.on("user-click", this.onTableRemoveMenuClick.bind(this))
        this.tableRemoveMenu.on("expand", this.onTableRemoveMenuExapnd.bind(this))


        // we listen for widget selection changes to determine
        // changes in the styling UI like bold, header etc.
        TextPad.on("active-pad-change", this.onActiveTextPadChange.bind(this))
        TextPad.on("selection-change", this.onTextPadSelectionChange.bind(this))

        // a flag
        this.selectionListenerEnabled = true
    }

    /////////////////
    // UI altering //
    /////////////////

    onActiveTextPadChange(pad)
    {
        if (pad === null)
            return

        // update header selection
        let options = [{ key: "p", label: "Normal" }]
        let count = 0
        if (pad.options.headers)
            count = pad.options.headers.count
        if (pad.options.formats && pad.options.formats.indexOf("header") === -1)
            count = 0
        for (let i = 1; i <= count; i++)
            options.push({ key: "h" + i, label: "Heading " + i })
        this.headerPicker.updateOptions(options)
    }

    /**
     * When rich-text widget selection changes (any of them)
     */
    onTextPadSelectionChange(selection, format)
    {
        if (!this.selectionListenerEnabled)
            return

        // dont' do anything on deselect
        if (selection === null)
            return

        // bold
        cssClass(this.refs.bold, "mc-rtwt__button--active", !!format.bold)

        // italic
        cssClass(this.refs.italic, "mc-rtwt__button--active", !!format.italic)

        // header
        if (format.header === false || format.header === undefined)
        {
            this.headerPicker.pick("p")
        }
        else
        {
            let level = format.header

            // undo level offset
            if (TextPad.activePad.options.headers)
                level -= TextPad.activePad.options.headers.offset

            this.headerPicker.pick("h" + level)
        }
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    onBoldClick()
    {
        TextPad.format(
            "bold",
            !TextPad.getFormat().bold
        )
    }

    onItalicClick()
    {
        TextPad.format(
            "italic",
            !TextPad.getFormat().italic
        )
    }

    onHeaderPick(key)
    {
        this.selectionListenerEnabled = false

        let level

        if (key == "p")
            level = false
        else
            level = parseInt(key[1])

        // offset level
        if (level !== false && TextPad.activePad.options.headers)
            level += TextPad.activePad.options.headers.offset

        TextPad.format("header", level)

        this.selectionListenerEnabled = true
    }

    onHeaderPickerExpand()
    {
        // keep the pad focused
        TextPad.focus()
    }

    onLinkClick()
    {
        this.linkBlotProperties.createLink()
    }

    onImageClick()
    {
        TextPad.insertImage()
    }

    ////////////
    // Tables //
    ////////////

    onTableClick()
    {
        TextPad.insertTable()
    }

    onTableInsertMenuClick(key)
    {
        switch (key)
        {
            case "row-below":    TextPad.insertTableRowBelow();    break
            case "row-above":    TextPad.insertTableRowAbove();    break
            case "column-left":  TextPad.insertTableColumnLeft();  break
            case "column-right": TextPad.insertTableColumnRight(); break
        }

        TextPad.focus()
    }

    onTableInsertMenuExapnd()
    {
        // keep the pad focused
        TextPad.focus()
    }

    onTableRemoveMenuClick(key)
    {
        switch (key)
        {
            case "row":    TextPad.removeTableRow();    break
            case "column": TextPad.removeTableColumn(); break
        }

        TextPad.focus()
    }

    onTableRemoveMenuExapnd()
    {
        // keep the pad focused
        TextPad.focus()
    }
}

module.exports = TextPadToolbar