class Picker
{
    constructor(element)
    {
        this.$element = element

        /**
         * Is the picker expanded?
         */
        this.expanded = false

        this.$createDOM()

        // bind event handlers
        this.$label.addEventListener(
            "click", this.$onLabelClick.bind(this)
        )
        this.$element.addEventListener(
            "mouseleave", this.$onPickerMouseLeave.bind(this)
        )
        this.$options.addEventListener(
            "click", this.$onOptionsClick.bind(this)
        )
    }

    $createDOM()
    {
        this.$element.className += "mc-picker"
        this.$element.innerHTML = require("./Picker.html")
        
        this.$label = this.$element.querySelector(".mc-picker__label")
        this.$options = this.$element.querySelector(".mc-picker__options")
    }

    /**
     * Collapse the picker
     */
    collapse()
    {
        this.expanded = false
        this.$options.style.display = "none"
    }

    /**
     * Expand the picker
     */
    expand()
    {
        this.expanded = true
        this.$options.style.display = "block"
    }

    /**
     * Pick an option
     */
    pick(option)
    {

    }

    ////////////////////
    // Event handlers //
    ////////////////////

    $onLabelClick()
    {
        if (this.expanded)
            this.collapse()
        else
            this.expand()
    }

    $onPickerMouseLeave()
    {
        this.collapse()
    }

    $onOptionsClick(e)
    {
        console.log(e.target)

        this.collapse()
    }
}

module.exports = Picker