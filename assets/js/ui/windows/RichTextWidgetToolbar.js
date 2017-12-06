const Window = require("../Window.js")
const getRefs = require("../../utils/getRefs.js")
const cssClass = require("../../utils/cssClass.js")
const Picker = require("../components/Picker.js")
const Menu = require("../components/Menu.js")
const RichTextWidget = require("../../widgets/RichText.js")
const TableObject = require("../../widgets/RichText/TableBlot/TableObject.js")

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

        this.registerEventListeners()
    }

    registerEventListeners()
    {
        this.refs.bold.addEventListener("click", this.onBoldClick.bind(this))
        this.refs.italic.addEventListener("click", this.onItalicClick.bind(this))

        this.headerPicker.on("user-pick", this.onHeaderPick.bind(this))
        this.headerPicker.on("expand", this.onHeaderPickerExpand.bind(this))
        
        this.refs.table.addEventListener("click", this.onTableClick.bind(this))

        this.tableInsertMenu.on("user-click", this.onTableInsertMenuClick.bind(this))
        this.tableInsertMenu.on("expand", this.onTableInsertMenuExapnd.bind(this))

        this.tableRemoveMenu.on("user-click", this.onTableRemoveMenuClick.bind(this))
        this.tableRemoveMenu.on("expand", this.onTableRemoveMenuExapnd.bind(this))

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

    onHeaderPickerExpand()
    {
        // keep the widget focused
        if (RichTextWidget.lastFocusedWidget)
            RichTextWidget.lastFocusedWidget.quill.focus()
    }

    ////////////
    // Tables //
    ////////////

    onTableClick()
    {
        RichTextWidget.bus.fire("insert-table")
    }

    onTableInsertMenuClick(key)
    {
        switch (key)
        {
            case "row-below":
                RichTextWidget.bus.fire("insert-table-row-below")
                break

            case "row-above":
                RichTextWidget.bus.fire("insert-table-row-above")
                break

            case "column-left":
                RichTextWidget.bus.fire("insert-table-column-left")
                break

            case "column-right":
                RichTextWidget.bus.fire("insert-table-column-right")
                break
        }

        if (TableObject.lastFocusedTable)
            TableObject.lastFocusedTable.focus()
    }

    onTableInsertMenuExapnd()
    {
        // keep table focused
        if (TableObject.lastFocusedTable)
            TableObject.lastFocusedTable.focus()
    }

    onTableRemoveMenuClick(key)
    {
        switch (key)
        {
            case "row":
                RichTextWidget.bus.fire("remove-table-row")
                break

            case "column":
                RichTextWidget.bus.fire("remove-table-column")
                break
        }

        if (TableObject.lastFocusedTable)
            TableObject.lastFocusedTable.focus()
    }

    onTableRemoveMenuExapnd()
    {
        // keep table focused
        if (TableObject.lastFocusedTable)
            TableObject.lastFocusedTable.focus()
    }
}

module.exports = RichTextWidgetToolbar