const Window = require("../Window.js")
const TextPad = require("../../TextPad.js")

class TextPopupWindow extends Window
{
    constructor(window, document, mycelium)
    {
        super(window, document, mycelium)

        /**
         * Range where interesting text is located
         */
        this.interestingRange = null

        /**
         * The text pad, where the interesting text is located
         */
        this.interestingPad = null

        window.addEventListener(
            "mousedown", this.onBrowserWindowClick_popupHandler.bind(this)
        )

        TextPad.on(
            "selection-change",
            this.onTextPadSelectionChange_popupHandler.bind(this)
        )
    }

    /**
     * Updates this.interestingRange to the currently selected one
     */
    updateInterestingRangeToSelected()
    {
        /*
            A format may only be selected if you have a cursor oper it
            (I mean no selection -> length = 0)
            If any selection - even if over a format, no format is selected
         */

        this.interestingPad = TextPad.activePad

        // no pad active
        if (this.interestingPad === null)
        {
            this.interestingRange = null
            return
        }

        let selection = this.interestingPad.getSelection()

        // exclude weird selections
        if (selection === null || selection.length > 0)
        {
            this.interestingRange = null
            return
        }

        // find start
        let start = selection.index
        while (start >= 0)
        {
            if (!this.isFormatInteresting(this.interestingPad.getFormat(start, 0)))
                break

            start -= 1
        }

        // document start
        if (start < 0)
            start = 0

        let len = this.interestingPad.getLength()

        // find end
        let end = selection.index
        while (end < len)
        {
            if (!this.isFormatInteresting(this.interestingPad.getFormat(end, 0)))
                break

            end += 1
        }

        // it overcounts
        end -= 1

        // calculate interesting range
        this.interestingRange = {
            index: start,
            length: end - start
        }
    }

    /**
     * Shows the window at the correct position
     */
    showThePopup()
    {
        // display window
        this.maximize()

        // let the window be displayed
        setTimeout(() => {

            // then update position
            this.updatePopupPosition()
        }, 0)
    }

    /**
     * Updates window position
     */
    updatePopupPosition()
    {
        // no text selected, this window should not even be displayed
        if (this.interestingRange === null)
            return

        // get widnow display coordinates
        let textPadBound = this.interestingPad.getPadBounds()

        let selectionBounds = this.interestingPad.getSelectionBounds(
            this.interestingRange.index, this.interestingRange.length
        )

        // update width, height properties
        // (so we can access them now)
        this.updateDisplay()

        // calculate window position
        let x = textPadBound.left + selectionBounds.left
            + selectionBounds.width / 2 - this.outerWidth / 2

        let y = textPadBound.top + selectionBounds.top
            + selectionBounds.height + 10

        // move the window
        this.moveTo(x, y)
    }

    /**
     * Listen for browser window clicks
     * (strange name to avoid subclass name collisions)
     */
    onBrowserWindowClick_popupHandler(e)
    {
        // clicking inside the window doesn't hide it
        if (e.path.indexOf(this.element) >= 0)
            return

        // delay the handling slightly so that quill can take
        // action on selection change
        setTimeout(() => {
        
            // if user clicks into a text pad
            /*let clickInAPad = false
            for (let i = 0; i < e.path.length; i++)
            {
                if (!e.path[i].getAttribute) // window object
                    continue

                if (e.path[i].getAttribute("mycelium-text-pad") === "here")
                {
                    clickInAPad = true
                    break
                }
            }*/

            // do not hide, if a the format was selected by the click
            /*if (clickInAPad && this.isFormatInteresting(TextPad.getFormat()))
                return*/

            /*
                NOTE:
                Uncommenting does fix the issue with hide on reclick,
                but causes a problem when switching to a different
                text pad, because of the TextPad.getFormat() call
             */

            this.onPopupHide()

            this.minimize()

        }, 0)
    }

    /**
     * When text pad selection changes
     */
    onTextPadSelectionChange_popupHandler(selection, format)
    {
        // dont' do anything on deselect
        if (selection === null)
            return

        // if no interesting format selected, again dont do anything
        // (hide the window actually)
        // 
        // OR if the selection is not zero-length
        if (!this.isFormatInteresting(format) || selection.length > 0)
        {
            this.onPopupHide()
            
            // hide
            this.minimize()

            return
        }

        // save the interesting range
        this.updateInterestingRangeToSelected()

        this.onPopupShowBySelection(format)
        this.showThePopup()
    }

    ///////////
    // Hooks //
    ///////////

    /*
        Override these to hook into events
        or make the shing work
     */
    
    /**
     * Returns true, if the format is interesting
     */
    isFormatInteresting(format)
    {
        return false
    }

    onPopupHide() {}

    onPopupShowBySelection(format) {}
}

module.exports = TextPopupWindow