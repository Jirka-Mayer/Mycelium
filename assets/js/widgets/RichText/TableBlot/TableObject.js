const IframeObject = require("../IframeObject.js")
const getRefs = require("../../../utils/getRefs.js")
const TableRow = require("./TableRow.js")
const EventBus = require("../../../EventBus.js")

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
            <div class="mc-ql-table-blot__table">
                <table>
                    <tbody ref="table">
                    </tbody>
                </table>
            </div>
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
        // load table data
        this.loadValue()

        // if still empty, setup initial table
        if (this.rows.length <= 0)
            this.createInitialTable()

        this.updateDimensions()
    }

    /**
     * Load table value from delta
     */
    loadValue()
    {
        // deserialize value
        try
        {
            this.initialValue = JSON.parse(this.initialValue)
        }

        // hide any errors
        catch (e)
        {
            console.error(e)
            console.log(this.initialValue)
            this.initialValue = {}
        }

        if (!(this.initialValue.rows instanceof Array))
            this.initialValue.rows = []

        for (let i = 0; i < this.initialValue.rows.length; i++)
        {
            if (!(this.initialValue.rows[i] instanceof Array))
                continue

            this.addRow(this.initialValue.rows[i])
        }
    }

    /**
     * Trigger shroom data update
     */
    triggerShroomUpdate()
    {
        // tell richtext widget that a change occured
        // (trigger text-change event)
        this.richText.quill.insertText(0, "")
    }

    /**
     * Sets up the initial table layout
     */
    createInitialTable()
    {
        this.addRow(3)
        this.addRow(3)
    }

    /**
     * Add new row at a position
     * cells - if int, then count, if array, then content
     */
    addRow(cells, at)
    {
        let row = new TableRow(this, cells)

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
        this.triggerShroomUpdate()
    }

    /**
     * Adds a new column at a position
     */
    addColumn(at)
    {
        for (let i = 0; i < this.rows.length; i++)
            this.rows[i].addCell(at)

        this.triggerShroomUpdate()
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

        this.updateDimensions()
        this.triggerShroomUpdate()
    }

    /**
     * Removes a given column
     */
    removeColumn(index)
    {
        // check table width
        if (index < 0 || index >= this.rows[0].cells.length)
            return

        // remove the column from all rows
        for (let i = 0; i < this.rows.length; i++)
            this.rows[i].removeCell(index)

        this.triggerShroomUpdate()
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
            TableObject.bus.fire("active-table-change", null)
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
        TableObject.bus.fire("active-table-change", this)
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
                // convert delta to object
                return {
                    ops: cell.quill.getContents().ops
                }
            })
        })

        let value = {
            "rows": rows
        }

        // serialize value
        return JSON.stringify(value)
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
            "active-widget-change",
            this.onActiveWidgetChange
        )

        this.bindToRichTextBus(
            "insert-table-row-below",
            this.onInsertRowBelow
        )

        this.bindToRichTextBus(
            "insert-table-row-above",
            this.onInsertRowAbove
        )

        this.bindToRichTextBus(
            "insert-table-column-left",
            this.onInsertColumnLeft
        )

        this.bindToRichTextBus(
            "insert-table-column-right",
            this.onInsertColumnRight
        )

        this.bindToRichTextBus(
            "remove-table-row",
            this.onRemoveRow
        )

        this.bindToRichTextBus(
            "remove-table-column",
            this.onRemoveColumn
        )
    }

    onActiveWidgetChange(activeWidget)
    {
        // if the user makes a selection in a richtext widget, then
        // he has probbably left this table so blurr it
        // (to make sure the UI updates itself properly)
        this.cellDeselected()
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

    onInsertColumnLeft()
    {
        this.addColumn(this.selectedCell.getPosition().column)
    }

    onInsertColumnRight()
    {
        this.addColumn(this.selectedCell.getPosition().column + 1)
    }

    onRemoveRow()
    {
        let pos = this.selectedCell.getPosition()
        this.removeRow(pos.row)

        if (pos.row >= 0 && pos.row < this.rows.length)
            this.rows[pos.row].cells[pos.column].focus()
    }

    onRemoveColumn()
    {
        let pos = this.selectedCell.getPosition()
        this.removeColumn(pos.column)

        if (pos.column >= 0 && pos.column < this.rows[pos.row].cells.length)
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
 * Event bus for tables
 */
TableObject.bus = new EventBus()

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