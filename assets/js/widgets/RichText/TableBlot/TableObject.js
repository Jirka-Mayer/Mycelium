const IframeObject = require("../IframeObject.js")
const getRefs = require("../../../utils/getRefs.js")
const TableRow = require("./TableRow.js")

class TableObject extends IframeObject
{
    initialize()
    {
        // set iframe body class
        this.contentBody.className = "mc-ql-table-blot__content"

        /**
         * Table element
         * (assigned in createDOM method)
         */
        this.tableElement = null

        /**
         * Rows of the table
         */
        this.rows = []

        /**
         * The selected cell
         * (set from within the TableCell class)
         */
        this.selectedCell = null

        /**
         * The last selected cell
         * (again handled from within the cell class)
         */
        this.lastSelectedCell = null

        /**
         * Event handlers to be freed on removal
         */
        this.eventHandlers = []

        this.createDOM()
    }

    createDOM()
    {
        this.contentDiv.innerHTML = `
            <table>
                <tbody ref="table">
                </tbody>
            </table>
        `

        // get table reference
        let refs = getRefs(this.contentDiv)
        this.tableElement = refs.table

        // super class method
        this.loadQuill()
    }

    /**
     * Called when quill is loaded in the iframe
     */
    onQuillLoaded()
    {
        // initial table size
        this.addRow(3)
        this.addRow(3)
    }

    /**
     * Add new row at a position
     */
    addRow(cellCount, at)
    {
        let row = new TableRow(this, cellCount)

        let before = this.tableElement.children[at]

        if (before)
        {
            this.tableElement.insertBefore(row.element, before)
            this.rows.splice(at, 0, row)
        }
        else
        {
            this.tableElement.appendChild(row.element)
            this.rows.push(row)
        }

        this.updateDimensions()
    }

    /**
     * Removes a given row
     */
    removeRow(index)
    {
        if (this.rows.length <= 1)
            return

        if (index < 0 || index > this.rows.length - 1)
            return

        let row = this.rows[index]
        this.rows.splice(index, 1)
        row.remove()
    }

    /**
     * A cell was deselected
     * (called from the TableCell class)
     */
    cellDeselected()
    {
        if (TableObject.activeTable === this)
        {
            TableObject.lastFocusedTable = this
            TableObject.activeTable = null
        }
    }

    /**
     * A new cell was selected
     * (called from the TableCell class)
     */
    cellSelected()
    {
        TableObject.lastFocusedTable = this
        TableObject.activeTable = this
    }

    /**
     * Focus this table
     */
    focus()
    {
        if (this.lastSelectedCell && !this.lastSelectedCell.removed)
        {
            this.lastSelectedCell.quill.focus()
        }
        else if (this.rows.length > 0 && this.rows[0].cells.length > 0)
        {
            this.rows[0].cells[0].quill.focus()
        }
    }

    /**
     * Returns quill delta value
     */
    getValue()
    {
        let rows = this.rows.map((row) => {
            return row.cells.map((cell) => {
                return cell.quill.getContents()
            })
        })

        return {
            "rows": rows
        }
    }

    ////////////
    // Events //
    ////////////

    /**
     * Register all event handlers
     * (called from the super class)
     */
    bindEventListeners()
    {
        this.bindToRichTextBus(
            "insert-table-row-below",
            this.onInsertRowBelow
        )

        this.bindToRichTextBus(
            "insert-table-row-above",
            this.onInsertRowAbove
        )

        this.bindToRichTextBus(
            "remove-table-row",
            this.onRemoveRow
        )
    }

    onInsertRowBelow()
    {
        this.addRow(
            this.selectedCell.element.parentElement.children.length,
            this.selectedCell.getPosition().row + 1
        )
    }

    onInsertRowAbove()
    {
        this.addRow(
            this.selectedCell.element.parentElement.children.length,
            this.selectedCell.getPosition().row
        )
    }

    onRemoveRow()
    {
        let pos = this.selectedCell.getPosition()
        this.removeRow(pos.row)

        if (pos.row >= 0 && pos.row < this.rows.length)
            this.rows[pos.row].cells[pos.column].focus()
    }

    /**
     * Register event handler
     */
    bindToRichTextBus(event, callback)
    {
        let handler = function() {
            callback.apply(this, arguments)
        }.bind(this)

        const RichText = require("../../RichText.js")

        RichText.bus.on(event, function() {

            // only if active
            if (TableObject.lastFocusedTable !== this)
                return

            // call the handler
            handler.apply(this, arguments)

        }.bind(this))

        // add to handler list
        this.eventHandlers[event] = handler
    }

    /**
     * Free event handlers
     * (called from destructor)
     */
    freeEventListeners()
    {
        const RichText = require("../../RichText.js")

        for (let i in this.eventHandlers)
            RichText.bus.off(i, this.eventHandlers)
    }
}

/**
 * Stores the currently active table
 */
TableObject.activeTable = null

/**
 * The table that has been the last one to be blurred (/focused)
 *
 * For regaining focus after UI interactions
 */
TableObject.lastFocusedTable = null

module.exports = TableObject