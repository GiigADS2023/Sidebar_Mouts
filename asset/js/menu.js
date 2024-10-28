function carregarConteudo(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o conteúdo: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('conteudo-principal').innerHTML = data;
            carregarScriptsModulos(); // Carregar scripts após o conteúdo
        })
        .catch(error => console.error(error));
}

function carregarScriptsModulos() {
    const scriptsAntigos = document.querySelectorAll('#conteudo-principal script');
    scriptsAntigos.forEach(script => script.remove());

    const scriptNovo = document.createElement('script');
    scriptNovo.src = 'asset/js/scriptModulos.js'; // Caminho correto para o script
    scriptNovo.onload = () => {
        // Agora que o script foi carregado, adiciona o listener ao botão
        const btnNovoModulo = document.querySelector('.btn_novoModulo');
        if (btnNovoModulo) {
            btnNovoModulo.addEventListener('click', adicionarNovoModulo);
        }
    };
    document.body.appendChild(scriptNovo); 
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
