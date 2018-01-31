<?php

return [

    /**
     * Built-in authentication
     */
    "auth" => [

        "enabled" => false,

        "routes" => [
            "login" => "/login",
            "logout" => "/logout"
        ]
    ],

    /**
     * Rich text properties
     */
    "rich-text" => [

        // globally allowed formats
        "formats" => [
            "bold",
            "italic",
            "link",
            "header",
            "table",
            "image",
        ],

        // formats allowed inside tables
        "table-formats" => [
            "bold",
            "italic",
            "link",
        ],

        // default header settings
        "headers" => [
            "offset" => 1, // "Heading 1" becomes <h2>
            "count" => 2 // heading count
        ],

        // explicit overriding for tables
        "table-headers" => null, // no override, use global settings
    ],

    /**
     * Spore options
     */
    "spores" => [

        /**
         * Image spores
         */
        "image" => [

            // caching widths
            "caches" => [
                // small - thumbnail for example
                240,
                480,

                // "full screen" resolutions
                1280, // 1280x720  - 720p
                1920, // 1920x1080 - 1080p
                2560, // 2560x1440 - 1440p

                // above -> upload size
            ],

            // cache image quality (0 to 100)
            "quality" => 70
        ]
    ]
];