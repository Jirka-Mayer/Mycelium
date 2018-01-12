const Window = require("../Window.js")
const RichTextWidget = require("../../widgets/RichText.js")
const getRefs = require("../../utils/getRefs.js")
const cssClass = require("../../utils/cssClass.js")

class LinkBlotProperties extends Window
{
    constructor(window, document, mycelium)
    {
        super(window, document, mycelium)

        /**
         * Is the selected link in editing mode or just viewing?
         */
        this.editing = false

        /**
         * Range where the link is located
         */
        this.linkRange = null

        /**
         * The widget, where the link is located
         */
        this.linkWidget = null

        /**
         * Quill, where the link is located
         * 
         * TODO
         */
        //this.linkQuill = null

        this.content.innerHTML = require("./LinkBlotProperties.html")
        cssClass(this.content, "mc-lbp", true)

        this.refs = getRefs(this.content)

        this.refs.edit.addEventListener("click", this.onEditClick.bind(this))
        this.refs.save.addEventListener("click", this.onSaveClick.bind(this))
        this.refs.remove.addEventListener("click", this.onRemoveClick.bind(this))

        this.refs.editingBlock.addEventListener("submit", this.onSaveClick.bind(this))

        this.updateDisplayedBlock()

        window.addEventListener(
            "mousedown", this.onBrowserWindowClick.bind(this)
        )

        RichTextWidget.bus.on("selection-change", this.onWidgetSelectionChange.bind(this))
    }

    /**
     * Called when new link should be added
     * (from the RichTextWidgetToolbar)
     */
    createLink()
    {
        // get new link range
        this.linkRange = RichTextWidget.getSelection()
        this.linkWidget = RichTextWidget.activeWidget

        if (this.linkRange === null)
            return

        if (this.linkRange.length === 0)
            return

        // switch mode
        this.editing = true
        this.updateDisplayedBlock()

        // show
        this.show()

        // focus
        this.refs.textbox.select()
    }

    /**
     * Returns range of the selected link, null if no link selected
     */
    getSelectedLinkRange()
    {
        /*
            A link may only be selected if you have a cursor oper it
            (I mean no selection -> length = 0)
            If any selection - even if over a link, no link is selected
         */

        let selection = RichTextWidget.getSelection()

        if (selection === null)
            return null

        if (selection.length > 0)
            return null

        // find start
        let start = selection.index
        while (start >= 0)
        {
            if (!RichTextWidget.getFormat(start, 0).link)
                break

            start -= 1
        }

        let len = RichTextWidget.activeWidget.quill.getLength()

        // find end
        let end = selection.index
        while (end < len)
        {
            if (!RichTextWidget.getFormat(end, 0).link)
                break

            end += 1
        }

        // it overcounts
        end -= 1

        // calculate link range
        let range = {
            index: start,
            length: end - start
        }

        return range
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

        this.updatePosition()
    }

    ////////////////////////
    // Visibility control //        (Visibility of the entire window)
    ////////////////////////        (and position)

    /**
     * Shows the window at the correct position
     */
    show()
    {
        // display window
        this.maximize()

        // let the window be displayed
        setTimeout(() => {

            // then update position
            this.updatePosition()
        }, 0)
    }

    /**
     * Updates window position
     */
    updatePosition()
    {
        // no link selected, this window should not even be displayed
        if (this.linkRange === null)
            return

        // get widnow display coordinates
        let quillBounds = this.linkWidget.element.getBoundingClientRect()

        let selectionBounds = this.linkWidget.quill.getBounds(
            this.linkRange.index, this.linkRange.length
        )

        // update width, height properties
        this.updateDisplay()

        // calculate window position
        let x = quillBounds.x + selectionBounds.left
            + selectionBounds.width / 2 - this.outerWidth / 2

        let y = quillBounds.y + selectionBounds.top
            + selectionBounds.height + 10

        // move the window
        this.moveTo(x, y)
    }

    /**
     * Listen for browser window clicks
     */
    onBrowserWindowClick(e)
    {
        // clicking inside the window doesn'thide it
        if (e.path.indexOf(this.element) >= 0)
            return

        // delay the handling slightly so that quill can take
        // action on selection change
        setTimeout(() => {
        
            // if user clicks into a richtext widget
            let rtw = false
            for (let i = 0; i < e.path.length; i++)
            {
                if (!e.path[i].getAttribute) // window object
                    continue

                if (e.path[i].getAttribute("mycelium-widget") === "rich-text")
                {
                    rtw = true
                    break
                }
            }

            // do not hide, if a link format was selected by the click
            if (rtw && RichTextWidget.getFormat().link)
                return

            this.minimize()

        }, 0)
    }

    /**
     * When rich-text widget selection changes (any of them)
     */
    onWidgetSelectionChange(selection, format)
    {
        // dont' do anything on deselect
        if (selection === null)
            return

        // if no link selected, again dont do anything
        // (hide the window actually)
        // 
        // OR if the selection is not zero-length
        if (!format.link || selection.length > 0)
        {
            this.minimize()
            this.refs.textbox.value = ""
            return
        }

        // load link into the form
        this.refs.textbox.value = format.link
        this.refs.url.innerText = format.link
        this.refs.url.setAttribute("href", format.link)

        // save the interesting range
        this.linkRange = this.getSelectedLinkRange()
        this.linkWidget = RichTextWidget.activeWidget

        this.show()
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
        RichTextWidget.refocus()
        this.linkWidget.quill.setSelection(
            this.linkRange.index, this.linkRange.length
        )
        
        // update format
        this.linkWidget.quill.format("link", href)

        //RichTextWidget.bus.fire("apply-link", href)
        /*
            TODO:
            Nope, go around the bus, rework the bus in the future for iframes
         */

        // change mode
        this.editing = false
        this.updateDisplayedBlock()

        // forget the range
        this.linkRange = null
        this.linkWidget = null
    }

    onRemoveClick()
    {
        // select desired range
        RichTextWidget.refocus()
        this.linkWidget.quill.setSelection(
            this.linkRange.index, this.linkRange.length
        )
        
        // update format
        this.linkWidget.quill.format("link", false)

        // forget the range
        this.linkRange = null
        this.linkWidget = null
    }
}

module.exports = LinkBlotProperties