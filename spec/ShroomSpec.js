const createApplication = require("./support/createApplication.js")

describe("Shroom", () => {

    let window, shroom

    beforeEach(() => {
        window = createApplication({
            data: {
                "content": "Content ipsum."
            }
        })

        shroom = window.mycelium.shroom
    })

    it("loads information about itself", () => {
        expect(shroom.id).toBe("my-shroom")
        expect(shroom.cluster).toBeNull()
    })

    it("provides data", () => {
        expect(shroom.getData("content")).toBe("Content ipsum.")
    })

    it("captures data changes", () => {
        expect(shroom.saved).toBe(true)

        shroom.setData("content", "Foo")

        expect(shroom.getData("content")).toBe("Foo")
        expect(shroom.saved).toBe(false)
    })

})