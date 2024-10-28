function adicionarNovoModulo() {
    const titulo = prompt("Insira o Título do Módulo:");
    const resumo = prompt("Insira um resumo do Módulo:");
    const imgUrl = prompt("Insira a URL da imagem:");

    if (titulo && resumo && imgUrl) {
        const cardsContainer = document.getElementById('cards-container');
        const novoCard = document.createElement('div');
        novoCard.className = 'col-lg-3 col-md-4 col-sm-6 col-12';

        novoCard.innerHTML = `
            <div class="card">
                <img src="${imgUrl}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${resumo}</p>
                    <a href="acessarModulo.index" class="btn btn-primary">Acessar módulo</a>
                </div>
            </div>
        `;

        cardsContainer.appendChild(novoCard);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}
