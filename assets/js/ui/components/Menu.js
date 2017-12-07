const EventBus = require("../../EventBus.js")

/*
    Events:
    "click" - when the click method is called
    "user-click" - when the user clicks an item
    "expand" - when the menu is expanded
 */

class Menu
{
    constructor(document, element, label, items)
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
         * Is the menu expanded?
         */
        this.expanded = false

        /**
         * Items to click
         *
         * An array of objects: { key: string, label: string }
         */
        this.items = items

        /**
         * Event bus
         */
        this.bus = new EventBus();

        // create all necessary elements
        this.createDOM()

        // set the label
        this.label.setAttribute("data-label", label)

        // bind event handlers
        this.label.addEventListener(
            "click", this.onLabelClick.bind(this)
        )
        this.element.addEventListener(
            "mouseleave", this.onMenuMouseLeave.bind(this)
        )
        this.itemsElement.addEventListener(
            "click", this.onItemsClick.bind(this)
        )
    }

    /**
     * Creates all necessary html elements
     */
    createDOM(label)
    {
        this.element.className += " mc-menu"
        this.element.innerHTML = require("./Menu.html")
        
        this.label = this.element.querySelector(".mc-menu__label")
        this.itemsElement = this.element.querySelector(".mc-menu__items")

        for (let i = 0; i < this.items.length; i++)
        {
            let item = this.document.createElement("div")
            item.innerHTML = this.items[i].label
            item.setAttribute("mc-menu-key", this.items[i].key)
            this.itemsElement.appendChild(item)
        }
    }

    /**
     * Collapse the menu
     */
    collapse()
    {
        this.expanded = false
        this.itemsElement.style.display = "none"
    }

    /**
     * Expand the menu
     */
    expand()
    {
        this.expanded = true
        this.itemsElement.style.display = "block"

        this.bus.fire("expand")
    }

    /**
     * Click an item
     */
    click(itemKey)
    {
        for (let i = 0; i < this.items.length; i++)
        {
            if (this.items[i].key == itemKey)
            {                
                this.bus.fire("click", this.items[i].key)
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

    onMenuMouseLeave()
    {
        this.collapse()
    }

    onItemsClick(e)
    {
        let key = e.target.getAttribute("mc-menu-key")

        if (key === null)
            return

        this.click(key)
        this.collapse()

        this.bus.fire("user-click", key)
    }
}

module.exports = Menu