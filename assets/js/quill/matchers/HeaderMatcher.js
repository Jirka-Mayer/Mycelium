module.exports = function (Quill) {

/**
 * Finds the parent text pad element
 */
function getParentTextPad(element)
{
    // find parent widet
    let el = element
    let padElement = null

    while (el.parentElement)
    {
        if (el.getAttribute("mycelium-text-pad") === "here")
        {
            padElement = el
            break
        }

        el = el.parentElement
    }

    // unable to find
    if (!padElement)
        return null

    return padElement.textPad
}

function HeaderMatcher(element, delta)
{
    let textPad = getParentTextPad(element)
    let headers = null

    if (textPad === null)
        headers = {offset: 0, count: 6}
    else
        headers = textPad.options.headers

    let min = headers ? headers.offset + 1 : 1
    let max = headers ? headers.offset + headers.count : 6

    // max is 6 anyway, regardless of any offset
    if (max > 6)
        max = 6

    let level = parseInt(element.tagName[1])
    let text = element.innerText

    // clamp level
    if (level < min)
        level = min
    if (level > max)
        level = max

    return {
        ops: [
            {
                insert: text
            },
            {
                insert: "\n",
                attributes: {
                    header: level
                }
            }
        ]
    }
}

return HeaderMatcher

}