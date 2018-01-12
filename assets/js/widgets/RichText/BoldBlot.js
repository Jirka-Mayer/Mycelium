const Quill = require("./quill.js")
const Inline = Quill.import("blots/inline")

class BoldBlot extends Inline
{

}

BoldBlot.blotName = "bold"
BoldBlot.tagName = "b"

Quill.register(BoldBlot)