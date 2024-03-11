const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem('login')) {
        window.location.href = "/auth.php";
    } else {
        let block = document.querySelector(".nav_container");
        let pp_container = document.createElement("a");
        pp_container.classList.add("navbar-brand", "link-primary");
        pp_container.innerHTML = "Hi, " + sessionStorage.getItem("login");
        pp_container.setAttribute("href", "/person_profile.php?login=" + sessionStorage.getItem("login"));
        
        let logout_container = document.createElement("a");
        logout_container.innerHTML = "logout"
        logout_container.classList.add("navbar-brand", "link-danger", "logout");

        block.appendChild(pp_container);
        block.appendChild(logout_container);
    }

    let limit = 10;
    let offset = 0;
})