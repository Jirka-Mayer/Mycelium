{{--
    Loads scripts needed for shroom editing

    Arguments:
    $richText - if true, rich text capabilities will be loaded
--}}

{{-- service injection --}}
@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

{{-- argument curing --}}
@php
    if (!isset($richText))
        $richText = false;
@endphp

{{-- if the user is an editor --}}
@if ($mycelium->editor())

    {{-- load mycelium --}}
    <script
        type="text/javascript"
        src="{{ asset("js/vendor/mycelium/mycelium.js") }}"
    ></script>
    <link
        rel="stylesheet"
        type="text/css"
        href="{{ asset("css/vendor/mycelium/mycelium.css") }}"
    >

    {{-- set mycelium state --}}
    <script type="text/javascript">
        window.mycelium.state.editing = {!! json_encode($mycelium->editing()) !!}
    </script>

    {{-- if the user is in editing mode --}}
    @if ($mycelium->editing())

        {{-- load quill.js if richtext widget present --}}
        @if ($richText)
            <link href="https://cdn.quilljs.com/1.3.1/quill.snow.css" rel="stylesheet">
            <script src="https://cdn.quilljs.com/1.3.1/quill.js"></script>
        @endif

        {{-- create shroom instance --}}
        <script type="text/javascript">
            window.mycelium.shroom = new window.mycelium.class.Shroom(
                window,
                window.document,
                {!! $shroom->toJson(JSON_PRETTY_PRINT) !!}
            )

            window.mycelium.shroom.initializeAutosave()
        </script>

    @endif

    <!-- create UI -->
    <script type="text/javascript">
        window.mycelium.taskbar = new window.mycelium.class.ui.Taskbar(document)
    </script>

@endif