{{--
    Widget for displaying images

    This widget does not provide aspect ratio fixing, it acts
    like <img> tag. But can be easily used for inline images.
    It gwros with the image as needed.

    Do not expect the size to be constant because of the srcset
    attribute. Use CSS to make the size predictable.

    Basically use this as image widget with variable aspect ratio.

    Arguments:
    $key - shroom data key
    $class - css classes to be applied (string)
    $style - css styles to be applied (string)
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

@php
    if (!isset($key))
        throw new Exception("'key' argument not present.");

    if (!isset($class))
        $class = "";

    if (!isset($style))
        $style = "";

    $value = $shroom->data("public")->get($key, []);
    $handle = collect($value)->get("@spore", null);
    $spore = $shroom->spore($handle);

    $url = "";
    if ($spore !== null)
        $url = $spore->get("url", "");

    $srcset = "";
    if ($spore !== null)
        $srcset = Mycelium\SporeHandlers\ImageHandler::getSrcset($shroom, $spore);
@endphp

@if($mycelium->editing())
    <span
        mycelium-widget="image"
        mycelium-key="{{ $key }}"
        class="{{ $class }}"
        style="{{ $style }}"
    >
        <img
            class="{{ $class }}"
            style="{{ $style }}"
            src="{{ $url }}"
        >
        <button class="edit-button">E</button>
    </span>
@else
    <img
        class="{{ $class }}"
        style="{{ $style }}"
        src="{{ $url }}"
        srcset="{{ $srcset }}"
    >
@endif