<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Система оценки надежности веб-приложения</title>
        <link rel="stylesheet" href="./style.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
        <script type="module" src="./scripts/index.js"></script>
        <script type="module" src="./scripts/logout.js"></script>
        <script type="module" src="./scripts/add_site_form.js"></script>
        <script type="module" src="./scripts/main_page_handler.js"></script>
    </head>
    <body>
        <?php include("./templates/nav.html");?>
        
        <div class="container mt-5">
            <form class="border rounded mb-5 p-5 add_site_form">
                <h2>Добавить сайт</h2>
                <div class="mb-3">
                    <label class="form-label">Название сайта</label>
                    <input type="text" class="form-control" id="text_input" name="name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Ссылка</label>
                    <input type="text" class="form-control" id="url_input" name="url" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Описание</label>
                    <input type="text" class="form-control" id="desc_input" name="description" required>
                </div>
                <div class="mb-3">
                    <select class="form-select" aria-label="Default select example">
                        <option value="1" selected>Блог</option>
                        <option value="2">Интернет-магазин</option>
                        <option value="3">Соц-сети</option>
                        <option value="3">Другое</option>
                    </select>
                </div>
                <input type="submit" class="btn btn-primary btn_send_site_form" value="СОЗДАТЬ!">
            </form>
            <div class="mb-3">
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item d-flex justify-content-between align-items-start active">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Блоги</div>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Интернет-магазины</div>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Соц-сети</div>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Другое</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mt-5">
                    <h2>Список сайтов</h2>
                    <ul class="list-group list-sites"></ul>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
    </body>
</html>