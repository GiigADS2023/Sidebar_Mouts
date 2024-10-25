const btnMouts = document.querySelector(".toggle-btn");
const dropdownLinks = document.querySelectorAll(".has-dropdown");
const sidebar = document.querySelector(".sidebar");
const headers = document.querySelectorAll(".sidebar h4");
const logo = document.querySelector(".sidebar-logo a");

// Função para expandir/recolher a sidebar com o toggle-btn
btnMouts.addEventListener("click", function () {
    sidebar.classList.toggle("expand");
    toggleVisibility(sidebar.classList.contains("expand"));
});

// Função para expandir sidebar e abrir submenu ao clicar no link principal
dropdownLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Evita comportamento padrão do link

        // Se a sidebar não estiver expandida, expande
        if (!sidebar.classList.contains("expand")) {
            sidebar.classList.add("expand");
            toggleVisibility(true);
        }

        // Alterna o submenu correspondente
        const isActive = this.classList.contains("active");
        closeAllDropdowns(); // Fecha outros submenus

        if (!isActive) {
            this.classList.add("active");
            const dropdown = this.nextElementSibling;
            dropdown.style.opacity = "1";
            dropdown.style.maxHeight = "15em";
        }
    });
});

// Função para fechar todos os submenus
function closeAllDropdowns() {
    dropdownLinks.forEach(link => {
        link.classList.remove("active");
        const dropdown = link.nextElementSibling;
        if (dropdown) {
            dropdown.style.opacity = "0";
            dropdown.style.maxHeight = "0";
        }
    });
}

// Função para alternar visibilidade e opacidade dos elementos da sidebar
function toggleVisibility(isExpanded) {
    headers.forEach(header => {
        header.style.visibility = isExpanded ? "visible" : "hidden";
        header.style.opacity = isExpanded ? "1" : "0";
    });
    logo.style.visibility = isExpanded ? "visible" : "hidden";
    logo.style.opacity = isExpanded ? "1" : "0";
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const dropdownLinks = document.querySelectorAll('.has-dropdown');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        closeAllDropdowns();
    });

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const dropdown = link.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('active');
                closeAllDropdowns(dropdown);
            }
            event.preventDefault(); 
        });
    });

    function closeAllDropdowns(exceptDropdown = null) {
        dropdownLinks.forEach(link => {
            const dropdown = link.nextElementSibling;
            if (dropdown && dropdown !== exceptDropdown) {
                dropdown.classList.remove('active');
            }
        });
    }
});
