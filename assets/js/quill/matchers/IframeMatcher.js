module.exports = function (Quill) {

const ClipCache = require("../IframeClipCache.js")

/**
 * Matches any iframe blot - used to enable copy-paste on iframe blots
 */
function IframeMatcher(element, delta)
{
    let id = element.getAttribute("mycelium-clip-cache-id")

    return {
        ops: [
            {
                insert: ClipCache.getValue(id)
            }
        ]
    }
}

return IframeMatcher

}