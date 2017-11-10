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

        let listener = function () {
            callback.apply(null, arguments)
        }
        
        listener.ignoreNext = this.firing === event

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
}

module.exports = EventBus