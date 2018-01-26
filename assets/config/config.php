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
    ]
];