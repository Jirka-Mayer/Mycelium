<!DOCTYPE html>
<html>
<head>
    <title>
        @lang("mycelium::login.html-title")
    </title>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

    <style type="text/css">
        body {
            position: relative;
            margin: 0;
            background: #ddd;
            height: 100vh;
        }

        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            margin: 30px;
            padding: 20px 40px;

            background: #eee;
            border-radius: 30px;
        }

        .title {
            font-size: 35px;
            font-family: "Roboto", sans-serif;
            font-weight: 400;
        }

        .description {
            font-size: 18px;
            font-family: "Roboto", sans-serif;
            color: rgba(0, 0, 0, 0.8);
        }

        .input-block {
            margin-bottom: 10px;
        }

        .input-block label {
            display: block;

            font-size: 15px;
            font-family: "Roboto", sans-serif;
            color: rgba(0, 0, 0, 0.8);
            font-weight: 700;
        }

        .input-block input {
            display: block;
            width: 200px;
            padding: 5px 10px;
            box-sizing: border-box;

            font-size: 18px;
            font-family: "Roboto", sans-serif;
            color: rgba(0, 0, 0, 0.8);
            font-weight: 400;

            border: none;
        }

        .submit {
            display: block;
            width: 200px;
            padding: 10px 30px;
            box-sizing: border-box;
            margin-top: 20px;

            font-size: 15px;
            font-family: "Roboto", sans-serif;
            color: rgba(0, 0, 0, 0.8);
            font-weight: 700;

            background: #ccc;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .submit:hover {
            background: #ddd;
        }

        .error {
            font-size: 18px;
            font-family: "Roboto", sans-serif;
            color: tomato;
        }
    </style>
</head>
<body>

    <div class="box">
        
        <h1 class="title">
            @lang("mycelium::login.title")
        </h1>

        <p class="description">
            @lang("mycelium::login.description")
        </p>

        <form action="" method="POST">
            {!! csrf_field() !!}
            <div class="input-block">
                <label for="name">
                    @lang("mycelium::login.name-field")
                </label>
                <input type="text" id="name" name="name" autofocus>
            </div>
            <div class="input-block">
                <label for="password">
                    @lang("mycelium::login.password-field")
                </label>
                <input type="password" id="password" name="password">
            </div>
            <button class="submit">
                @lang("mycelium::login.submit")
            </button>
        </form>

        @isset($failed)
            <p class="error">
                @lang("mycelium::login.error")
            </p>
        @endisset
    </div>

</body>
</html>