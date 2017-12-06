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
     * A cell was deselected
     * (called from the TableCell class)
     */
    cellDeselected()
    {

    }

    /**
     * A new cell was selected
     * (called from the TableCell class)
     */
    cellSelected()
    {
        
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

    /**
     * Register all event handlers
     * (called from the super class)
     */
    bindEventListeners()
    {
        this.bindToRichTextBus(
            "insert-table-row-after",
            this.onInsertRowAfter
        )
    }

    /**
     * When toolbar "add row after" is clicked
     */
    onInsertRowAfter()
    {
        this.addRow(
            this.selectedCell.element.parentElement.children.length,
            this.selectedCell.getPosition().row + 1
        )
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
            if (!this.selectedCell)
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

module.exports = TableObject