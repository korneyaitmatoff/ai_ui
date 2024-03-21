<?php

class ValApi extends Api {
    function addVal($id) {
        return $this->post([
            "site_id" => $id,
        ], "");
    }

    function getSiteStat($id) {
        return $this->get('/stat' . '/' . $id);
    }
}

