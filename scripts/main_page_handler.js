import setSites from "./functions.js";

const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    function getSites(category) {
        fetch(appUrl + "?type=get_sites_list&category=" + category, {
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

    function resetButtons() {
        let shop_button = document.querySelector(".load_shop_sites");
        let blog_button = document.querySelector(".load_blog_sites");
        let soc_button = document.querySelector(".load_soc_sites");
        let other_button = document.querySelector(".load_other_sites");

        shop_button.classList.remove("active");
        blog_button.classList.remove("active");
        soc_button.classList.remove("active");
        other_button.classList.remove("active");
    }

    getSites("blog");

    document.querySelector(".load_shop_sites").addEventListener("click", function (event) {
        event.preventDefault();
        resetButtons();

        document.querySelector(".load_shop_sites").classList.add("active");
        document.querySelector('.list-sites').innerHTML = "";

        getSites("shop");
    });

    document.querySelector(".load_blog_sites").addEventListener("click", function (event) {
        event.preventDefault();
        resetButtons();

        document.querySelector(".load_shop_sites").classList.add("active");
        document.querySelector('.list-sites').innerHTML = "";

        getSites("blog");
    });

    document.querySelector(".load_soc_sites").addEventListener("click", function (event) {
        event.preventDefault();
        resetButtons();

        document.querySelector(".load_shop_sites").classList.add("active");
        document.querySelector('.list-sites').innerHTML = "";

        getSites("social_net");
    });

    document.querySelector(".load_other_sites").addEventListener("click", function (event) {
        event.preventDefault();
        resetButtons();

        document.querySelector(".load_shop_sites").classList.add("active");
        document.querySelector('.list-sites').innerHTML = "";

        getSites("other");
    });
})

