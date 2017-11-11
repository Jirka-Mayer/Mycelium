const clamp = require("../utils/clamp.js")
const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class Window
{
    constructor(window, document, options)
    {
        this.$window = window
        this.$document = document

        /**
         * Window position
         */
        this.position = {x: 20, y: 20}

        /**
         * If the window is minimized
         */
        this.minimized = false

        /**
         * Transparent window
         */
        this.transparent = false

        /**
         * Is the window being dragged
         */
        this.dragged = false

        // dragging properties
        this.dragStartMousePosition = null
        this.dragStartWindowPosition = null

        // create html stuff
        this.$createDOM()

        this.updateDisplay()

        this.$handle.addEventListener(
            "mousedown", this.$onHandleMouseDown.bind(this)
        )

        this.$window.addEventListener(
            "mousemove", this.$onWindowMouseMove.bind(this)
        )

        this.$window.addEventListener(
            "mouseup", this.$onWindowMouseUp.bind(this)
        )

        this.$window.addEventListener(
            "resize", this.$onWindowResize.bind(this)
        )

        this.$refs.transparency.addEventListener(
            "click", this.$onTransparencyToggleClick.bind(this)
        )

        this.$refs.minimize.addEventListener(
            "click", this.minimize.bind(this)
        )
    }

    $createDOM()
    {
        let element = this.$document.createElement("div")
        element.className = "mc-window"
        element.innerHTML = require("./Window.html")

        this.$element = element
        this.$handle = element.querySelector(".mc-window__handle")
        this.$content = element.querySelector(".mc-window__content")

        this.$refs = getRefs(this.$element)
    }

    /**
     * Updates displayed position and size
     */
    updateDisplay()
    {
        // clip window position
        this.position.x = clamp(
            this.position.x, 0,
            this.$window.innerWidth - this.$element.clientWidth
        )
        this.position.y = clamp(
            this.position.y, 0,
            this.$window.innerHeight - this.$element.clientHeight
             - 50 // toolbar
        )

        // update rendered position
        this.$element.style.left = this.position.x + "px"
        this.$element.style.top = this.position.y + "px"
    }

    /**
     * Minimize the window
     */
    minimize()
    {
        if (this.minimized)
            return

        cssClass(this.$element, "mc-window--minimized", true)

        setTimeout(() => {
            this.$element.style.display = "none"
            
            this.minimized = true
        }, 500)
    }

    /**
     * Maximize the window
     */
    maximize()
    {
        if (!this.minimized)
            return

        this.$element.style.display = "block"

        cssClass(this.$element, "mc-window--minimized", false)

        this.minimized = false
    }

    /**
     * Enables window transparency
     */
    enableTransparency()
    {
        if (this.transparent)
            return

        this.transparent = true

        cssClass(this.$element, "mc-window--transparent", true)
    }

    /**
     * Disables window transparency
     */
    disableTransparency()
    {
        if (!this.transparent)
            return

        this.transparent = false

        cssClass(this.$element, "mc-window--transparent", false)
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    $onHandleMouseDown(e)
    {
        this.dragged = true

        this.dragStartMousePosition = {x: e.clientX, y: e.clientY}
        this.dragStartWindowPosition = {x: this.position.x, y: this.position.y}
    }

    $onWindowMouseMove(e)
    {
        if (!this.dragged)
            return

        e.preventDefault()

        this.position.x = this.dragStartWindowPosition.x +
            e.clientX - this.dragStartMousePosition.x

        this.position.y = this.dragStartWindowPosition.y +
            e.clientY - this.dragStartMousePosition.y

        this.updateDisplay()
    }

    $onWindowMouseUp(e)
    {
        if (!this.dragged)
            return

        e.preventDefault()

        this.dragged = false
    }

    $onWindowResize()
    {
        this.updateDisplay()
    }

    $onTransparencyToggleClick()
    {
        if (this.transparent)
            this.disableTransparency()
        else
            this.enableTransparency()
    }
}

module.exports = Window