class Window
{
    constructor(document, options)
    {
        this.$createDOM(document)
    }

    $createDOM(document)
    {
        let element = document.createElement("div")
        element.className = "mc-window"
        element.innerHTML = require("./Window.html")

        this.$element = element
        this.$content = element.querySelector(".mc-window__content")
    }

    /**
     * Updates displayed position and size
     */
    updateDisplay()
    {

    }
}

module.exports = Window