const Window = require("../Window.js")
const getRefs = require("../../utils/getRefs.js")
const Picker = require("../components/Picker.js")

class RichTextWidgetToolbar extends Window
{
    constructor(document, mycelium, options)
    {
        super(document, options)

        this.$mycelium = mycelium

        this.$content.innerHTML = require("./RichTextWidgetToolbar.html")

        this.$refs = getRefs(this.$content)

        this.headerPicker = new Picker(this.$refs.header)

        this.$registerEventListeners()
    }

    $registerEventListeners()
    {
        this.$refs.bold.addEventListener("click", this.$onBoldClick.bind(this))
        this.$refs.italic.addEventListener("click", this.$onItalicClick.bind(this))
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    $onBoldClick()
    {
        this.$mycelium.class.widgets.RichText.bus.fire("apply-bold")
    }

    $onItalicClick()
    {
        this.$mycelium.class.widgets.RichText.bus.fire("apply-italic")
    }
}

module.exports = RichTextWidgetToolbar