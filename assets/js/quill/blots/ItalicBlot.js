module.exports = function(Quill) {

const Inline = Quill.import("blots/inline")

class ItalicBlot extends Inline
{
    // nothing
}

ItalicBlot.blotName = "italic"
ItalicBlot.tagName = "i"

Quill.register(ItalicBlot)

}