const TableCell = require("./TableCell.js")

class TableRow
{
    constructor(tableObject, cellCount)
    {
        /**
         * Table object reference
         */
        this.tableObject = tableObject

        /**
         * Cells in the row
         */
        this.cells = []

        this.createElement()

        for (let i = 0; i < cellCount; i++)
            this.addCell(0)
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
    addCell(at)
    {
        let cell = new TableCell(this.tableObject)
        
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
}

module.exports = TableRow