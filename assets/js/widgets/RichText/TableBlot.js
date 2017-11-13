const Quill = require("./quill.js")
const BlockEmbed = Quill.import("blots/block/embed")

class TableBlot extends BlockEmbed
{
    static create(value)
    {
        let node = super.create()

        let shadowRoot = node.createShadowRoot()
        shadowRoot.innerHTML = "<h3>Hello world!<h3>"

        return node
    }

    static value(node)
    {   
        return []
    }
}

TableBlot.blotName = "table"
TableBlot.tagName = "div"
TableBlot.className = "mc-ql-table-blot"

Quill.register(TableBlot)
