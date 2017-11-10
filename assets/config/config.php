<?php

return [

    /**
     * Built-in authentication
     */
    "auth" => [

        "enabled" => false,

        "routes" => [
            "login" => url("login"),
            "logout" => url("logout")
        ]
    ]
];