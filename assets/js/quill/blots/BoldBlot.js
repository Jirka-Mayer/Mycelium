module.exports = function(Quill) {

const Inline = Quill.import("blots/inline")

class BoldBlot extends Inline
{
    // nothing
}

BoldBlot.blotName = "bold"
BoldBlot.tagName = "b"

Quill.register(BoldBlot)

}