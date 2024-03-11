<?php

ini_set("log_errors", 1);
ini_set("error_log", __DIR__ . "/php-error.log");
error_log( "Hello, errors!" );

require __DIR__ . "/api/bootstrap.php";

$API_HOST = "http://45.9.43.40";

$userApi = new UserApi($API_HOST, 82, "user");
$siteApi = new SiteApi($API_HOST, 84, "site");
$commentApi = new CommentApi($API_HOST, 83, "comment");
$valApi = new ValApi($API_HOST, 81, "html_val");

$income = json_decode(file_get_contents('php://input'), true);

// $f = fopen(__DIR__ . "/data.log", "a");
// fwrite($f, "\nINCOME:\n" . print_r($income) . "\nGET:\n" . print_r($_GET) . "\nPOST\n" . print_r($_POST) . "\n");
// fclose($f);

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
        print_r($siteApi->getSitesList());
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
