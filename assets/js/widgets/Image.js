const cssClass = require("../utils/cssClass.js")

class Image
{
    static createInstances(window, document, shroom)
    {
        let elements = document.querySelectorAll(
            '[mycelium-widget="image"]'
        )
        let instances = []

        for (let i = 0; i < elements.length; i++)
            instances.push(new Image(
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
        this.image = this.element.querySelector("img")

        this.editButton.addEventListener("click", this.onEditButtonClick.bind(this))
        this.image.addEventListener("load", this.updateEmptiness.bind(this))
        this.image.addEventListener("error", this.updateEmptiness.bind(this))

        this.updateEmptiness()
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
        let data = this.shroom.getData(this.key)
        
        if (!(data instanceof Object))
            return

        this.image.src = this.shroom.spores[data["@spore"]].url;
    }

    /**
     * When the edit button is clicked
     */
    onEditButtonClick()
    {
        this.shroom.uploadNewSpore("image", "image/jpeg")
        .then((spore) => {
            this.changeSpore(spore.handle)
        })
    }

    /**
     * Change displayed spore
     */
    changeSpore(sporeHandle)
    {
        this.shroom.setData(this.key, {
            "@type": "mycelium::image",
            "@spore": sporeHandle
        })

        this.updateImageSrc()
    }
}

module.exports = Image