<?php

class ValApi extends Api {
    function addVal($id) {
        return $this->post([
            "site_id" => $id,
        ], "html_val");
    }

    function addCssVal($id) {
        return $this->post([
            "site_id" => $id,
        ], "css_val");
    }

    function getSiteStat($id) {
        return $this->get('html_val/stat' . '/' . $id);
    }

    function getSiteCssStat($id) {
        return $this->get('css_val/stat' . '/' . $id);
    }
}

