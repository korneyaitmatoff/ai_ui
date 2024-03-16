<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script type="module" src="./scripts/index.js"></script>
    <script type="module" src="./scripts/logout.js"></script>
    <script type="module" src="./scripts/pp.js"></script>
</head>
<body>
    <?php include("./templates/nav.html");?>

    <div class="container mt-5">
        <h1 class="mt-5">Профиль пользователя</h1>
        <div>
            <h2 class="title_user_name">Информация о пользователе</h2>
        </div>
        <div class="mt-3">
            <h2>Сайты пользователя</h2>
            <ul class="list-group users_sites">
            </ul>
        </div>
        <div class="mt-3">
            <h2>Комментарии пользователя</h2>
            <ul class="list-group users_comments">
            </ul>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
</body>
</html>