const appUrl = "php/controller.php";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn_send_site_form").addEventListener("click", function() {
        let site_form = new FormData(document.querySelector(".add_site_form"));

        fetch(
            appUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: "create_site",
                    name: site_form.get("name"),
                    description: site_form.get("description"),
                    url: site_form.get("url"),
                    userId: sessionStorage.getItem('id')
                })
            }).then(function(response) {
                response.json().then(function(text) {
                    window.location.reload();
                })
            })
    })
})