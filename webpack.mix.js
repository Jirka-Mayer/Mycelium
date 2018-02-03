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
    mix.copy("lib/quill.core.1.3.4.js", "tests/App/public/vendor/mycelium/quill.core.1.3.4.js")
    mix.copy("dist/mycelium.js", "tests/App/public/vendor/mycelium/mycelium.js")
    mix.copy("dist/mycelium.css", "tests/App/public/vendor/mycelium/mycelium.css")

    mix.copy("dist/mycelium.js", "../MyceliumTesting/public/vendor/mycelium/mycelium.js")
    mix.copy("dist/mycelium.css", "../MyceliumTesting/public/vendor/mycelium/mycelium.css")
}
