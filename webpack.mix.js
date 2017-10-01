let mix = require("laravel-mix")

mix.js("assets/js/mycelium.js", "dist/mycelium.js")

// Debug - copy assets for testing
mix.copy("dist/mycelium.js", "../MyceliumUsecase/public/js/vendor/mycelium/mycelium.js")

// mix settings
mix.setPublicPath(".")