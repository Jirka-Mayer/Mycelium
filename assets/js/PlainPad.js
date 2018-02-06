const EventBus = require("./EventBus.js")
const TextPad = require("./TextPad.js")

/**
 * Like TextPad, but only for plain text
 */
class PlainPad
{
    constructor(element, window, document)
    {
        // references
        this.window = window
        this.document = document

        /**
         * HTML element
         */
        this.element = element

        // DOM signature
        this.element.setAttribute("mycelium-plain-pad", "here")

        // editing
        this.element.setAttribute("contenteditable", "true")

        /**
         * Event bus for the instance
         */
        this.bus = new EventBus()
        this.on = this.bus.on.bind(this.bus)

        this.registerEventListeners()
    }

    registerEventListeners()
    {
        this.element.addEventListener("input", this.onInput.bind(this))
        this.element.addEventListener("paste", this.onPaste.bind(this))
        this.element.addEventListener("drop", this.onDrop.bind(this))
        this.element.addEventListener("focus", this.onFocus.bind(this))
    }

    /**
     * Inserts some text at the position of cursor (caret)
     */
    insertTextAtCursor(text)
    {
        // let the browser do the work
        // (this triggers the onInput event)
        this.document.execCommand("insertHTML", false, text)
    }

    /**
     * Returns the textual content of the pad
     */
    getText()
    {
        return this.element.innerText
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    onInput(e)
    {
        // check that no html is present
        // (this fix breaks history so that's why the handlers for pasting)
        if (this.element.innerHTML != this.element.innerText)
        {
            this.element.innerHTML = this.element.innerText
            return
        }

        this.bus.fire("text-change")
    }

    onPaste(e)
    {
        e.preventDefault()

        if (e.clipboardData && e.clipboardData.getData)
        {
            var text = e.clipboardData.getData("text/plain")
            this.insertTextAtCursor(text)
        }
        else if (
            this.window.clipboardData &&
            this.window.clipboardData.getData
        )
        {
            var text = this.window.clipboardData.getData("Text")
            this.insertTextAtCursor(text)
        }
    }

    onDrop(e)
    {
        e.preventDefault()

        // browser ain't support, we ain't support
        if (!this.document.caretRangeFromPoint)
            return

        let range = this.document.caretRangeFromPoint(e.clientX, e.clientY)

        let selection = this.window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        this.insertTextAtCursor(e.dataTransfer.getData("text/plain"))
    }

    ///////////////
    // Selection //
    ///////////////

    onFocus(e)
    {
        // if the last selected pad is not null, blur it first
        // (because otherwise if a have TextPad selected and select PlainPad
        // inside an iframe blot, then when I type it jumps back into the
        // TextPad - it doesn't get blurred properly for some reason)
        if (TextPad.activePad !== null)
            TextPad.activePad.blur()

        // no active text pad now
        TextPad.bus.fire("selection-change", null, {})
        TextPad.setActivePad(null)
    }
}

module.exports = PlainPad