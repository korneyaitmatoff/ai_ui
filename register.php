<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script type="module" src="./scripts/register.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">My Website</a>
        </div>
    </nav>

    <div class="container mt-5">
        <h1>Register</h1>
        <form id="register_form">
        <div class="mb-3">
                <label for="registerName" class="form-label">Имя</label>
                <input type="text" class="form-control" id="registerName"  name="name" required>
            </div>
            <div class="mb-3">
                <label for="registerLogin" class="form-label">Ваш логин</label>
                <input type="text" class="form-control" id="registerLogin" name="login" required>
            </div>
            <div class="mb-3">
                <label for="registerPassword" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="registerPassword" name="password" required>
            </div>
            <input class="btn btn-primary btn_send_register_form" value="Sign up">
        </form>
        <p><a href="/auth.php" class="link-primary">Регистрация</a></p>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
</body>
</html>