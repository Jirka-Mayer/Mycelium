{{--
    Loads scripts needed for shroom editing
--}}

{{-- service injection --}}
@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

{{-- if the user is an editor --}}
@if ($mycelium->editor())

    {{-- load quill.js --}}
    <script
        mycelium-quill-script="here"
        type="text/javascript"
        src="{{ asset("vendor/mycelium/quill.core.1.3.4.js") }}"
    ></script>

    {{-- load mycelium --}}
    <script
        type="text/javascript"
        src="{{ $mycelium->cacheBustedAsset("/mycelium.js") }}"
    ></script>
    <link
        rel="stylesheet"
        type="text/css"
        href="{{ $mycelium->cacheBustedAsset("/mycelium.css") }}"
    >

    <script type="text/javascript">

        // setup config
        window.mycelium.state = {!! json_encode($mycelium->exportState()) !!}
        window.mycelium.config = {!! json_encode(config("mycelium")) !!}

        // setup Quill
        window.mycelium.initialization.setupQuill(window)

        // register public classes
        window.mycelium.initialization.registerClasses(window)

    </script>

    {{-- if the user is in editing mode --}}
    @if ($mycelium->editing())

        {{-- create shroom instance --}}
        <script type="text/javascript">
            window.mycelium.initialization.createShroom(
                window,
                {!! $shroom->toJson(JSON_PRETTY_PRINT) !!}
            )
        </script>

    @endif

    <script type="text/javascript">

        window.mycelium.initialization.initializeUI(window)

    </script>

@endif