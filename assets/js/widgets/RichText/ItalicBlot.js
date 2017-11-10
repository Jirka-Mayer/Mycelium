const Quill = require("./quill.js")
const Inline = Quill.import("blots/inline")

class ItalicBlot extends Inline
{

}

ItalicBlot.blotName = "italic"
ItalicBlot.tagName = "em"

Quill.register(ItalicBlot)