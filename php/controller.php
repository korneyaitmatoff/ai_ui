<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require __DIR__ . "/api/bootstrap.php";

$API_HOST = "http://45.9.43.40";

$userApi = new UserApi($API_HOST, 82, "user");
$siteApi = new SiteApi($API_HOST, 84, "site");
$commentApi = new CommentApi($API_HOST, 83, "comment");
$valApi = new ValApi($API_HOST, 81, "html_val");

$income = json_decode(file_get_contents('php://input'), true);

$message  = "Received Request at " . time() . "\n";
$message .= "------------------------------------------------------------------------\n";
$message .= "\n";
$message .= json_encode($_REQUEST, JSON_PRETTY_PRINT | JSON_FORCE_OBJECT) . "\n";
$message .= "\n";
$message .= json_encode($_SERVER, JSON_PRETTY_PRINT | JSON_FORCE_OBJECT) . "\n";
$message .= "\n";

$filename = __DIR__ . "/logger.txt";

file_put_contents("logger.txt", $message, FILE_APPEND);
file_put_contents("logger.txt", $income, FILE_APPEND);

if (isset($_GET['type'])) {
    if ($_GET['type'] == 'get_pp') {
        # get person profile data
        print_r($userApi->getPersonProfile($_GET['login']));
    }
    
    if ($_GET['type'] == 'get_user_data') {
        # get user data
        print_r($userApi->getUser($_GET['login']));
    }
    
    if ($_GET['type'] == 'get_sites_list') {
        # get sites list
        print_r($siteApi->getSiteListByCategory(category: $_GET['category']));
    }

    if ($_GET['type'] == 'get_site_data') {
        # get site data
        print_r($siteApi->getSiteData($_GET['id']));
    }

    if ($_GET['type'] == 'add_val') {
        #add log
        $valApi->addVal(id: $_GET['id']);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}

if (isset($income['type'])) {
    if ($income['type'] == "create_site") {
        print_r($siteApi->createSite(
            name: $income['name'],
            url: $income['url'],
            description: $income['description'], 
            userId: $income['userId']
        ));
    }
    
    if ($income['type'] == "auth") {
        print_r($userApi->auth(
            login: $income['login'],
            password: $income['password'],
        ));
    }

    if ($income['type'] == "create_user") {
        print_r($userApi->createUser(
            name: $income['name'],
            login: $income['login'],
            password: $income['password'],
        ));
    }

    if ($income['type'] == 'create_comment') {
        # create comment
        print_r($commentApi->createComment(
            text: $income['text'],
            userId: $income['userId'],
            siteId: $income['siteId'],
        ));
    }
}
