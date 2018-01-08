const clamp = require("../utils/clamp.js")
const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")
const defaultOptions = require("../utils/defaultOptions.js")

/**
 * How long it takes for a window to minimize
 */
const MINIMIZATION_DELAY = 500

class Window
{
    constructor(window, document, mycelium)
    {
        this.window = window
        this.document = document
        this.mycelium = mycelium

        /**
         * Reference to the window manager set on registration
         */
        this.windowManager = null

        /**
         * Window position
         */
        this.position = {x: 20, y: 20}

        /**
         * If the window is minimized
         */
        this.minimized = false

        /**
         * Minimize only flag
         */
        this.minimizeOnly = false

        /**
         * Persistency flag
         */
        this.persistent = false

        /**
         * Window name
         */
        this.name = null

        /**
         * Is the window being dragged
         */
        this.dragged = false

        // dragging properties
        this.dragStartMousePosition = null
        this.dragStartWindowPosition = null

        /**
         * Private refs, user may want to use such name for himself
         */
        this._refs = {}

        // create html stuff
        this._createDOM()

        this.updateDisplay()

        this.handle.addEventListener(
            "mousedown", this.onHandleMouseDown.bind(this)
        )

        this.window.addEventListener(
            "mousemove", this.onWindowMouseMove.bind(this)
        )

        this.window.addEventListener(
            "mouseup", this.onWindowMouseUp.bind(this)
        )

        this.window.addEventListener(
            "resize", this.onBrowserWindowResize.bind(this)
        )

        this._refs.minimize.addEventListener(
            "click", this.minimize.bind(this)
        )

        this._refs.close.addEventListener(
            "click", this.close.bind(this)
        )
    }

    /**
     * Private dom creation (this method name may be used by the user)
     */
    _createDOM()
    {
        let element = this.document.createElement("div")
        element.className = "mc-window"
        element.innerHTML = require("./Window.html")

        this.element = element
        this.handle = element.querySelector(".mc-window__handle")
        this.content = element.querySelector(".mc-window__content")

        this._refs = getRefs(this.element)
    }

    /**
     * Called by the window manager, when the window is being registered
     */
    onRegistration(windowManager, options)
    {
        this.windowManager = windowManager

        options = defaultOptions(options, {
            minimizeOnly: false,
            persistent: false,
            name: null
        })

        this.minimizeOnly = options.minimizeOnly
        this.persistent = options.persistent
        this.name = options.name

        // persistent windows are automatically minimizeOnly
        if (this.persistent)
            this.minimizeOnly = true

        // hide minimization button if minimize only set
        // (closing button takes the action)
        if (this.minimizeOnly)
            this._refs.minimize.style.display = "none"
    }

    /**
     * Updates displayed position and size
     */
    updateDisplay()
    {
        // clip window position
        this.position.x = clamp(
            this.position.x, 0,
            this.window.innerWidth - this.element.clientWidth
        )
        this.position.y = clamp(
            this.position.y, 0,
            this.window.innerHeight - this.element.clientHeight
             - 50 // toolbar
        )

        // update rendered position
        this.element.style.left = this.position.x + "px"
        this.element.style.top = this.position.y + "px"
    }

    /**
     * Minimize the window
     */
    minimize()
    {
        if (this.minimized)
            return

        cssClass(this.element, "mc-window--minimized", true)

        setTimeout(() => {
            this.element.style.display = "none"
            
            this.minimized = true
        }, MINIMIZATION_DELAY)
    }

    /**
     * Maximize the window
     */
    maximize()
    {
        if (!this.minimized)
            return

        this.element.style.display = "block"

        setTimeout(() => {
            cssClass(this.element, "mc-window--minimized", false)
        }, 0)

        this.minimized = false
    }

    /**
     * Closes the window
     */
    close()
    {
        // if minimize only, don't close
        if (this.minimizeOnly)
        {
            this.minimize()
            return
        }

        // minimize first
        this.minimize()

        // forget
        setTimeout(() => {
            this.windowManager.forgetWindow(this)
            
            // signal, that it has been forgotten
            this.windowManager = null
        }, MINIMIZATION_DELAY)
    }

    /**
     * Private sleep implementation
     * Handles the basics
     */
    _sleep()
    {
        return {
            position: this.position,
            minimized: this.minimized,

            userData: this.sleep()
        }
    }

    /**
     * Save state to a dream
     */
    sleep()
    {
        return null
    }

    /**
     * Private sleep implementation
     * Handles the basics
     */
    _wakeup(dream)
    {
        if (!(dream instanceof Object))
            return

        if ("position" in dream)
            this.position = dream.position

        if ("minimized" in dream)
        {
            if (dream.minimized)
                this.minimize()
            else
                this.maximize()
        }

        this.updateDisplay()

        // call user-defined wakeup
        this.wakeup(dream.userData)
    }

    /**
     * Recover state from a dream
     */
    wakeup(dream)
    {
        // nothing
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    onHandleMouseDown(e)
    {
        this.dragged = true

        this.dragStartMousePosition = {x: e.clientX, y: e.clientY}
        this.dragStartWindowPosition = {x: this.position.x, y: this.position.y}
    }

    onWindowMouseMove(e)
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

    onWindowMouseUp(e)
    {
        if (!this.dragged)
            return

        e.preventDefault()

        this.dragged = false
    }

    onBrowserWindowResize()
    {
        this.updateDisplay()
    }
}

module.exports = Window