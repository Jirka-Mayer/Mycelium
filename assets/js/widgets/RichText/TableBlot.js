const Quill = require("./quill.js")
const IframeBlot = require("./IframeBlot.js")
const IframeObject = require("./IframeObject.js")
const getRefs = require("../../utils/getRefs.js")

class TableObject extends IframeObject
{
    initialize()
    {
        // set iframe body class
        this.contentBody.className = "mc-ql-table-blot__content"

        /**
         * Table element
         * (assigned in createDOM method)
         */
        this.table = null

        this.createDOM()
    }

    createDOM()
    {
        this.contentDiv.innerHTML = `
            <table ref="table">
                <tr>
                    <td>
                        <div class="hook"></div>
                    </td>
                </tr>
                <tr>
                    <td><button ref="addRow">add row</button></td>
                </tr>
            </table>
        `

        let q = new Quill(this.contentDiv.querySelector(".hook"))
    }

    getValue()
    {
        return {
            "rows": []
        }
    }

    bindEventListeners()
    {
        const RichText = require("../RichText.js")

        RichText.bus.on("apply-bold", () => {
            console.log(this.node.contentDocument.activeElement)
            console.log(this.richText)
        })
    }

    freeEventListeners()
    {

    }
}

class TableBlot extends IframeBlot
{
    static create(value)
    {
        return super.create(value, TableObject)
    }

    static createIframe(node, value)
    {
        // set iframe body class
        node.contentDocument.body.className = "mc-ql-table-blot__content"

        TableBlot.createDom(node, value)
    }

    static value(node)
    {
        return super.value(node)
    }
}

TableBlot.blotName = "table"
TableBlot.className = "mc-ql-table-blot"

Quill.register(TableBlot)
