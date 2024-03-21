const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    function getChart(labels, data) {
        const ctx = document.getElementById('myChart');

            new Chart(ctx, {
                type: 'bar',
                data: {
                labels: labels,
                datasets: [{
                    label: 'Кол-во ошибок за прогон',
                    data: data,
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
    }

    let params = new URLSearchParams(document.location.search);

    fetch(appUrl + "?type=get_site_stat&id=" + params.get("id"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(function(response) {
        response.json().then(function(text) {
            console.log(text)
            let labels = [];
            let data = [];

            for (var key in text['stat']) {
                let date = new Date(Date.parse(key));
                let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

                labels.push(dd+"."+mm+"."+date.getFullYear().toString().substr(-2));
                data.push(text['stat'][key]);
            }
            
            getChart(labels=labels, data=data);
            
            let diff = document.querySelector(".diff");

            if (text['diff'] > 0) {
                diff.innerHTML = "Кол-во ошибок на " + text['diff'] + " меньше, чем среднее значение."
            } else {
                diff.innerHTML = "Кол-во ошибок на " + text['diff'] + " больше, чем среднее значение."
            }
        })
    })
    
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
            url_container.innerHTML = "Ссылка: " + text['data']['url'];

            let name_container = document.createElement("p");
            name_container.innerHTML = "Название сайта: " + text['data']['name'];

            let description_container = document.createElement("p");
            description_container.innerHTML = "Описание: " + text['data']['description'];

            let owner_container = document.createElement("p");
            owner_container.innerHTML = "Владелец: " + text['user']['name'];

            let validation_container = document.createElement("ul");
            validation_container.classList.add("list-group")

            let val_title = document.createElement("h2");
            val_title.innerHTML = "Список ошибок";

            validation_container.appendChild(val_title);

            let last_update = document.createElement("p");

            if (text['validation'].length != 0) {
                let date = new Date(Date.parse(text['validation'][0].created_at));
                let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

                last_update.innerHTML = "Последнее обновление: " + dd+"."+mm+"."+date.getFullYear().toString().substr(-2);

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
    
    document.querySelector(".btn_send_comment_form").addEventListener("click", function (event) {
        let site_form = new FormData(document.querySelector(".create_comment"));
        
        event.preventDefault();
        
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
                    if (response.ok) {
                        window.location.replace("/site_detail.php?id=" + params.get("id"));
                    } else {
                        console.log("create comment, response, wrong")
                    }

                })
            })
    })
})