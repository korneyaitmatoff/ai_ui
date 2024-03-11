document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("login")) {
        document.querySelector(".logout").addEventListener("click", function() {
            sessionStorage.removeItem('login');
    
            window.location.replace("/auth.php");
        })
    }
    
})