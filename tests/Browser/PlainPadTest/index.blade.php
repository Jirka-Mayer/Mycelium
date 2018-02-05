<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

    <h1>Hello world!</h1>

    @include("mycelium::widgets.text", [
        "key" => "body",
        "default" => "Default content",
        "class" => "main-plain-text",
    ])

    @include("mycelium::js")

</body>
</html>