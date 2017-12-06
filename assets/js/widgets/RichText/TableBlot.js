const Quill = require("./quill.js")
const IframeBlot = require("./IframeBlot.js")
const TableObject = require("./TableBlot/TableObject.js")

class TableBlot extends IframeBlot
{
    static create(value)
    {
        return super.create(value, TableObject)
    }

    static value(node)
    {
        return super.value(node)
    }
}

TableBlot.blotName = "table"
TableBlot.className = "mc-ql-table-blot"

Quill.register(TableBlot)
