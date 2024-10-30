function carregarConteudo(url, event) {
    event.preventDefault();  // Impede a navegação padrão

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o conteúdo: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const conteudoPrincipal = document.getElementById('conteudo-principal');
            conteudoPrincipal.innerHTML = data;

            // Carregar JS e CSS do conteúdo injetado
            carregarRecursos(conteudoPrincipal);
        })
        .catch(error => console.error(error));
}

function carregarRecursos(container) {
    // Carregar scripts presentes no HTML injetado
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
        const novoScript = document.createElement('script');
        novoScript.src = script.src;
        document.body.appendChild(novoScript);
    });

    // Carregar estilos (caso precise)
    const estilos = container.querySelectorAll('link[rel="stylesheet"]');
    estilos.forEach(estilo => {
        const novoEstilo = document.createElement('link');
        novoEstilo.rel = 'stylesheet';
        novoEstilo.href = estilo.href;
        document.head.appendChild(novoEstilo);
    });

    console.log('Recursos carregados com sucesso.');
}


document.addEventListener('DOMContentLoaded', () => {
    const btnMouts = document.querySelector(".toggle-btn");
    const dropdownLinks = document.querySelectorAll(".has-dropdown");
    const sidebar = document.querySelector(".sidebar");

    // Toggle sidebar
    btnMouts.addEventListener("click", function () {
        sidebar.classList.toggle("expand");
    });

    dropdownLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const isActive = this.classList.contains("active");
            closeAllDropdowns();

            if (!isActive) {
                this.classList.add("active");
                const dropdown = this.nextElementSibling;
                if (dropdown) {
                    dropdown.style.opacity = "1";
                    dropdown.style.maxHeight = "15em";
                }
            }
        });
    });

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
});
