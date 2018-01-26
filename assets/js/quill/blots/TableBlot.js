module.exports = function(Quill) {

const getRefs = require("../../utils/getRefs.js")
const TableRow = require("./TableBlot/TableRow.js")
const IframeBlot = require("./IframeBlot.js")(Quill)
const ClipCache = require("../IframeClipCache.js")

class TableBlot extends IframeBlot
{
    constructor(element, value)
    {
        super(element, value)

        /**
         * Initial blot value
         */
        this.initialValue = value

        /**
         * Flag
         */
        this.initialized = false
    }

    initialize()
    {
        super.initialize()

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

        this.createDOM()

        this.loadQuill(() => {

            this.loadFromInitialValue()

            // if still empty, setup initial table
            if (this.rows.length <= 0)
                this.createInitialTable()

            this.updateDimensions()

            this.initialized = true
        })
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
    }

    /**
     * Process the initial value, setup the table
     */
    loadFromInitialValue()
    {
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
        // tell pad that a change occured
        // (trigger text-change event)
        this.textPad.quill.insertText(0, "")
    }

    /**
     * Sets up the initial table layout
     */
    createInitialTable()
    {
        // create a 2x2 table
        for (let i = 0; i < 2; i++)
            this.addRow(2)
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
     * Returns quill delta value
     */
    value()
    {
        // returned value
        let out

        // if not initialized yet, return the initial value
        if (!this.initialized)
        {
            out = { table: this.initialValue }
        }

        // otherwise get the value
        else
        {
            let rows = this.rows.map((row) => {
                return row.cells.map((cell) => {
                    // convert delta to object
                    return {
                        ops: cell.textPad.getContents().ops
                    }
                })
            })

            let value = {
                "rows": rows
            }

            out = {
                table: value
            }
        }

        // save value to clip-cache
        ClipCache.setValue(this.clipCacheId, out)

        return out
    }

    ///////////////////
    // Table editing //
    ///////////////////

    /*
        Like more UI-like
     */

    insertRowBelow(cell)
    {
        this.addRow(
            cell.element.parentElement.children.length,
            cell.getPosition().row + 1
        )
    }

    insertRowAbove(cell)
    {
        this.addRow(
            cell.element.parentElement.children.length,
            cell.getPosition().row
        )
    }

    insertColumnLeft(cell)
    {
        this.addColumn(cell.getPosition().column)
    }

    insertColumnRight(cell)
    {
        this.addColumn(cell.getPosition().column + 1)
    }

    removeRowAtCell(cell)
    {
        let pos = cell.getPosition()
        this.removeRow(pos.row)

        if (pos.row >= 0 && pos.row < this.rows.length)
            this.rows[pos.row].cells[pos.column].focus()
    }

    removeColumnAtCell(cell)
    {
        let pos = cell.getPosition()
        this.removeColumn(pos.column)

        if (pos.column >= 0 && pos.column < this.rows[pos.row].cells.length)
            this.rows[pos.row].cells[pos.column].focus()
    }
}

TableBlot.blotName = "table"
TableBlot.className = "mc-ql-table-blot"

Quill.register(TableBlot)

}