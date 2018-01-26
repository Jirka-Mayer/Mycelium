{{--
    Widget for displaying and editing text

    This widget is meant for places where <p> cannot be used,
    for example inside a <button>. That's why it is so lightweight.

    Arguments:
    $key - shroom data key
    $default - default value if no data under key
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")
@inject("renderer", "mycelium.deltaRenderer")

@php
    if (!isset($key))
        throw new Exception("'key' argument not present.");

    if (!isset($default))
        $default = "";

    // wrap default value
    $default = ["ops" => [
        ["insert" => $default . "\n"]
    ]];
@endphp

@if($mycelium->editing())
    <span
        mycelium-widget="text"
        mycelium-key="{{ $key }}"
        contenteditable="true"
        style="white-space: pre-wrap; display: inline-block;"
    >{{
        $renderer->renderText(
            $shroom->data("public")->get($key, $default)
        )
    }}</span>
@else
    <span
        style="white-space: pre-wrap; display: inline-block;"
    >{{
        $renderer->renderText(
            $shroom->data("public")->get($key, $default)
        )
    }}</span>
@endif