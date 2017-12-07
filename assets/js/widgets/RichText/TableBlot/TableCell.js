class TableCell
{
    constructor(tableObject, content)
    {
        /**
         * Table object reference
         */
        this.tableObject = tableObject

        /**
         * Indicates if the cell has been removed from the table
         */
        this.removed = false

        this.createElement()

        this.loadContent(content)
    }

    /**
     * Creates the html element
     */
    createElement()
    {
        this.element = this.tableObject.contentDocument.createElement("td")

        this.quill = new this.tableObject.contentWindow.Quill(this.element)
        
        // bind listener for selection change
        this.selectionChangeListener = this.onQuillSelectionChange.bind(this)
        this.quill.on("selection-change", this.selectionChangeListener)

        // bind listener for text change
        this.textChangeListener = this.onQuillTextChange.bind(this)
        this.quill.on("text-change", this.textChangeListener)
    }

    /**
     * Load cell content
     */
    loadContent(content)
    {
        if (content === undefined || content === null)
            return

        // string argument
        if (typeof(content) === "string")
        {
            this.quill.setText(content, "silent")
            return
        }

        // delta argument
        if ((content instanceof Object) && (content.ops instanceof Array))
        {
            this.quill.setContents(content, "silent")
            return
        }

        // when something strange happens, put the data as JSON
        // into the editor body
        this.quill.setText(JSON.stringify(content, null, 2), "silent")
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
                this.tableObject.lastSelectedCell = this

                this.tableObject.cellDeselected()
            }
        }
        else
        {
            this.tableObject.selectedCell = this
            this.tableObject.lastSelectedCell = this
            this.tableObject.cellSelected()
        }
    }

    /**
     * Called when the quill text changes
     */
    onQuillTextChange()
    {
        // update iframe dimensions
        this.tableObject.updateDimensions()

        // change has happened
        this.tableObject.triggerShroomUpdate()
    }

    /**
     * Focus this cell
     */
    focus()
    {
        this.quill.focus()
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

        this.removed = true

        // remove event listeners
        this.quill.off("selection-change", this.selectionChangeListener)
    }
}

module.exports = TableCell