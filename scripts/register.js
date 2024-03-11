import logIn from "./functions.js";

const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#register_form").addEventListener("submit", function() {
        let formData = new FormData(document.querySelector("#register_form"));
        
        fetch(appUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: formData.get('login'),
                name: formData.get('name'),
                password: formData.get('password'),
                type: 'create_user',
            })
        }).then(function(res) { 
            res.json().then(function(json) {
                window.location.replace("./auth.php")
            });
        })
    })
})