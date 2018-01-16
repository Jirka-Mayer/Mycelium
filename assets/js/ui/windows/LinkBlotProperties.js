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

        /**
         * The link scheme
         */
        this.scheme = "http"

        this.content.innerHTML = require("./LinkBlotProperties.html")
        cssClass(this.content, "mc-lbp", true)

        this.refs = getRefs(this.content)

        this.refs.edit.addEventListener("click", this.onEditClick.bind(this))
        this.refs.save.addEventListener("click", this.onSaveClick.bind(this))
        this.refs.remove.addEventListener("click", this.onRemoveClick.bind(this))

        this.refs.editingBlock.addEventListener("submit", this.onSaveClick.bind(this))

        this.refs.textbox.addEventListener("keydown", this.onTextboxKeydown.bind(this))
        this.refs.textbox.addEventListener("input", this.onTextboxInput.bind(this))

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

        // set content
        let text = this.interestingPad.getText(
            this.interestingRange.index,
            this.interestingRange.length
        )
        this.scheme = this.parseLinkValue(text).scheme
        this.refs.textbox.value = text
        this.refs.url.innerText = text
        this.refs.url.setAttribute("href", "#")

        // switch mode
        this.editing = true
        this.updateDisplayedBlock()

        // show
        this.showThePopup()

        // focus
        this.refs.textbox.select()
    }

    /**
     * Input is the text user types and the output is the
     * link scheme and the href content / false if empty
     */
    parseLinkValue(value)
    {
        // remove scheme if present
        let withoutScheme = value.replace(/^(https?\:\/\/)|(mailto\:)|(tel\:)/, "")

        // handle emails
        if (this.isEmail(withoutScheme))
        {
            return {
                scheme: "mailto",
                href: "mailto:" + withoutScheme
            }
        }

        // handle telephone numbers
        if (this.isTelephone(withoutScheme))
        {
            return {
                scheme: "tel",
                href: "tel:" + withoutScheme
            }
        }

        // else handle http
        return {
            scheme: "http",
            href: "http://" + withoutScheme
        }
    }

    isEmail(text)
    {
        return !!text.match(/^\S+@\S+\.\S+$/)
    }

    isTelephone(text)
    {
        return !!text.match(/^\+?[\d\-\s]+$/)
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

        this.updateDisplayedScheme()
    }

    /**
     * Updates the active scheme icon
     */
    updateDisplayedScheme()
    {
        cssClass(this.refs.httpScheme, "active", this.scheme === "http")
        cssClass(this.refs.mailtoScheme, "active", this.scheme === "mailto")
        cssClass(this.refs.telScheme, "active", this.scheme === "tel")
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
        let linkValue = this.parseLinkValue(format.link)
        this.scheme = linkValue.scheme

        this.refs.textbox.value = format.link
        this.refs.url.innerText = format.link
        this.refs.url.setAttribute("href", format.link)
    }

    ////////////
    // Events //
    ////////////

    onEditClick()
    {
        this.scheme = this.parseLinkValue(this.refs.textbox.value).scheme
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

        let linkValue = this.parseLinkValue(this.refs.textbox.value)
        this.scheme = linkValue.scheme

        // select desired range
        TextPad.focus()
        this.interestingPad.quill.setSelection(
            this.interestingRange.index, this.interestingRange.length
        )
        
        // update format
        this.interestingPad.format("link", linkValue.href)

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

    onTextboxInput(e)
    {
        let linkValue = this.parseLinkValue(this.refs.textbox.value)
        this.scheme = linkValue.scheme

        this.updateDisplayedScheme()
    }

    onTextboxKeydown(e)
    {
        if (e.key === "Escape")
            this.onEscapeHit()
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