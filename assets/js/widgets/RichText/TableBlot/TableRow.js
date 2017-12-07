const TableCell = require("./TableCell.js")

class TableRow
{
    constructor(tableObject, cells)
    {
        /**
         * Table object reference
         */
        this.tableObject = tableObject

        /**
         * Cells in the row
         */
        this.cells = []

        /**
         * Indicates if the row has been removed from the table
         */
        this.removed = false

        this.createElement()

        // number of empty cells
        if (typeof(cells) === "number")
        {
            for (let i = 0; i < cells; i++)
                this.addCell()
        }

        // cells with content
        else if (cells instanceof Array)
        {
            for (let i = 0; i < cells.length; i++)
                this.addCell(undefined, cells[i])
        }
    }

    /**
     * Creates the html element
     */
    createElement()
    {
        this.element = this.tableObject.contentDocument.createElement("tr")
    }

    /**
     * Add new cell at a given index (or the end if undefined)
     */
    addCell(at, content)
    {
        let cell = new TableCell(this.tableObject, content)
        
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

        this.removed = true

        for (let i = 0; i < this.cells.length; i++)
            this.cells[i].remove()
    }
}

module.exports = TableRow