{{--
    Widget for displaying images

    This widget displays image, but it maintains a fixed
    aspect ratio and so lets the image be scaled based on the
    widget dimensions.

    Arguments:
    $key - shroom data key
    $aspectRatio - the aspect ratio to be maintained
    $class - css classes to be applied (string)
    $style - css styles to be applied (string)
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

@php
    if (!isset($key))
        throw new Exception("'key' argument not present.");

    if (!isset($aspectRatio))
        throw new Exception("'aspectRatio' argument not present.");

    if (!isset($class))
        $class = "";

    if (!isset($style))
        $style = "";

    $value = collect($shroom->data("public")->get($key, []));
    $handle = $value->get("@spore", null);
    $spore = $shroom->spore($handle);

    $url = "";
    if ($spore !== null)
        $url = $spore->get("url", "");

    $srcset = "";
    if ($spore !== null)
        $srcset = Mycelium\SporeHandlers\ImageHandler::getSrcset($shroom, $spore);

    $fitNotFill = $value->get("size", "fill") === "fit";
    $setWidthNotHeight = $fitNotFill ? ($aspectRatio < 1) : ($aspectRatio > 1);
@endphp

<span
    @if($mycelium->editing())
        mycelium-widget="aspect-image"
        mycelium-key="{{ $key }}"
    @endif
    class="{{ $class }}"
    style="
        display: inline-block;
        position: relative;
        overflow: hidden;
        /*background: #444;*/
        {{ $style }}
    "
>
    <span
        style="
            display: block;
            width: 100%;
            padding-top: {{ 100 / $aspectRatio  }}%;
        "
    >
        <img
            src="{{ $url }}"
            @if(!$mycelium->editing())
                srcset="{{ $srcset }}"
            @endif
            style="
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);

                @if ($setWidthNotHeight)
                    width: 100%;
                @else
                    height: 100%;
                @endif
            "
        >
    </span>
    @if($mycelium->editing())
        <div class="control-buttons">
            <button class="edit-button">E</button>
            <button class="size-button">S</button>
        </div>
    @endif
</span>