const TableCell = require("./TableCell.js")

class TableRow
{
    constructor(tableBlot, contents)
    {
        /**
         * Table object reference
         */
        this.tableBlot = tableBlot

        /**
         * Cells in the row
         */
        this.cells = []

        /**
         * Table row html element
         */
        this.element = this.tableBlot.contentDocument.createElement("tr")

        // Content specified as a number of empty cell
        if (typeof(contents) === "number")
        {
            for (let i = 0; i < contents; i++)
                this.addCell()
        }

        // content specified as an array of deltas, each for a single cell
        else if (contents instanceof Array)
        {
            for (let i = 0; i < contents.length; i++)
                this.addCell(undefined, contents[i])
        }
    }

    /**
     * Add new cell at a given index (or the end if undefined)
     */
    addCell(at, deltaContents)
    {
        let cell = new TableCell(this.tableBlot, deltaContents)
        
        let before = this.element.children[at]

        if (before)
        {
            this.cells.splice(at, 0, cell)
            this.element.insertBefore(cell.element, before)
        }
        else
        {
            this.cells.push(cell)
            this.element.appendChild(cell.element)
        }
    }

    /**
     * Removes a cell at a given index
     */
    removeCell(index)
    {
        if (index < 0 || index >= this.cells.length)
            return

        let cell = this.cells[index]
        this.cells.splice(index, 1)
        cell.remove()
    }

    /**
     * Remove the row from table
     */
    remove()
    {
        this.element.remove()

        for (let i = 0; i < this.cells.length; i++)
            this.cells[i].remove()
    }
}

module.exports = TableRow