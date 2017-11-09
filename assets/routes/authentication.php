<?php

Route::group(["middleware" => "web"], function () {

    Route::get(config("mycelium.auth.routes.login"), function () {
        return view("mycelium::auth.login");
    });

    Route::post(config("mycelium.auth.routes.login"), function () {
        $request = app("request");
        $guard = app("auth");

        if ($guard->attempt($request->only(["name", "password"])))
            return redirect("/");
        else
            return view("mycelium::auth.login", ["failed" => true]);
    });

    Route::get(config("mycelium.auth.routes.logout"), function () {
        $guard = app("auth");
        $guard->logout();
        return redirect("/");
    });

});