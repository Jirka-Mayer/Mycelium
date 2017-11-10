{{--
    Widget for displaying and editing rich text

    Arguments:
    $key - shroom data key
    $default - default value if no data under key
    $class - css classes to be applied
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

    // wrap default value
    $default = ["ops" => [
        ["insert" => $default . "\n"]
    ]]
@endphp

@if ($mycelium->editing())
    <div
        mycelium-widget="rich-text"
        mycelium-key="{{ $key }}"
        mycelium-default="{{ json_encode($default) }}"
        class="{{ $class }}"
    >
        {{-- print rendered content before quill loads --}}
        {{--{!!
            $renderer->render(
                $shroom->data("master")->get($key, $default)
            )
        !!}--}}
    </div>
@else
    {!!
        $renderer->render(
            $shroom->data("public")->get($key, $default)
        )
    !!}
@endif