const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn_send_auth_form").addEventListener("click", function() {
        let loginForm = new FormData(document.querySelector(".login_form"));
        fetch(appUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                type: 'auth',
                login: loginForm.get("login"),
                password: loginForm.get("password"),
            })
        }).then(function(res) {
            res.json().then(function(text) {
                if(text != -1) {
                    setSessionData(loginForm.get("login"));

                    window.location.replace("/person_profile.php")
                } else {
                    alert('Неверное имя пользователя или пароль!');
                }
            });
        })
    })
})

function setSessionData(login) {
    fetch(appUrl + "?type=get_user_data&login=" + login,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(function (response) {
        response.json().then(function (text) {
            sessionStorage.setItem("id", text['id']);
            sessionStorage.setItem("login", text['login']);
        })
    })
}