<?php

class UserApi extends Api {
    function createUser($name, $login, $password) {
        return $this->post([
            "name" => $name,
            "login" => $login,
            "password" => $password,
        ], "");
    }

    function getUser($login) {
        print_r($this->get('/login' . '/' . $login));
    }

    function auth($login, $password) {
        return $this->post([
            "login" => $login,
            "password" => $password,
        ], "/auth");
    }

    function getPersonProfile($login) {
        return $this->get('/pp' . '/' . $login);
    }
}

