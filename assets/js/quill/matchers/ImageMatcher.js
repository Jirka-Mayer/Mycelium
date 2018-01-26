module.exports = function (Quill) {

function ImageMatcher(element, delta)
{
    let img = element.querySelector("img")
    let figcaption = element.querySelector("figcaption")

    let url = img.src
    let title = figcaption.innerText

    // return the full delta
    return {
        ops: [
            {
                insert: {
                    image: {
                        url: url,
                        title: title
                    }
                }
            }
        ]
    }
}

return ImageMatcher

}