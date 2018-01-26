module.exports = function (Quill) {

/**
 * A rather awful way to convert html to delta, but works
 */
function htmlToDelta(document, html)
{
    let element = document.createElement("div")

    element.innerHTML = html

    let quill = new Quill(element, {
        formats: null, // all
        modules: {
            clipboard: {
                matchers: require("../matchers.js")(Quill),
                matchVisual: false
            }
        }
    })

    return quill.getContents()
}

function TableMatcher(element, delta)
{
    // obtain any document instance
    // (for element creation later on)
    if (!element.ownerDocument)
        console.error("ownerDocument property not supported")

    const documentInstance = element.ownerDocument

    // row deltas and row elements
    let rows = []
    let rowElements = element.querySelectorAll("tr")

    // for all rows
    for (let i = 0; i < rowElements.length; i++)
    {
        let row = []
        let cellElements = rowElements[i].querySelectorAll("td, th")

        // for all cells
        for (let j = 0; j < cellElements.length; j++)
            row.push(htmlToDelta(documentInstance, cellElements[j].innerHTML))

        rows.push(row)
    }

    // return the full delta
    return {
        ops: [
            {
                insert: {
                    table: {
                        rows: rows
                    }
                }
            }
        ]
    }
}

return TableMatcher

}