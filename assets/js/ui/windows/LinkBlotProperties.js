const TextPopupWindow = require("./TextPopupWindow.js")
const getRefs = require("../../utils/getRefs.js")
const cssClass = require("../../utils/cssClass.js")
const TextPad = require("../../TextPad.js")

class LinkBlotProperties extends TextPopupWindow
{
    constructor(window, document, mycelium)
    {
        super(window, document, mycelium)

        /**
         * Is the selected link in editing mode or just viewing?
         */
        this.editing = false

        this.content.innerHTML = require("./LinkBlotProperties.html")
        cssClass(this.content, "mc-lbp", true)

        this.refs = getRefs(this.content)

        this.refs.edit.addEventListener("click", this.onEditClick.bind(this))
        this.refs.save.addEventListener("click", this.onSaveClick.bind(this))
        this.refs.remove.addEventListener("click", this.onRemoveClick.bind(this))

        this.refs.editingBlock.addEventListener("submit", this.onSaveClick.bind(this))

        this.refs.textbox.addEventListener("keydown", (e) => {
            if (e.key === "Escape")
                this.onEscapeHit()
        })

        this.updateDisplayedBlock()
    }

    /**
     * Called when new link should be added
     * (from the toolbar)
     */
    createLink()
    {
        // get new link range
        this.interestingRange = TextPad.getSelection()
        this.interestingPad = TextPad.activePad

        if (this.interestingRange === null)
            return

        if (this.interestingRange.length === 0)
            return

        // switch mode
        this.editing = true
        this.updateDisplayedBlock()

        // clear content
        this.refs.textbox.value = ""
        this.refs.url.innerText = ""
        this.refs.url.setAttribute("href", "#")

        // show
        this.showThePopup()

        // focus
        this.refs.textbox.select()
    }

    /**
     * Updates DOM based on mode
     */
    updateDisplayedBlock()
    {
        if (this.editing)
        {
            this.refs.editingBlock.style.display = "block"
            this.refs.viewingBlock.style.display = "none"
        }
        else
        {
            this.refs.editingBlock.style.display = "none"
            this.refs.viewingBlock.style.display = "block"
        }

        this.updatePopupPosition()
    }

    ///////////
    // Hooks //
    ///////////

    /**
     * Returns true, if the format is interesting
     */
    isFormatInteresting(format)
    {
        return !!format.link
    }

    onPopupHide()
    {
        // switch mode
        this.editing = false
        this.updateDisplayedBlock()
    }

    onPopupShowBySelection(format)
    {
        // load link into the form
        this.refs.textbox.value = format.link
        this.refs.url.innerText = format.link
        this.refs.url.setAttribute("href", format.link)
    }

    ////////////
    // Events //
    ////////////

    onEditClick()
    {
        this.editing = true
        this.updateDisplayedBlock()

        this.refs.textbox.select()
    }

    /**
     * Save click or textbox submit
     */
    onSaveClick(e)
    {
        // check mode
        if (!this.editing)
            return

        // on submit prevent page reload
        if (e.type === "submit")
            e.preventDefault()

        let href = this.refs.textbox.value

        // select desired range
        TextPad.focus()
        this.interestingPad.quill.setSelection(
            this.interestingRange.index, this.interestingRange.length
        )
        
        // update format
        this.interestingPad.format("link", href)

        // change mode
        this.editing = false
        this.updateDisplayedBlock()

        // forget the range
        this.interestingRange = null
        this.interestingPad = null
    }

    onRemoveClick()
    {
        // select desired range
        TextPad.focus()
        this.interestingPad.quill.setSelection(
            this.interestingRange.index, this.interestingRange.length
        )
        
        // update format
        this.interestingPad.format("link", false)

        // forget the range
        this.interestingRange = null
        this.interestingPad = null
    }

    /**
     * Called when esc hit during link editing
     */
    onEscapeHit()
    {
        /*
            if editing link, cancel editing
            if creating link, cancel and hide
         */

        // switch mode
        this.editing = false
        this.updateDisplayedBlock()

        // hide window if no link under selection
        if (!this.isFormatInteresting(TextPad.getFormat()))
        {
            this.onPopupHide()
            this.minimize()
        }
    }
}

module.exports = LinkBlotProperties