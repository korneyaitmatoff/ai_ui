const appUrl = "php/controller.php";
const messageLimit = 10

document.addEventListener("DOMContentLoaded", function () {
    function getChart(labels, data, title, element_id) {
        const ctx = document.getElementById(element_id);

        new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
            datasets: [
                {
                    label: 'Кол-во ошибок за прогон',
                    data: data["error"],
                    borderWidth: 1,
                    borderColor: "#800000",
                    backgroundColor: "#800000",
                },
                {
                    label: 'Кол-во предупреждений за прогон',
                    data: data["warning"],
                    borderWidth: 1,
                    borderColor: "#FF8C00",
                    backgroundColor: "#FF8C00",
                }
            ],
            },
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
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
            let labels = [];
            let errors_data = [];
            let warnings_data = [];

            let diff_css = document.querySelector(".diff_css");

            for (var key in text['html']['errors']['stat']) {
                let date = new Date(Date.parse(key));
                let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

                labels.push(dd+"."+mm+"."+date.getFullYear().toString().substr(-2));
                errors_data.push(text['html']['errors']['stat'][key]);
            }

            for (var key in text['html']['warnings']['stat']) {
                let date = new Date(Date.parse(key));

                warnings_data.push(text['html']['warnings']['stat'][key]);
            }

            if (text['css']['success'] == undefined) {
                let css_labels = [];
                let css_errors_data = [];
                let css_warnings_data = [];
    
                for (var key in text['css']['errors']['stat']) {
                    let date = new Date(Date.parse(key));
                    let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                    let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    
                    css_labels.push(dd+"."+mm+"."+date.getFullYear().toString().substr(-2));
                    css_errors_data.push(text['css']['errors']['stat'][key]);
                }
    
                for (var key in text['css']['warnings']['stat']) {
                    css_warnings_data.push(text['css']['warnings']['stat'][key]);
                }

                getChart(
                    css_labels,
                    {
                        "error": css_errors_data,
                        "warning": css_warnings_data,
                    },
                    "Статистика отображения кол-ва CSS ошибок и предупреждений за каждый прогон",
                    "css_chart"
                );
                

                if (text['css']['errors']['ml'] == 1) {
                    diff_css.innerHTML = "Кол-во CSS ошибок на " + text['css']['errors']['diff'] + "% меньше, чем среднее значение в данной категории.";
                    diff_css.classList.add("p-3", "mb-3", "text-bg-success", "rounded-3");
                } else {
                    if (text['css']['errors']['diff'] <= 50) {
                        diff_css.classList.add("p-3", "mb-3", "text-bg-warning", "rounded-3");
                    } else {
                        diff_css.classList.add("p-3", "mb-3", "text-bg-danger", "rounded-3");
                    }
                    diff_css.innerHTML = "Кол-во CSS ошибок на " + Math.abs(text['css']['errors']['diff']) + "% больше, чем среднее значение в данной категории."
                }

            } else {
                document.querySelector("#css_chart_message").innerHTML = "CSS: " + text['css']['message'];
                diff_css.innerHTML = "CSS: " + text['css']['message'];
                diff_css.classList.add("p-3", "mb-3", "text-bg-danger", "rounded-3");
            }

            getChart(
                labels,
                {
                    "error": errors_data,
                    "warning": warnings_data,
                },
                "Статистика отображения кол-ва HTML ошибок и предупреждений за каждый прогон",
                "html_chart"
            );
            
            let diff = document.querySelector(".diff_html");

            if (text['html']['errors']['ml'] == 1) {
                diff.innerHTML = "Кол-во HTML ошибок на " + text['html']['errors']['diff'] + "% меньше, чем среднее значение в данной категории.";
                diff.classList.add("p-3", "mb-3", "text-bg-success", "rounded-3");
            } else {
                if (text['html']['errors']['diff'] <= 50) {
                    diff.classList.add("p-3", "mb-3", "text-bg-warning", "rounded-3");
                } else {
                    diff.classList.add("p-3", "mb-3", "text-bg-danger", "rounded-3");
                }
                diff.innerHTML = "Кол-во HTML ошибок на " + Math.abs(text['html']['errors']['diff']) + "% больше, чем среднее значение в данной категории."
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
            let data_container = document.querySelector(".site_data");

            let url_container = document.createElement("p");
            url_container.innerHTML = "Ссылка: " + text['data']['url'];

            let name_container = document.createElement("p");
            name_container.innerHTML = "Название сайта: " + text['data']['name'];

            let description_container = document.createElement("p");
            description_container.innerHTML = "Описание: " + text['data']['description'];

            let owner_container = document.createElement("p");
            owner_container.innerHTML = "Владелец: " + text['user']['name'];

            let html_validation_container = document.createElement("ul");
            html_validation_container.classList.add("list-group")

            let html_warnings_validation_container = document.createElement("ul");
            html_warnings_validation_container.classList.add("list-group")

            let html_val_title = document.createElement("h2");
            html_val_title.innerHTML = "Список HTML ошибок";

            let html_warn_val_title = document.createElement("h2");
            html_warn_val_title.innerHTML = "Список HTML предупреждений";

            html_validation_container.appendChild(html_val_title);
            html_warnings_validation_container.appendChild(html_warn_val_title);

            let html_last_update = document.createElement("p");

            if (text['validation']['html'].length != 0) {
                let date = new Date(Date.parse(text['validation']['html'][0].created_at));
                let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

                html_last_update.innerHTML = "Последнее обновление: " + dd+"."+mm+"."+date.getFullYear().toString().substr(-2);

                html_validation_container.appendChild(html_last_update);

                JSON.parse(text['validation']['html'][0]['logs'])['errors']['errors'].slice(0, messageLimit).forEach(log => {
                    let validation_container_el = document.createElement("li");

                    validation_container_el.classList.add("list-group-item")
                    validation_container_el.innerHTML = log['message'];

                    html_validation_container.appendChild(validation_container_el);
                })

                JSON.parse(text['validation']['html'][0]['logs'])['warnings']['warnings'].slice(0, messageLimit).forEach(log => {
                    let warn_validation_container_el = document.createElement("li");

                    warn_validation_container_el.classList.add("list-group-item")
                    warn_validation_container_el.innerHTML = log['message'];

                    html_warnings_validation_container.appendChild(warn_validation_container_el);
                })
            }

            let css_validation_container = document.createElement("ul");
            css_validation_container.classList.add("list-group")

            let css_warnings_validation_container = document.createElement("ul");
            css_warnings_validation_container.classList.add("list-group")

            let css_val_title = document.createElement("h2");
            css_val_title.innerHTML = "Список CSS ошибок";

            let css_warn_val_title = document.createElement("h2");
            css_warn_val_title.innerHTML = "Список CSS предупреждений";

            css_validation_container.appendChild(css_val_title);
            css_warnings_validation_container.appendChild(css_warn_val_title);

            let css_last_update = document.createElement("p");

            if (text['validation']['css'].length != 0) {
                console.log("css");
                console.log(text);
                let date = new Date(Date.parse(text['validation']['css'][0].created_at));
                let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                let mm = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

                css_last_update.innerHTML = "Последнее обновление: " + dd+"."+mm+"."+date.getFullYear().toString().substr(-2);

                css_validation_container.appendChild(css_last_update);

                JSON.parse(text['validation']['css'][0]['logs'])['errors']['errors'].slice(0, messageLimit).forEach(log => {
                    console.log(log);
                    let validation_container_el = document.createElement("li");

                    validation_container_el.classList.add("list-group-item")
                    validation_container_el.innerHTML = log;

                    css_validation_container.appendChild(validation_container_el);
                })

                JSON.parse(text['validation']['css'][0]['logs'])['warnings']['warnings'].slice(0, messageLimit).forEach(log => {
                    let warn_validation_container_el = document.createElement("li");

                    warn_validation_container_el.classList.add("list-group-item")
                    warn_validation_container_el.innerHTML = log;

                    css_warnings_validation_container.appendChild(warn_validation_container_el);
                })

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
            data_container.appendChild(html_validation_container);
            data_container.appendChild(html_warnings_validation_container);
            data_container.appendChild(css_validation_container);
            data_container.appendChild(css_warnings_validation_container);
            
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