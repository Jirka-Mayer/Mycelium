{{--
    Widget for displaying and editing rich text

    Arguments:
    $key - shroom data key
    $default - default value if no data under key
    $class - css classes to be applied
    $cssScope - css scope for the widget
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
        $cssScope = "default";

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
        mycelium-css-scope="{{ $cssScope }}"
        class="{{ $class }} {{ "css-scope__" . $cssScope }}"
    >
        {{-- print rendered content before quill loads --}}
        {!!
            $renderer->render(
                $shroom->data("public")->get($key, $default)
            )
        !!}
    </div>
@else
    <div class="{{ $class }} {{ "css-scope__" . $cssScope }}">
        {!!
            $renderer->render(
                $shroom->data("public")->get($key, $default)
            )
        !!}
    </div>
@endif