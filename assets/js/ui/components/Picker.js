const EventBus = require("../../EventBus.js")

/*
    Events:
    "pick" - when the pick() method is succesfully called
    "user-pick" - when the user picks an item by clicking an option
    "expand" - when the picker is expanded
 */

class Picker
{
    constructor(document, element, options)
    {
        /**
         * Document reference
         */
        this.document = document

        /**
         * Root element
         */
        this.element = element

        /**
         * Is the picker expanded?
         */
        this.expanded = false

        /**
         * Options to pick from
         *
         * An array of objects: { key: string, label: string }
         */
        this.options = options

        /**
         * The picked option
         */
        this.pickedOption = null

        /**
         * Event bus
         */
        this.bus = new EventBus();

        // create all necessary elements
        this.createDOM()

        // pick the first item in the list
        this.pick(this.options[0].key)

        // bind event handlers
        this.label.addEventListener(
            "click", this.onLabelClick.bind(this)
        )
        this.element.addEventListener(
            "mouseleave", this.onPickerMouseLeave.bind(this)
        )
        this.optionsElement.addEventListener(
            "click", this.onOptionsClick.bind(this)
        )
    }

    /**
     * Creates all necessary html elements
     */
    createDOM()
    {
        this.element.className += " mc-picker"
        this.element.innerHTML = require("./Picker.html")
        
        this.label = this.element.querySelector(".mc-picker__label")
        this.optionsElement = this.element.querySelector(".mc-picker__options")

        for (let i = 0; i < this.options.length; i++)
        {
            let option = this.document.createElement("div")
            option.innerHTML = this.options[i].label
            option.setAttribute("mc-picker-key", this.options[i].key)
            this.optionsElement.appendChild(option)
        }
    }

    /**
     * Collapse the picker
     */
    collapse()
    {
        this.expanded = false
        this.optionsElement.style.display = "none"
    }

    /**
     * Expand the picker
     */
    expand()
    {
        this.expanded = true
        this.optionsElement.style.display = "block"

        this.bus.fire("expand")
    }

    /**
     * Pick an option
     */
    pick(optionKey)
    {
        for (let i = 0; i < this.options.length; i++)
        {
            if (this.options[i].key == optionKey)
            {
                this.pickedOption = this.options[i]
                this.label.setAttribute("data-label", this.options[i].label)

                this.bus.fire("pick", this.options[i].key)
                break
            }
        }
    }

    /**
     * Register an event listener
     */
    on(event, listener)
    {
        this.bus.on(event, listener)
    }

    ////////////////////
    // Event handlers //
    ////////////////////

    onLabelClick(e)
    {
        if (this.expanded)
            this.collapse()
        else
            this.expand()
    }

    onPickerMouseLeave()
    {
        this.collapse()
    }

    onOptionsClick(e)
    {
        let key = e.target.getAttribute("mc-picker-key")

        if (key === null)
            return

        this.pick(key)
        this.collapse()

        this.bus.fire("user-pick", key)
    }
}

module.exports = Picker