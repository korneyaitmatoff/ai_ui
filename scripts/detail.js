const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(document.location.search);
    
    fetch(appUrl + "?type=get_site_data&id=" + params.get("id"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function(response) {
        response.json().then(function(text) {
            console.log(text);

            let data_container = document.querySelector(".site_data");

            let url_container = document.createElement("p");
            url_container.innerHTML = "URL: " + text['data']['url'];

            let name_container = document.createElement("p");
            name_container.innerHTML = "Name: " + text['data']['name'];

            let description_container = document.createElement("p");
            description_container.innerHTML = "Description: " + text['data']['description'];

            let owner_container = document.createElement("p");
            owner_container.innerHTML = "Owner: " + text['user']['name'];

            let validation_container = document.createElement("ul");
            validation_container.classList.add("list-group")

            let val_title = document.createElement("h2");
            val_title.innerHTML = "Errors list";

            validation_container.appendChild(val_title);

            let last_update = document.createElement("p");

            if (text['validation'].length != 0) {
                let date = new Date(Date.parse(text['validation'][0].created_at));
                let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

                last_update.innerHTML = "Last update: " + dd+"."+mm+"."+date.getFullYear().toString().substr(-2);

                validation_container.appendChild(last_update);

                text['validation'].forEach(element => {
                    
                    JSON.parse(element.logs).forEach(log => {
                        let validation_container_el = document.createElement("li");

                        validation_container_el.classList.add("list-group-item")
                        validation_container_el.innerHTML = log;

                        validation_container.appendChild(validation_container_el);
                    })
                });
            }

            let comments_container = document.querySelector(".comments_list");
            comments_container.classList.add("list-group")

            text['comments'].forEach(element => {
                let comment_container = document.createElement("li");

                comment_container.classList.add("list-group-item")
                comment_container.innerHTML = element['text'];

                comments_container.appendChild(comment_container);
            })


            data_container.appendChild(url_container);
            data_container.appendChild(name_container);
            data_container.appendChild(description_container);
            data_container.appendChild(owner_container);
            data_container.appendChild(validation_container);
            
        })
    })
    
    document.querySelector(".btn_send_comment_form").addEventListener("click", function () {
        let site_form = new FormData(document.querySelector(".create_comment"));
        
        fetch(
            appUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: "create_comment",
                    text: site_form.get("text"),
                    siteId: params.get("id"),
                    userId: sessionStorage.getItem('id')
                })
            }).then(function(response) {
                response.json().then(function(text) {
                    window.location.replace("/site_detail.php?id=" + params.get("id"));
                })
            })
    })
})