const Quill = require("./quill.js")
const Block = Quill.import("blots/block")

class HeaderBlot extends Block
{
    static formats(node)
    {
        return HeaderBlot.tagName.indexOf(node.tagName) + 1
    }
}

HeaderBlot.blotName = "header"
HeaderBlot.tagName = ["H1", "H2"]

Quill.register(HeaderBlot)