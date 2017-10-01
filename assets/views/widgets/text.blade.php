{{--
    Widget for displaying and editing text

    Arguments:
    $key - shroom data key
    $default - default value if no data under key
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

@php
    if (!isset($key))
        throw new Exception("'key' argument not present.");

    if (!isset($default))
        $default = null;
@endphp

@if($mycelium->editing())
    <span
        mycelium-widget="text"
        mycelium-key="{{ $key }}"
        contenteditable="true"
        style="white-space: pre-wrap; display: inline-block;"
    >{{ $shroom->data("master")->get($key, $default) }}</span>
@else
    {{ $shroom->data("public")->get($key, $default) }}
@endif