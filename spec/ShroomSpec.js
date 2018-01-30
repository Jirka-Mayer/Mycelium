const createApplication = require("./support/createApplication.js")
const axios = require("axios")
const moxios = require("moxios")

describe("Shroom", () => {

    let window, shroom

    beforeEach(() => {
        moxios.install(axios)

        window = createApplication({
            data: {
                "content": "Content ipsum."
            }
        })

        shroom = window.mycelium.shroom
    })

    afterEach(() => {
        moxios.uninstall(axios)
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

    it("saves changes", (done) => {
        shroom.setData("content", "Foo")
        expect(shroom.saved).toBe(false)
        
        shroom.save()
            .then(() => {
                expect(shroom.saved).toBe(true)
                expect(shroom.saving).toBe(false)
                done()
            })

        expect(shroom.saved).toBe(true)
        expect(shroom.saving).toBe(true)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(JSON.parse(request.config.data)).toEqual({
                data: {
                    "content": "Foo"
                }
            })

            request.respondWith({
                status: 200,
                response: {
                    success: true
                }
            })
        })
    })

})