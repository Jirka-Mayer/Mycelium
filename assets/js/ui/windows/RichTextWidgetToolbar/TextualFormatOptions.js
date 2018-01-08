const Window = require("../Window.js")

class TextualFormatOptions extends Window
{
    constructor(window, document, options)
    {
        super(window, document, options)

        this.content.innerHTML = require("./TextualFormatOptions.html")

    }
}

module.exports = TextualFormatOptions