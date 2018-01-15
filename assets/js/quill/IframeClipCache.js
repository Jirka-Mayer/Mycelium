/**
 * Chache for iframe blot clipboard functioning
 */
class IframeClipCache
{
    static generateId()
    {
        return Math.random().toString(36).substring(7)
    }

    static setValue(id, value)
    {
        IframeClipCache.cache[id] = value
    }

    static getValue(id)
    {
        if (IframeClipCache.cache[id] === undefined)
            return null

        return IframeClipCache.cache[id]
    }
}

IframeClipCache.cache = {}

module.exports = IframeClipCache