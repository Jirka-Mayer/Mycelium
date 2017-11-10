const axios = require("axios")
const TextWidget = require("./widgets/Text.js")
const RichTextWidget = require("./widgets/RichText.js")

// delay between a change and save call
const AUTOSAVE_TIMEOUT = 2000

/**
 * Class representing a shroom with all of it's data and widgets
 *
 * Handles editing and saving, interacts with the UI
 */
class Shroom
{
    /**
     * Creates new Shroom instance
     * @param {Window} window DOM widnow object
     * @param {Document} document DOM document object
     * @param {Object} serializedData JSON-serialized php Shroom class
     */
    constructor(window, document, mycelium, serializedData)
    {
        // mycelium namespace reference
        this.$mycelium = mycelium

        /**
         * DOM access
         */
        this.$window = window
        this.$document = document

        // load shroom from serialized JSON data
        this.$loadSerializedData(serializedData)

        /**
         * Saving stuff
         */
        this.$autosaveEnabled = false // automatic saving
        this.$savingTimerId = null // autosave timer
        this.$saving = false // save request pending
        this.$saved = true // no changes made since last save

        /**
         * Widgets
         */
        this.$widgets = []

        // create instances of all widgets
        this.$createWidgetInstances()

        // initializeAutosave() has to be called externally
        // depending on the usecase (e.g. you don't want
        // autosave when testing)
    }

    /**
     * Loads info from JSON-serialized php Shroom class
     *
     * The argument is an object, not string
     */
    $loadSerializedData(data)
    {
        this.id = data.id
        this.slug = data.slug
        this.cluster = data.cluster

        this.title = data.title

        this.data = data.data

        // if the provided data is empty, it's serialized
        // in php as [] instead of {}
        if (this.data instanceof Array)
            this.data = {}
    }

    /////////////
    // Widgets //
    /////////////

    /**
     * Instantiates controllers for all widgets
     * and handles their registration
     */
    $createWidgetInstances()
    {
        this.$widgets = this.$widgets.concat(
            TextWidget.createInstances(
                this.$window, this.$document, this
            )
        )

        this.$widgets = this.$widgets.concat(
            RichTextWidget.createInstances(
                this.$window, this.$document, this.$mycelium, this
            )
        )
    }

    //////////
    // Data //
    //////////

    /**
     * Sets new value to a data key
     */
    setData(key, value)
    {
        this.data[key] = value

        this.$onDataChange()
    }

    /**
     * Returns data under a key
     */
    getData(key, defaultValue)
    {
        if (defaultValue === undefined)
            defaultValue = null

        let data = this.data[key]

        if (data === undefined)
            return defaultValue

        return data
    }

    ////////////
    // Saving //
    ////////////

    /**
     * Starts the autosave logic
     */
    initializeAutosave()
    {
        this.$autosaveEnabled = true

        if (!this.$saved)
            this.$scheduleAutosave()
    }

    /**
     * Performs the saving procedure - the HTTP request
     */
    save()
    {
        this.$saving = true
        this.$saved = true

        if (this.$savingTimerId !== null)
        {
            clearTimeout(this.$savingTimerId)
            this.$savingTimerId = null
        }

        axios.post(this.$window.location.href, {
            data: this.data
        })
        .then((response) => {
            console.warn("Shroom saved.")

            this.$saving = false
            this.$afterSave()
        })
    }

    /**
     * Starts or resets the autosave timer
     *
     * Autosave enabled checks have to be made externally
     */
    $scheduleAutosave()
    {
        if (this.$saving)
            return

        if (this.$savingTimerId !== null)
            clearTimeout(this.$savingTimerId)

        this.$savingTimerId = setTimeout(
            this.save.bind(this),
            AUTOSAVE_TIMEOUT
        )
    }

    ////////////
    // Events //
    ////////////

    /**
     * When some data changes (in the data object)
     */
    $onDataChange()
    {
        this.$saved = false

        if (this.$autosaveEnabled)
            this.$scheduleAutosave()
    }

    /**
     * Called after a successful save() execution
     */
    $afterSave()
    {
        // changes were made during saving
        if (!this.$saved)
            this.$scheduleAutosave()
    }
}

module.exports = Shroom