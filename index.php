<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Website</title>
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
                <h2>Site adding</h2>
                <div class="mb-3">
                    <label class="form-label">Site name</label>
                    <input type="text" class="form-control" id="text_input" name="name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL</label>
                    <input type="text" class="form-control" id="url_input" name="url" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" id="desc_input" name="description" required>
                </div>
                <input type="submit" class="btn btn-primary btn_send_site_form" value="CREATE!">
            </form>
            <div class="mt-5">
                    <h2>Web-apps List</h2>
                    <ul class="list-group list-sites"></ul>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
    </body>
</html>