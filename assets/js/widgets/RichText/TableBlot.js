const Quill = require("./quill.js")
const IframeBlot = require("./IframeBlot.js")

class TableBlot extends IframeBlot
{
    static create(value)
    {
        return super.create(value, TableBlot.createIframe)
    }

    static createIframe(node, value)
    {
        // set iframe body class
        node.contentDocument.body.className = "mc-ql-table-blot__content"

        // setup iframe DOM
        node.contentDiv.innerHTML = `
            <table>
                <tr>
                    <td>hello</td>
                    <td>world</td>
                </tr>
                <tr>
                    <td>how RU</td>
                    <td>doin</td>
                </tr>
                <tr>
                    <td>type here:</td>
                    <td><input type="text"></td>
                </tr>
            </table>
        `
    }

    static value(node)
    {   
        return {

            // array of arrays (rows)
            "table": []
        }
    }
}

TableBlot.blotName = "table"
TableBlot.className = "mc-ql-table-blot"

Quill.register(TableBlot)
