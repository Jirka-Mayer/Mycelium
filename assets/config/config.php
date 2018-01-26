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
        ],

        // formats allowed inside tables
        "table-formats" => [
            "bold",
            "italic",
            "link",
        ]
    ]
];