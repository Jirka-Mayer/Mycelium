<!DOCTYPE html>
<html>
<head>
    <title>Mycelium</title>
</head>
<body>

    <p>Hello, Mycelium login here!</p>

    <form action="" method="POST">
        {!! csrf_field() !!}
        <input type="text" name="name" placeholder="name">
        <input type="password" name="password" placeholder="password">
        <button>Login</button>
    </form>

    @isset($failed)
        <p style="color: red">Login failed!</p>
    @endisset

</body>
</html>