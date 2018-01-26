module.exports = function (Quill) {

return [
    ["h1", require("./matchers/HeaderMatcher.js")(Quill)],
    ["h2", require("./matchers/HeaderMatcher.js")(Quill)],
    ["h3", require("./matchers/HeaderMatcher.js")(Quill)],
    ["h4", require("./matchers/HeaderMatcher.js")(Quill)],
    ["h5", require("./matchers/HeaderMatcher.js")(Quill)],
    ["h6", require("./matchers/HeaderMatcher.js")(Quill)],

    ["iframe", require("./matchers/IframeMatcher.js")(Quill)],
    ["table", require("./matchers/TableMatcher.js")(Quill)],
]

}