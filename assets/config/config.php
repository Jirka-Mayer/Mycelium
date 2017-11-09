<?php

return [

    /**
     * Built-in mycelium auth
     */
    "auth" => [

        "enabled" => false,

        "routes" => [
            "register" => true,

            "login" => "/login",
            "logout" => "/logout"
        ]
    ]
];