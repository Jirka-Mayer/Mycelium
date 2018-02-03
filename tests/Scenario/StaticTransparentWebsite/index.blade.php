@inject("shroom", "mycelium.shroom")

<!DOCTYPE html>
<html>
<head>
    <title>Bob's website</title>
</head>
<body>

    <h1>
        @include("mycelium::widgets.text", [
            "key" => "title",
            "default" => "Default page title"
        ])
    </h1>

    <div class="page-content">
        @include("mycelium::widgets.text", [
            "key" => "content",
            "default" => "Nothing to see here yet"
        ])
    </div>

    @include("mycelium::js")

</body>
</html>