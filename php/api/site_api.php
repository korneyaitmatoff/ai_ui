<?php

class SiteApi extends Api {
    function createSite($name, $url, $description, $userId, $category) {
        return $this->post([
            "name" => $name,
            "url" => $url,
            "description" => $description,
            "user_id" => $userId,
            "category" => $category,
        ], "");
    }

    function getSitesList() {
        return $this->get('?limit=10000&offset=0');
    }

    function getSiteData($id) {
        return $this->get('/data' . '/' .$id);
    }

    function getSiteListByCategory($category) {
        return $this->get('/list' . '/' . $category);
    }
}