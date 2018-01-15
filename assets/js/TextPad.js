const EventBus = require("./EventBus.js")
const defaultOptions = require("./utils/defaultOptions.js")

/**
 * A highly configurable text editor class, wrapping Quill.js
 */
class TextPad
{
    constructor(element, Quill, options)
    {
        /**
         * The HTML element to build the pad on
         */
        this.element = element

        // reference from DOM
        this.element.textPad = this

        // DOM signature
        this.element.setAttribute("mycelium-text-pad", "here")

        /**
         * Pad options
         */
        this.options = defaultOptions(options, {
            
            /**
             * Allowed formats
             */
            formats: null,

            /**
             * Is this pad used in a table cell
             * @type {Boolean}
             */
            isTableCell: false,

            /**
             * If in a table, this is the reference to the table blot
             */
            tableBlot: null,

            /**
             * If in a table, this is the reference to the table cell
             */
            tableCell: null,

            /**
             * Delta describing the initial content if it should
             * not be inferd from the inner HTML
             */
            initialContents: null
        })

        /**
         * Event bus for the instance
         */
        this.bus = new EventBus()
        this.on = this.bus.on.bind(this.bus)

        /**
         * Quill instance reference
         */
        this.quill = new Quill(this.element, {
            formats: this.options.formats,
            modules: {
                clipboard: {
                    matchers: require("./quill/matchers.js")(Quill)
                }
            }
        })

        if (this.options.initialContents)
            this.quill.setContents(this.options.initialContents)

        this.quill.on("text-change", this.onTextChange.bind(this))

        this.quill.on("selection-change", this.onSelectionChange.bind(this))
    }

    ///////////////////
    // Table editing //
    ///////////////////

    /**
     * Inserts a new table at the caret location
     */
    insertTable()
    {
        let range = this.quill.getSelection(true)
        this.quill.insertText(range.index, "\n")
        this.quill.insertEmbed(range.index + 1, "table", {})
        this.quill.setSelection(range.index + 2)
    }

    /**
     * Inserts a table row below the currently selected cell
     */
    insertTableRowBelow()
    {
        if (this.options.isTableCell)
            this.options.tableBlot.insertRowBelow(this.options.tableCell)
    }

    /**
     * Inserts a table row above the currently selected cell
     */
    insertTableRowAbove()
    {
        if (this.options.isTableCell)
            this.options.tableBlot.insertRowAbove(this.options.tableCell)
    }

    /**
     * Inserts a table column left of the currently selected cell
     */
    insertTableColumnLeft()
    {
        if (this.options.isTableCell)
            this.options.tableBlot.insertColumnLeft(this.options.tableCell)
    }

    /**
     * Inserts a table column right of the currently selected cell
     */
    insertTableColumnRight()
    {
        if (this.options.isTableCell)
            this.options.tableBlot.insertColumnRight(this.options.tableCell)
    }

    /**
     * If in a table, this method removes the table row
     */
    removeTableRow()
    {
        if (this.options.isTableCell)
            this.options.tableBlot.removeRowAtCell(this.options.tableCell)
    }

    /**
     * If in a table, this method removes the table column
     */
    removeTableColumn()
    {
        if (this.options.isTableCell)
            this.options.tableBlot.removeColumnAtCell(this.options.tableCell)
    }

    ///////////////////
    // Quill methods //
    ///////////////////

    getContents()
    {
        return this.quill.getContents()
    }

    getSelection()
    {
        return this.quill.getSelection()
    }

    getLength()
    {
        return this.quill.getLength()
    }

    format(format, value)
    {
        this.quill.format(format, value)
    }

    getFormat(index, length)
    {
        return this.quill.getFormat(index, length)
    }

    focus()
    {
        this.quill.focus()
    }

    ///////////////////////////
    // Quill event listeners //
    ///////////////////////////

    /**
     * When quill text changes
     */
    onTextChange()
    {
        this.bus.fire("text-change")
    }

    /**
     * When quill selection changes
     */
    onSelectionChange(selection)
    {
        // ignore deselects
        if (selection === null)
        {
            // except if this pad is being deselected
            if (TextPad.activePad === this)
            {
                /*
                    Active pad is not going to be set to null,
                    it shouldn't be null, really
                 */

                // signal deselect via event
                TextPad.bus.fire("selection-change", null, {})
            }

            return
        }

        // update active pad
        TextPad.setActivePad(this)

        // fire an event
        TextPad.bus.fire("selection-change", selection, TextPad.getFormat())
    }

    ////////////////////
    // Static methods //
    ////////////////////

    /**
     * Change the currently active pad
     */
    static setActivePad(pad)
    {
        if (TextPad.activePad === pad)
            return

        TextPad.activePad = pad
        TextPad.bus.fire("active-pad-change")
    }

    //////////////////////
    // Static mirroring //
    //////////////////////

    /*
        Static methods reflecting isntance methods on the active pad
     */

    // table editing mirrors
    static insertTable() { if (TextPad.activePad) TextPad.activePad.insertTable() }
    static insertTableRowBelow() { if (TextPad.activePad) TextPad.activePad.insertTableRowBelow() }
    static insertTableRowAbove() { if (TextPad.activePad) TextPad.activePad.insertTableRowAbove() }
    static insertTableColumnLeft() { if (TextPad.activePad) TextPad.activePad.insertTableColumnLeft() }
    static insertTableColumnRight() { if (TextPad.activePad) TextPad.activePad.insertTableColumnRight() }
    static removeTableRow() { if (TextPad.activePad) TextPad.activePad.removeTableRow() }
    static removeTableColumn() { if (TextPad.activePad) TextPad.activePad.removeTableColumn() }

    /**
     * Returns selection range for the active pad
     */
    static getSelection()
    {
        if (!TextPad.activePad)
            return null

        return TextPad.activePad.getSelection()
    }

    /**
     * Format currently active pad
     */
    static format(format, value)
    {
        if (TextPad.activePad)
            TextPad.activePad.format(format, value)
    }

    /**
     * Get format of currently active pad
     */
    static getFormat()
    {
        if (!TextPad.activePad)
            return {}

        return TextPad.activePad.getFormat()
    }

    /**
     * Focus the active pad
     */
    static focus()
    {
        if (!TextPad.activePad)
            return

        TextPad.activePad.focus()
    }
}

/**
 * The active pad
 * Usually the last one selected, null is a very unusual state
 * (sth. like active object in Blender - there's almost always some)
 * Used to control the layout of text-styling toolbar
 */
TextPad.activePad = null

/**
 * Shared event bus for all text pads
 *
 * Events:
 * "active-pad-change" (pad) - when the activePad value changes
 * "selection-change" (selection, format) - when the text selection changes
 */
TextPad.bus = new EventBus()
TextPad.on = TextPad.bus.on.bind(TextPad.bus)

module.exports = TextPad