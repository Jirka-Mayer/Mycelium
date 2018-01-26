const TextPad = require("../../../TextPad.js")

class TableCell
{
    constructor(tableBlot, deltaContents)
    {
        /**
         * Table object reference
         */
        this.tableBlot = tableBlot

        /**
         * Cell html element
         */
        this.element = this.tableBlot.contentDocument.createElement("td")

        /**
         * Cell text pad instance
         */
        this.textPad = new TextPad(
            this.element,
            this.tableBlot.contentWindow.Quill,
            this.tableBlot.textPad.mycelium,
            {
                cssScope: null, // scopes are is set in the blot
                initialContents: deltaContents,

                formats: this.getFormatsForCell(),
                tableFormats: [],
                headers: this.getHeadersForCell(),
                tableHeaders: null,

                isTableCell: true,
                tableBlot: this.tableBlot,
                tableCell: this,
            }
        )

        // bind events
        this.textPad.on("text-change", this.onPadTextChange.bind(this))
    }

    /**
     * Prepare formats for the cell
     */
    getFormatsForCell()
    {
        // get parent formats
        let formats = this.tableBlot.textPad.options.formats.slice()

        // explicit format overriding
        if (this.tableBlot.textPad.options.tableFormats)
            return this.tableBlot.textPad.options.tableFormats

        // remove formats not listed in config
        for (let i = 0; i < formats.length; i++)
        {
            if (this.tableBlot.textPad.mycelium.config["rich-text"]["table-formats"]
                .indexOf(formats[i]) === -1)
            {
                formats.splice(i, 1)
                i--
            }
        }

        return formats
    }

    /**
     * Prepare header settings for the cell
     */
    getHeadersForCell()
    {
        // if some overriding takes place
        if (this.tableBlot.textPad.options.tableHeaders)
            return this.tableBlot.textPad.options.tableHeaders

        // otherwise just use the parent settings
        return this.tableBlot.textPad.options.headers
    }

    /**
     * Called when the pad content changes
     */
    onPadTextChange()
    {
        // update iframe dimensions
        this.tableBlot.updateDimensions()

        // a change has happened
        this.tableBlot.triggerShroomUpdate()
    }

    /**
     * Returns an object specifying cell position
     */
    getPosition()
    {
        return {
            column: Array.prototype.indexOf.call(
                this.element.parentElement.children,
                this.element
            ),
            row: Array.prototype.indexOf.call(
                this.element.parentElement.parentElement.children,
                this.element.parentElement
            )
        }
    }

    /**
     * Focus this cell
     */
    focus()
    {
        this.textPad.focus()
    }

    /**
     * Remove the cell from table
     */
    remove()
    {
        // if pad active, remove
        if (TextPad.activePad === this.textPad)
            TextPad.setActivePad(null)

        // remove from dom
        this.element.remove()
    }
}

module.exports = TableCell