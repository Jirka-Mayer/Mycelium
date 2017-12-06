class EventBus
{
    constructor()
    {
        this.listeners = {}
        this.firing = false
    }

    on(event, callback)
    {
        if (this.listeners[event] === undefined)
            this.listeners[event] = []

        // hide some useful properties on a listener
        // (we shouldn't write properties to the callback)
        let listener = function () {
            callback.apply(null, arguments)
        }
        
        listener.ignoreNext = this.firing === event
        listener.callback = callback

        this.listeners[event].push(listener)
    }

    fire(event, arg)
    {
        this.firing = event

        let args = []
        for (let i = 1; i < arguments.length; i++)
            args.push(arguments[i]);

        if (this.listeners[event] === undefined)
            this.listeners[event] = []

        for (let i = 0; i < this.listeners[event].length; i++)
        {
            if (this.listeners[event][i].ignoreNext)
            {
                this.listeners[event][i].ignoreNext = false
                continue
            }

            this.listeners[event][i].apply(null, args)
        }

        this.firing = false
    }

    off(event, callback)
    {
        if (this.listeners[event] === undefined)
            return

        for (let i = 0; i < this.listeners[event].length; i++)
        {
            if (this.listeners[event][i].callback === callback)
            {
                this.listeners[event].splice(i, 1)
                return
            }
        }
    }
}

module.exports = EventBus