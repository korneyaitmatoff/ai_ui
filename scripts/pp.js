const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    getPPData(sessionStorage.getItem("login"));
})

function getPPData(login) {
    fetch(appUrl + "?type=get_pp&login=" + login,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function(response) {
        response.json().then(function(text) {
            
            document.querySelector(".title_user_name").innerHTML = text['user']['name'];

            text['comments'].forEach(element => {
                let comment_container = document.createElement("li");
                comment_container.classList.add("list-group-item");
                comment_container.innerHTML = element['text'];

                document.querySelector(".users_comments").appendChild(comment_container);
            });
            
            text['sites'].forEach(element => {
                let site_container = document.createElement("li");
                let site_url = document.createElement("p");
                let site_url_val = document.createElement("a");

                site_container.classList.add("list-group-item");
                site_url.innerHTML = element['url'];

                site_url_val.href = "/php/controller.php?type=add_val&id=" + element['id']
                site_url_val.classList.add("btn", "btn-primary");
                site_url_val.innerHTML = "RUN VALIDATION!";

                site_container.appendChild(site_url);
                site_container.appendChild(site_url_val);

                document.querySelector(".users_sites").appendChild(site_container);
            });
        })
    });
}