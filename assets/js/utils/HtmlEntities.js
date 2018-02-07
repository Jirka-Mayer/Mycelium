/**
 * Encodes and decodes HTML entitites
 */
class HtmlEntities
{
    /**
     * Encodes "<", ">" and "&" (so far)
     */
    static encode(str)
    {
        return str.replace(/(\<|\>|\&)/g, function (match, char) {
            if (char === "<")
                return "&lt;"
            else if (char === ">")
                return "&gt;"
            else if (char === "&")
                return "&amp;"

            return "?"
        })
    }

    /**
     * Decodes, but only from hash character ids
     */
    static decode(str)
    {
        return str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec)
        })
    }
}

module.exports = HtmlEntities