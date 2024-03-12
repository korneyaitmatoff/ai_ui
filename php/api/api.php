<?php

class Api {
    public $host;

    function __construct($host, $port, $path) {
        $this->host=$host . ":" . $port . "/" . $path;
    }


    function get($url_params) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => $this->host . $url_params,
        CURLOPT_POST => false,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json'
        ]
        ));
        $output = curl_exec($curl);
        curl_close($curl);

        file_put_contents("logger.txt", $output, FILE_APPEND);
        
        return;
    }

    function post($params, $path) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->host . $path,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
        ));
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params, JSON_UNESCAPED_UNICODE));
            curl_setopt($curl, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json'
            ]);
        $output = curl_exec($curl);
        curl_close($curl);

        file_put_contents("logger.txt", $output, FILE_APPEND);

        return $output;
    }
}



?>