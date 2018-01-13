let mix = require("laravel-mix")

// cache busting
if (mix.inProduction())
    mix.version()

// mix settings
mix.setPublicPath("dist")

mix.js("assets/js/mycelium.js", "mycelium.js")
mix.stylus("assets/stylus/mycelium.styl", "mycelium.css")

// Copy assets for testing
if (!mix.inProduction())
{
    mix.copy("dist/mycelium.js", "../MyceliumTesting/public/vendor/mycelium/mycelium.js")
    mix.copy("dist/mycelium.css", "../MyceliumTesting/public/vendor/mycelium/mycelium.css")
}
