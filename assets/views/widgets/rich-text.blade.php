{{--
    Widget for displaying and editing rich text

    Arguments:
    $key - shroom data key
    $default - default value if no data under key
    $class - css classes to be applied (only to the root - the widget, not pad)
    $cssScope - css scope for the widget (string/array of strings)
    $formats - allowed formats
    $tableFormats - formats allowed in tables (overrides all default action)
    $headers - header offset and count
    $tableHeaders - explicit headers for tables (default is inheritance)
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")
@inject("renderer", "mycelium.deltaRenderer")

@php
    if (!isset($key))
        throw new Exception("'key' argument not present.");

    if (!isset($default))
        $default = "";

    if (!isset($class))
        $class = "";

    if (!isset($cssScope))
        $cssScope = [];

    if (!isset($formats))
        $formats = config("mycelium.rich-text.formats");

    if (!isset($tableFormats))
        $tableFormats = null;

    if (!isset($headers))
        $headers = config("mycelium.rich-text.headers");

    if (!isset($tableHeaders))
        $tableHeaders = config("mycelium.rich-text.table-headers", null);

    // css scope to text
    $cssScopeText = "";
    if (is_string($cssScope))
        $cssScopeText = "css-scope__" . $cssScope;
    else if (is_array($cssScope))
        foreach ($cssScope as $s)
            $cssScopeText .= " css-scope__" . $s;

    // wrap default value
    $default = ["ops" => [
        ["insert" => $default . "\n"]
    ]];
@endphp

@if ($mycelium->editing())
    <div
        mycelium-widget="rich-text"
        mycelium-key="{{ $key }}"
        mycelium-default="{{ json_encode($default) }}"
        mycelium-css-scope="{{ json_encode($cssScope) }}"
        mycelium-formats="{{ json_encode($formats) }}"
        mycelium-table-formats="{{ json_encode($tableFormats) }}"
        mycelium-headers="{{ json_encode($headers) }}"
        mycelium-table-headers="{{ json_encode($tableHeaders) }}"
        class="{{ $class }}"
    >
        {!!
            $renderer->renderHtml(
                $shroom->data("public")->get($key, $default),
                false
            )
        !!}
    </div>
@else
    <div class="{{ $class }} {{ $cssScopeText }}">
        {!!
            $renderer->renderHtml(
                $shroom->data("public")->get($key, $default)
            )
        !!}
    </div>
@endif