const Shroom = require("../assets/js/Shroom.js")
const {JSDOM} = require("jsdom")

describe("Shroom", () => {
    let dom, shroom

    beforeEach(() => {
        dom = new JSDOM()

        shroom = new Shroom(
            dom.window,
            dom.window.document,
            {
                "id": "index",
                "slug": "index",
                "cluster": null,
                "title": "index",
                "data": {
                    "content": "Content ipsum."
                }
            }
        )
        
    })

    it("loads information about itself", () => {
        expect(shroom.id).toBe("index")
        expect(shroom.cluster).toBeNull()
    })

    it("provides data", () => {
        expect(shroom.getData("content")).toBe("Content ipsum.")
    })

    it("captures data changes", () => {
        expect(shroom.$saved).toBe(true)

        shroom.setData("content", "Foo")

        expect(shroom.getData("content")).toBe("Foo")
        expect(shroom.$saved).toBe(false)
    })

})