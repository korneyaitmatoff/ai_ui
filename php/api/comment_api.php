<?php

class CommentApi extends Api {
    function createComment($text, $userId, $siteId) {
        return $this->post([], "/" . $siteId . "/" . $userId . "?text=" . $text);
    }
}