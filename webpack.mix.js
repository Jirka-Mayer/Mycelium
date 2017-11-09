let mix = require("laravel-mix")

mix.js("assets/js/mycelium.js", "dist/mycelium.js")
mix.stylus("assets/stylus/mycelium.styl", "dist/mycelium.css")

// Debug - copy assets for testing
mix.copy("dist/mycelium.js", "../Kube/public/js/vendor/mycelium/mycelium.js")
mix.copy("dist/mycelium.css", "../Kube/public/css/vendor/mycelium/mycelium.css")

// mix settings
mix.setPublicPath(".")