module.exports = function (Quill, mycelium) {

function ImageMatcher(element, delta)
{
    let img = element.querySelector("img")
    let figcaption = element.querySelector("figcaption")

    let url = img.src
    let spore = img.getAttribute("mycelium-spore")
    let title = figcaption.innerText

    // return the full delta
    return {
        ops: [
            {
                insert: {
                    image: {
                        url: url,
                        "@spore": spore,
                        title: title
                    }
                }
            }
        ]
    }
}

return ImageMatcher

}