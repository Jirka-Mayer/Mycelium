const EventBus = require("./EventBus.js")
const defaultOptions = require("./utils/defaultOptions.js")
const cssClass = require("./utils/cssClass.js")

const CSS_SCOPE_CLASS_PREFIX = "css-scope__"

/**
 * A highly configurable text editor class, wrapping Quill.js
 */
class TextPad
{
    constructor(element, Quill, mycelium, options)
    {
        /**
         * Mycelium namespace reference
         */
        this.mycelium = mycelium

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
             * The css scope/scopes to apply to the pad
             * @type {string/array of string}
             */
            cssScope: null,

            /**
             * Delta describing the initial content if it should
             * not be inferd from the inner HTML
             */
            initialContents: null,
            
            /**
             * Allowed formats
             */
            formats: null,

            /**
             * Explicit formats for the embeded tables
             */
            tableFormats: null,

            /**
             * Header settings for the pad
             */
            headers: null,

            /**
             * Header settings for the embeded tables
             */
            tableHeaders: null,

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
        })

        this.applyCssScopes()

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
                    matchers: require("./quill/matchers.js")(Quill, this.mycelium),
                    matchVisual: false
                }
            }
        })

        if (this.options.initialContents)
            this.quill.setContents(this.options.initialContents)

        this.quill.on("text-change", this.onTextChange.bind(this))

        this.quill.on("selection-change", this.onSelectionChange.bind(this))
    }

    /**
     * Adds css scopes to the element
     */
    applyCssScopes()
    {
        if (this.options.cssScope === null)
            return

        if (typeof(this.options.cssScope) === "string")
            this.options.cssScope = [this.options.cssScope]

        for (let i = 0; i < this.options.cssScope.length; i++)
        {
            cssClass(
                this.element,
                CSS_SCOPE_CLASS_PREFIX + this.options.cssScope[i],
                true
            )
        }
    }

    /**
     * Returns bounds of the pad on the screen
     */
    getPadBounds()
    {
        let rect = this.element.getBoundingClientRect()

        let bounds = {
            left: rect.left,
            top: rect.top
        }

        // inside a table
        if (this.options.isTableCell)
        {
            let iframe = this.options.tableBlot.element
            let parentPadElement = this.options.tableBlot.textPad.element

            // get iframe position relative to the pad
            // (hope there's no relatively positioned element between iframe and pad)
            let iframeOffset = {
                left: iframe.offsetLeft - parentPadElement.offsetLeft,
                top: iframe.offsetTop - parentPadElement.offsetTop
            }

            // bounds relative to the iframe
            let parentBounds = this.options.tableBlot.textPad.getPadBounds()

            bounds.left += parentBounds.left + iframeOffset.left
            bounds.top += parentBounds.top + iframeOffset.top
        }

        return bounds
    }

    ///////////
    // Image //
    ///////////

    /**
     * Inserts an image into the text
     *
     * imageFile is undefined or the file to be uploaded & used
     */
    insertImage(imageFile)
    {
        // first let the user choose an image and upload it to the server
        this.mycelium.shroom.uploadNewSpore("image", imageFile)
        .then((spore) => {

            // now create the embed referencing the spore
            let range = this.quill.getSelection(true)
            this.quill.insertText(range.index, "\n")
            this.quill.insertEmbed(range.index + 1, "image", {
                "@spore": spore.handle,
                title: "A very cool image indeed."
            })
            this.quill.setSelection(range.index + 2)

        })
    }

    ///////////////////
    // Table editing //
    ///////////////////

    /**
     * Inserts a new table at the caret location
     */
    insertTable()
    {
        // disable inside a table
        if (this.options.isTableCell)
            return

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

    getText(index, length)
    {
        return this.quill.getText(index, length)
    }

    getSelection()
    {
        return this.quill.getSelection()
    }

    getSelectionBounds(index, length)
    {
        return this.quill.getBounds(index, length)
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
        TextPad.bus.fire("active-pad-change", pad)
    }

    //////////////////////
    // Static mirroring //
    //////////////////////

    /*
        Static methods reflecting isntance methods on the active pad
     */
    
    static insertImage(img) { if (TextPad.activePad) TextPad.activePad.insertImage(img) }

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