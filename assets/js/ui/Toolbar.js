class Toolbar
{
    constructor(document, mycelium)
    {
        // reference to the mycelium namespace
        this.mycelium = mycelium

        /**
         * References to elements
         */
        this.$refs = {}

        this.$createDOM(document)
    }

    /**
     * Creates all elements and appends them to the document
     */
    $createDOM(document)
    {
        // toolbar markup
        const html = `
            <div class="mc-toolbar__panel">
                <button class="mc-toolbar__button mc-toggle-edit">Edit</button>
                <button class="mc-toolbar__button">Save</button>
            </div>
            <div class="mc-toolbar__panel">
                <button class="mc-toolbar__button">B</button>
                <button class="mc-toolbar__button">I</button>
            </div>
            <div class="mc-toolbar__panel">
                <button class="mc-toolbar__button mc-logout">Logout</button>
            </div>
        `

        // create toolbar element
        let element = document.createElement("div")
        element.innerHTML = html
        element.className = "mc-toolbar"

        // create spacer
        let spacer = document.createElement("div")
        spacer.style.height = "50px"

        // add elemnts to the page
        document.body.appendChild(element)
        document.body.appendChild(spacer)

        this.$element = element
        this.$spacer = spacer

        // get element references
        this.$refs.logout = this.$element.querySelector(".mc-logout")
        this.$refs.toggleEdit = this.$element.querySelector(".mc-toggle-edit")

        // register event listeners
        this.$refs.logout.addEventListener(
            "click", this.$onLogoutClick.bind(this)
        )
        this.$refs.toggleEdit.addEventListener(
            "click", this.$onToggleEditClick.bind(this)
        )

        this.$initializeElements()
    }

    /**
     * Initializes individual elements based on the mycelium state
     */
    $initializeElements()
    {
        this.$initializeLogoutButton()
    }

    /**
     * Initializes logout button
     */
    $initializeLogoutButton()
    {
        if (!this.mycelium.config.auth.enabled)
            this.$refs.logout.remove()
    }

    /////////////////////
    // Event listeners //
    /////////////////////

    $onLogoutClick()
    {
        window.location.href = this.mycelium.config.auth.routes.logout
    }

    $onToggleEditClick()
    {
        if (this.mycelium.state.editing)
            window.location.href += "/.."
        else
            window.location.href += "edit"
    }
}

module.exports = Toolbar