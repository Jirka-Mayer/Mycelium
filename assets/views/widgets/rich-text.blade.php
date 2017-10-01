{{--
    Widget for displaying and editing rich text

    Arguments:
    $key - shroom data key
    $default - default value if no data under key
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")
@inject("renderer", "mycelium.richTextRenderer")

@php
    if (!isset($key))
        throw new Exception("'key' argument not present.");

    if (!isset($default))
        $default = null;
@endphp

@if ($mycelium->editing())
    <div
        mycelium-widget="rich-text"
        mycelium-key="{{ $key }}"
        mycelium-default="{{ $default }}"
    >
        {!!
            $renderer->render(
                $shroom->data("master")->get($key, $default)
            )
        !!}
    </div>
@else
    {!!
        /*$renderer->render(
            $shroom->data("public")->get($key, $default)
        )*/

        $shroom->data("public")->get($key . "@rendered", $default)
    !!}
@endif