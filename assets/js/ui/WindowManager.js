/**
 * Prefix in the local storage key name for a window dream
 */
const DREAM_PREFIX = "mycelium-window-dream:"
const Z_INDEX_OFFSET = 1000

class WindowManager
{
    constructor(window, document)
    {
        // browser window reference
        this.window = window

        /**
         * List of all instantiated windows
         * @type {Array}
         */
        this.windows = []

        /**
         * Container for all windows
         * Set on DOM creation
         */
        this.element = null

        this.createDOM(document)

        this.window.addEventListener(
            "beforeunload", this.onBrowserWindowUnload.bind(this)
        )
    }

    createDOM(document)
    {
        let element = document.createElement("div")
        element.className = "mc-window-manager"

        document.body.appendChild(element)

        this.element = element
    }

    /**
     * Registers a new window
     */
    registerWindow(win, options)
    {
        this.windows.push(win)
        this.element.appendChild(win.element)

        win.onRegistration(this, options)

        // wakeup if needed
        if (win.persistent)
            win._wakeup(this.getWindowDream(win)) // call private wakeup
    }

    /**
     * Forget a window
     */
    forgetWindow(win)
    {
        this.element.removeChild(win.element)
        
        let i = this.windows.indexOf(win)
        if (i >= 0)
            this.windows.splice(i, 1)
    }

    /**
     * When the browser is unloading
     */
    onBrowserWindowUnload()
    {
        // save all persistent windows
        for (let i = 0; i < this.windows.length; i++)
        {
            if (this.windows[i].persistent)
            {
                this.setWindowDream(
                    this.windows[i],
                    this.windows[i]._sleep() // call private sleep
                )
            }
        }
    }

    /**
     * Focus a window
     */
    focus(win)
    {
        let i = this.windows.indexOf(win)

        if (i == -1)
            return

        if (i == this.windows.length - 1)
            return

        this.windows.splice(i, 1)
        this.windows.push(win)

        this.updateZIndices()
    }

    /**
     * Updates Z-indices of all windows
     */
    updateZIndices()
    {
        for (let i = 0; i < this.windows.length; i++)
        {
            this.windows[i].element.style.zIndex = Z_INDEX_OFFSET + i
        }
    }

    /**
     * Returns dream for a given window
     */
    getWindowDream(win)
    {
        // check name
        if (!win.name)
        {
            console.error("Window is persistent, but has no name.")
            return null
        }

        // check storage existance
        if (!this.window.localStorage)
            return null

        // check storage access
        if (!(this.window.localStorage instanceof this.window.Storage))
            return null

        // dream key
        let key = DREAM_PREFIX + win.name

        // check window existence
        if (!(key in this.window.localStorage))
            return null

        // try to parse the string
        let dream
        try
        {
            dream = JSON.parse(this.window.localStorage[key])
        }
        catch (e)
        {
            console.error("Error while parsing dream: " + key, e)
            return null
        }

        return dream
    }

    /**
     * Sets a dream for a given window
     */
    setWindowDream(win, dream)
    {
        // check name
        if (!win.name)
            return // error already printed on load

        // check storage existance
        if (!this.window.localStorage)
            return null

        // check storage access
        if (!(this.window.localStorage instanceof this.window.Storage))
            return

        // dream key
        let key = DREAM_PREFIX + win.name

        // default
        if (dream === undefined)
            dream = null

        // try to parse the string
        try
        {
            let text = JSON.stringify(dream)
            this.window.localStorage[key] = text
        }
        catch (e)
        {
            console.error("Error while saving dream: " + key, e)
        }
    }
}

module.exports = WindowManager