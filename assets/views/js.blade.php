{{--
    Loads scripts needed for shroom editing
--}}

{{-- service injection --}}
@inject("mycelium", "mycelium")
@inject("shroom", "mycelium.shroom")

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

    {{-- mycelium state and config --}}
    <script type="text/javascript">
        window.mycelium.state = {!! json_encode($mycelium->exportState()) !!}
        window.mycelium.config = {!! json_encode(config("mycelium")) !!}
    </script>

    {{-- if the user is in editing mode --}}
    @if ($mycelium->editing())

        {{-- create shroom instance --}}
        <script type="text/javascript">
            window.mycelium.shroom = new window.mycelium.class.Shroom(
                window,
                window.document,
                window.mycelium,
                {!! $shroom->toJson(JSON_PRETTY_PRINT) !!}
            )

            window.mycelium.shroom.initializeAutosave()
        </script>

    @endif

    <!-- create UI -->
    <script type="text/javascript">
        window.mycelium.windowManager = new window.mycelium.class.ui.WindowManager(
            window.document
        )

        window.mycelium.toolbar = new window.mycelium.class.ui.Toolbar(
            window,
            window.document,
            window.mycelium
        )
    </script>

@endif