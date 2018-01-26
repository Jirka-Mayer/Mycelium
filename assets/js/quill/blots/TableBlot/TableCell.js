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
                isTableCell: true,
                tableBlot: this.tableBlot,
                tableCell: this,
                initialContents: deltaContents,

                // formats are filtered automatically from inside the pad
                formats: this.tableBlot.textPad.options.formats,
                
                cssScope: this.tableBlot.textPad.options.cssScope,
            }
        )

        // bind events
        this.textPad.on("text-change", this.onPadTextChange.bind(this))
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