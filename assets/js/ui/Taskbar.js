class Taskbar
{
    constructor(document)
    {
        this.$createDOM(document)
    }

    $createDOM(document)
    {
        const html = `
            <div class="mc-taskbar__panel">
                <button class="mc-taskbar__button mc-edit">Edit</button>
                <button class="mc-taskbar__button">Save</button>
            </div>
            <div class="mc-taskbar__panel">
                <button class="mc-taskbar__button">B</button>
                <button class="mc-taskbar__button">I</button>
            </div>
        `

        let element = document.createElement("div")
        element.innerHTML = html
        element.className = "mc-taskbar"

        let spacer = document.createElement("div")
        spacer.style.height = "50px"

        let editButton = element.querySelector(".mc-edit")
        editButton.addEventListener("click", () => {
            console.log("yay!")
        })

        document.body.appendChild(element)
        document.body.appendChild(spacer)

        this.$element = element
        this.$spacer = spacer
    }
}

module.exports = Taskbar