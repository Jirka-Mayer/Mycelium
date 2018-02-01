const cssClass = require("../utils/cssClass.js")

class AspectImage
{
    static createInstances(window, document, shroom)
    {
        let elements = document.querySelectorAll(
            '[mycelium-widget="aspect-image"]'
        )
        let instances = []

        for (let i = 0; i < elements.length; i++)
            instances.push(new AspectImage(
                window, document, elements[i], shroom
            ))

        return instances
    }

    constructor(window, document, element, shroom)
    {
        this.window = window
        this.document = document
        
        this.element = element

        this.shroom = shroom
        this.key = this.element.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("Image widget missing 'key' attribute.")

        this.editButton = this.element.querySelector(".edit-button")
        this.sizeButton = this.element.querySelector(".size-button")
        this.image = this.element.querySelector("img")

        this.editButton.addEventListener("click", this.onEditButtonClick.bind(this))
        this.sizeButton.addEventListener("click", this.onSizeButtonClick.bind(this))
        this.image.addEventListener("load", this.updateEmptiness.bind(this))
        this.image.addEventListener("error", this.updateEmptiness.bind(this))

        /**
         * Value
         */
        this.value = {}

        this.loadValue()
        this.updateEmptiness()
    }

    /**
     * Loads the value from shroom
     */
    loadValue()
    {
        this.value = this.shroom.getData(this.key)

        if (!(this.value instanceof Object))
            this.value = {}

        this.value["@type"] = "mycelium::image"
        this.value["size"] = (this.value["size"] === "fit") ? "fit" : "fill"
    }

    /**
     * Set value into the shroom
     */
    saveValue()
    {
        this.shroom.setData(this.key, this.value)
    }

    /**
     * Checks if empty and updates the css class
     */
    updateEmptiness()
    {
        if (this.image.getAttribute("src") === "")
        {
            // no image set
            cssClass(this.element, "no-image", true)
        }
        else if (this.image.naturalWidth == 0)
        {
            // image set, but error while loading
            cssClass(this.element, "no-image", true)
            cssClass(this.element, "url-error", true)
        }
        else
        {
            // all fine
            cssClass(this.element, "no-image", false)
            cssClass(this.element, "url-error", false)
        }
    }

    /**
     * Updates the src tag of the image
     */
    updateImageSrc()
    {
        this.image.src = this.shroom.spores[this.value["@spore"]].url;
    }

    /**
     * When the edit button is clicked
     */
    onEditButtonClick()
    {
        this.shroom.uploadNewSpore("image")
        .then((spore) => {
            this.value["@spore"] = spore.handle
            this.updateImageSrc()
            this.saveValue()
        })
    }

    /**
     * When the size change button is clicked
     */
    onSizeButtonClick()
    {
        this.value["size"] = (this.value["size"] === "fit") ? "fill" : "fit"
        this.saveValue()

        let fitNotFill = this.value["size"] === "fit"
        let aspectRatio = this.element.clientWidth / this.element.clientHeight
        let setWidthNotHeight = fitNotFill ? (aspectRatio < 1) : (aspectRatio > 1)

        if (setWidthNotHeight)
        {
            this.image.style.width = "100%"
            this.image.style.height = "auto"
        }
        else
        {
            this.image.style.width = "auto"
            this.image.style.height = "100%"
        }
    }
}

module.exports = AspectImage