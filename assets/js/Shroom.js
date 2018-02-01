const axios = require("axios")
const TextWidget = require("./widgets/Text.js")
const RichTextWidget = require("./widgets/RichText.js")
const ImageWidget = require("./widgets/Image.js")
const EventBus = require("./EventBus.js")
const SporeUploader = require("./SporeUploader.js")

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
        this.mycelium = mycelium

        /**
         * DOM access
         */
        this.window = window
        this.document = document

        /**
         * Setup event bus
         */
        this.bus = new EventBus()
        this.on = this.bus.on.bind(this.bus)

        // load shroom from serialized JSON data
        this.loadSerializedData(serializedData)

        /**
         * Saving stuff
         */
        this.autosaveEnabled = false // automatic saving
        this.savingTimerId = null // autosave timer
        this.saving = false // save request pending
        this.saved = true // no changes made since last save

        /**
         * Widgets
         */
        this.widgets = []
    }

    /**
     * Loads info from JSON-serialized php Shroom class
     *
     * The argument is an object, not string
     */
    loadSerializedData(data)
    {
        this.id = data.id
        this.slug = data.slug
        this.cluster = data.cluster

        this.title = data.title

        this.data = data.data
        this.spores = data.spores

        this.url = data.url

        // if the provided data is empty, it's serialized
        // in php as [] instead of {}
        if (this.data instanceof Array)
            this.data = {}
    }

    /**
     * This is initialization just like in constructor, but now
     * the shroom instance is bound to the mycelium namespace
     * so the code inside this method can access it
     */
    initialize()
    {
        // create instances of all widgets
        this.createWidgetInstances()

        // initializeAutosave() has to be called externally
        // depending on the usecase (e.g. you don't want
        // autosave when testing)
    }

    /////////////
    // Widgets //
    /////////////

    /**
     * Instantiates controllers for all widgets
     * and handles their registration
     */
    createWidgetInstances()
    {
        this.widgets = this.widgets.concat(
            TextWidget.createInstances(
                this.window, this.document, this
            )
        )

        this.widgets = this.widgets.concat(
            RichTextWidget.createInstances(
                this.window, this.document, this.mycelium, this
            )
        )

        this.widgets = this.widgets.concat(
            ImageWidget.createInstances(
                this.window, this.document, this
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

        this.onDataChange()
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
    // Spores //
    ////////////

    /**
     * User selects a file and it will be uploaded as a new spore
     * Spore handle is returned in the promise
     * @param {string} type Type of the spore handler
     */
    uploadNewSpore(type)
    {
        // open file dialog
        return SporeUploader.fileDialog(this.document)

        // upload the spore
        .then(file => SporeUploader.upload(file, type))

        // register the spore
        .then((spore) => {
            return new Promise((resolve, reject) => {
                this.spores[spore.handle] = spore
                resolve(spore)
            })
        })
    }

    ////////////
    // Saving //
    ////////////

    /**
     * Starts the autosave logic
     */
    initializeAutosave()
    {
        this.autosaveEnabled = true

        if (!this.saved)
            this.scheduleAutosave()
    }

    /**
     * Performs the saving procedure - the HTTP request
     */
    save()
    {
        this.saving = true
        this.saved = true

        this.bus.fire("saving")

        if (this.savingTimerId !== null)
        {
            clearTimeout(this.savingTimerId)
            this.savingTimerId = null
        }

        let promise = axios.post(this.window.location.href, {
            data: this.data
        })
        .then((response) => {
            this.saving = false
            this.afterSave()
        })

        // return the promise in case someone would
        // want to wait for the save end
        return promise
    }

    /**
     * Starts or resets the autosave timer
     *
     * Autosave enabled checks have to be made externally
     */
    scheduleAutosave()
    {
        if (this.saving)
            return

        if (this.savingTimerId !== null)
            clearTimeout(this.savingTimerId)

        this.savingTimerId = setTimeout(
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
    onDataChange()
    {
        this.saved = false

        this.bus.fire("unsaved")

        if (this.autosaveEnabled)
            this.scheduleAutosave()
    }

    /**
     * Called after a successful save() execution
     */
    afterSave()
    {
        this.bus.fire("saved")

        // changes were made during saving
        if (!this.saved)
            this.scheduleAutosave()
    }
}

module.exports = Shroom