import setSites from "./functions.js";

const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    function getSites() {
        fetch(appUrl + "?type=get_sites_list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function(response) {;
            response.json().then(function(text) {
                setSites(text);
            })
        })
    }

    getSites();
})