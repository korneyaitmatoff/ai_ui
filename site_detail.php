<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script type="module" src="./scripts/index.js"></script>
    <script type="module" src="./scripts/logout.js"></script>
    <script type="module" src="./scripts/detail.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <?php include("./templates/nav.html");?>

    <div class="container mt-5">
        <h1 class="mt-5">Страница сайта</h1>
        <div class="m-3">
            <div class="mt-3">Статистика отображения кол-ва ошибок за каждый прогон</div>
            <canvas id="myChart"></canvas>
        </div>
        <div class="site_data">
        </div>
        <form class="mt-3 create_comment">
            <div class="mb-3">
                <label for="commentText" class="form-label">Есть что сказать? Ответьте комментарием!</label>
                <textarea class="form-control" id="commentText" rows="3" name="text" required></textarea>
            </div>
            <input type="submit" class="btn btn-primary btn_send_comment_form" value="Submit">
        </form>

        <div class="mt-5">
            <h2>Коментарии</h2>
            <ul class="list-group comments_list"></ul>
        </div>
    </div>
    <br/>
    <br/>
    <br/>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
</body>
</html>