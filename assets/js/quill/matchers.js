module.exports = function (Quill) {

return [
    ["iframe", require("./matchers/IframeMatcher.js")(Quill)],
    ["table", require("./matchers/TableMatcher.js")(Quill)]
]

}