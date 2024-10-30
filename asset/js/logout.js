document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logout");

    if (logout) {
        logout.addEventListener("click", (event) => {
            event.preventDefault();

            localStorage.removeItem("token");

            window.location.href = "login.html";
        });
    }
});
