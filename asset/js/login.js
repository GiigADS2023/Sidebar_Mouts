document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://54.89.142.197:8080/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login incorreto ou erro na conexão.");
      }

      const token = await response.text();
      localStorage.setItem("token", token);

      window.location.href = "/pages/home.html";
    } catch (error) {
      alert(error.message);
    }
  });
});
