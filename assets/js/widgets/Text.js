class Text
{
    static createInstances(window, document, shroom)
    {
        let elements = document.querySelectorAll(
            '[mycelium-widget="text"]'
        )
        let instances = []

        for (let i = 0; i < elements.length; i++)
            instances.push(new Text(
                window, document, elements[i], shroom
            ))

        return instances
    }

    constructor(window, document, element, shroom)
    {
        this.window = window
        this.document = document
        
        this.el = element

        this.shroom = shroom
        this.key = this.el.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("Text widget missing 'key' attribute.")

        this.el.addEventListener(
            "input", this.onInput.bind(this)
        )

        this.el.addEventListener(
            "paste", this.onPaste.bind(this)
        )

        this.el.addEventListener(
            "drop", this.onDrop.bind(this)
        )
    }

    onInput(e)
    {
        this.shroom.setData(this.key, this.getText())
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

        let range = this.document.caretRangeFromPoint(
            e.clientX,
            e.clientY
        )

        let selection = this.window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        this.insertTextAtCursor(
            e.dataTransfer.getData("text/plain")
        )
    }

    insertTextAtCursor(text)
    {
        this.document.execCommand("insertHTML", false, text)
    }

    getText()
    {
        return this.el.innerText
    }
}

module.exports = Text