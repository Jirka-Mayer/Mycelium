const axios = require("axios")
const TextWidget = require("./widgets/Text.js")
const RichTextWidget = require("./widgets/RichText.js")

const SAVING_TIMEOUT = 2000

class Shroom
{
    constructor(window, document, serializedData)
    {
        this.$window = window
        this.$document = document

        this.$loadSerializedData(serializedData)

        this.$savingTimerId = null
        this.$saving = false
        this.$saved = true

        this.$widgets = []
        this.$createWidgetInstances()
    }

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

    $createWidgetInstances()
    {
        this.$widgets = this.$widgets.concat(
            TextWidget.createInstances(
                this.$window, this.$document, this
            )
        )

        this.$widgets = this.$widgets.concat(
            RichTextWidget.createInstances(
                this.$window, this.$document, this
            )
        )
    }

    setData(key, value)
    {
        this.data[key] = value

        this.$scheduleSave()
    }

    getData(key, defaultValue)
    {
        if (defaultValue === undefined)
            defaultValue = null

        let data = this.data[key]

        if (data === undefined)
            return defaultValue

        return data
    }

    $scheduleSave()
    {
        this.$saved = false

        if (this.$saving)
            return

        if (this.$savingTimerId !== null)
            clearTimeout(this.$savingTimerId)

        this.$savingTimerId = setTimeout(
            this.save.bind(this),
            SAVING_TIMEOUT
        )
    }

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

    $afterSave()
    {
        // change was made during saving
        if (!this.$saved)
            this.$scheduleSave()
    }
}

module.exports = Shroom