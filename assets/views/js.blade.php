{{--
    Loads scripts needed for shroom editing

    Arguments:
    $richText - if true, rich text capabilities will be loaded
--}}

@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

@php
    if (!isset($richText))
        $richText = false;
@endphp

@if ($mycelium->editing())
    
    @if ($richText)
        <!-- load quill.js-->
        <link href="https://cdn.quilljs.com/1.3.1/quill.snow.css" rel="stylesheet">
        <script src="https://cdn.quilljs.com/1.3.1/quill.js"></script>
    @endif

    <!-- load mycelium -->
    <script
        type="text/javascript"
        src="{{ asset("js/vendor/mycelium/mycelium.js") }}"
    ></script>

    <!-- create shroom instance -->
    <script type="text/javascript">
        window.mycelium.shroom = new window.mycelium.class.Shroom(
            window,
            window.document,
            {!! $shroom->toJson(JSON_PRETTY_PRINT) !!}
        )

        window.mycelium.shroom.initializeAutosave()
    </script>
@endif