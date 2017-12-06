class TableCell
{
    constructor(tableObject)
    {
        /**
         * Table object reference
         */
        this.tableObject = tableObject

        this.createElement()
    }

    /**
     * Creates the html element
     */
    createElement()
    {
        this.element = this.tableObject.contentDocument.createElement("td")

        this.quill = new this.tableObject.contentWindow.Quill(this.element)
        
        this.quill.setText("lorem")

        this.selectionChangeListener = this.onQuillSelectionChange.bind(this)
        this.quill.on("selection-change", this.selectionChangeListener)
    }

    /**
     * Called when quill selection changes
     */
    onQuillSelectionChange(selection)
    {
        if (selection === null)
        {
            if (this.tableObject.selectedCell === this)
            {
                this.tableObject.selectedCell = null

                this.tableObject.cellDeselected()
            }
        }
        else
        {
            this.tableObject.selectedCell = this
            this.tableObject.cellSelected()
        }
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
     * Remove the cell from table
     */
    remove()
    {
        this.element.remove()

        // remove event listeners
        this.quill.off("selection-change", this.selectionChangeListener)
    }
}

module.exports = TableCell