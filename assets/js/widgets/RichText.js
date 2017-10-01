class RichText
{
    static createInstances(window, document, shroom)
    {
        let elements = document.querySelectorAll(
            '[mycelium-widget="rich-text"]'
        )
        let instances = []

        for (let i = 0; i < elements.length; i++)
            instances.push(new RichText(
                window, document, elements[i], shroom
            ))

        return instances
    }

    constructor(window, document, element, shroom)
    {
        this.$window = window
        this.$document = document
        
        this.$el = element

        this.shroom = shroom
        this.key = this.$el.getAttribute("mycelium-key")
        
        if (!this.key)
            throw new Error("RichText widget missing 'key' attribute.")

        this.defaultValue = this.$el.getAttribute("mycelium-default")

        this.$createQuillInstance()
    }

    $createQuillInstance()
    {
        this.$quill = new Quill(this.$el, {
            theme: "snow",
            modules: {
                toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote"],

                    [{"list": "ordered"}, {"list": "bullet"}],
                    [{"indent": "-1"}, {"indent": "+1"}],

                    [{"header": [1, 2, 3, 4, 5, 6, false]}],
                    [{"align": []}],

                    ["link", "image"],
                    ["clean"]
                ]
            }
        })

        this.$loadQuillContents()

        this.$quill.on("text-change",
            this.$onTextChange.bind(this)
        )
    }

    $loadQuillContents()
    {
        let data = this.shroom.getData(
            this.key,
            this.defaultValue
        )

        try
        {
            if (typeof(data) === "object")
                this.$quill.setContents(data)
            else if (typeof(data) === "string")
                this.$quill.setText(data)
            else
                this.$quill.setText(JSON.stringify(data, null, 2))
        }
        catch (e)
        {
            console.error(e)

            this.$quill.setText("")
        }
    }

    $onTextChange(delta, oldContents, source)
    {
        this.shroom.setData(
            this.key,
            this.$quill.getContents()
        )

        // debug, save rendered HTML
        this.shroom.setData(
            this.key + "@rendered",
            this.$quill.root.innerHTML
        )
    }
}

module.exports = RichText