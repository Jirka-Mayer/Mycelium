class WindowManager
{
    constructor(document)
    {
        this.windows = []

        this.$createDOM(document)
    }

    $createDOM(document)
    {
        let element = document.createElement("div")
        element.className = "mc-window-manager"

        document.body.appendChild(element)

        this.$element = element
    }

    /**
     * Registers a new window
     */
    registerWindow(win)
    {
        this.windows.push(win)
        this.$element.appendChild(win.$element)
    }
}

module.exports = WindowManager