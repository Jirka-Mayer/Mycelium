<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

    <h1>Hello world!</h1>

    @include("mycelium::widgets.rich-text", [
        "key" => "body",
        "default" => "Default content",
        "class" => "main-rich-text",
    ])

    @include("mycelium::js")

</body>
</html>