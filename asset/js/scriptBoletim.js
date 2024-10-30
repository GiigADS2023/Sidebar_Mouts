function gerarCamposNotas(btn) {
    var camposNotasDiv = btn.parentNode.querySelector('.camposNotas');
    camposNotasDiv.innerHTML = '';

    var quantidadeNotas = btn.parentNode.querySelector('.QuantidadeNotas').value;

    for (var i = 1; i <= quantidadeNotas; i++) {
        var label = document.createElement('label');
        label.textContent = 'Nota ' + i + ':';
        camposNotasDiv.appendChild(label);

        var input = document.createElement('input');
        input.type = 'number';
        input.name = 'nota';
        input.placeholder = 'Digite a nota ' + i;
        input.required = true;
        input.step = 'any';

        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.marginBottom = '20px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '10px';
        input.style.boxSizing = 'border-box';
        input.style.fontSize = '16px';

        camposNotasDiv.appendChild(input);
    }
}

function adicionarMateria() {
    var materiasContainer = document.getElementById('materiasContainer');
    var materiaSection = document.createElement('div');
    materiaSection.classList.add('materiaSection');

    materiaSection.innerHTML = `
        <label for="Professor">Nome do Professor:</label><input type="text" id="Professor" name="Professor" placeholder="Professor" required><br><br>
        <label for="materia">Escolha uma matéria:</label>
        <select class="materia">
            <option>Matemática</option>
            <option>Português</option>
            <option>Geografia</option>
        </select>
        <label for="QuantidadeNotas">Quantas notas serão inseridas?</label>
        <input type="number" class="QuantidadeNotas" name="QuantidadeNotas" placeholder="Quantidade de notas" required>
        <button type="button" class="btnNotas" onclick="gerarCamposNotas(this)">Gerar Campos de Notas</button>
        <div class="camposNotas"></div>
    `;

    materiasContainer.appendChild(materiaSection);
}

// function calcularMedia() {
//     var nomeAluno = document.getElementById('Aluno').value;
//     var nomeProfessor = document.getElementById('Professor').value;
//     var anoAluno = document.getElementById('curso').value;

//     document.getElementById('boletimAluno').textContent = 'Aluno: ' + nomeAluno;
//     document.getElementById('boletimAno').textContent = 'Ano: ' + anoAluno;

//     var materiaSections = document.querySelectorAll('.materiaSection');
//     var boletimMateriasDiv = document.getElementById('boletimMaterias');
//     boletimMateriasDiv.innerHTML = '';

//     materiaSections.forEach(function (materiaSection) {
        
//         var materia = materiaSection.querySelector('.materia').value;
//         var quantidadeNotas = materiaSection.querySelector('.QuantidadeNotas').value;
//         var soma = 0;

//         var notas = materiaSection.querySelectorAll('input[name="nota"]');
//         notas.forEach(function (nota) {
//             soma += parseFloat(nota.value);
//         });

//         var media = soma / notas.length;
//         var situacao = estaAprovado(media);

//         var boletimMateria = document.createElement('div');
//         boletimMateria.innerHTML = `
//         <br>
//             <p><strong>Matéria:</strong> ${nomeProfessor}</p>
//             <p><strong>Matéria:</strong> ${materia}</p>
//             <p><strong>Média:</strong> ${media.toFixed(2)}</p>
//             <p><strong>Situação:</strong> ${situacao}</p>
//             <hr>
//         <br>
//         `;

//         boletimMateriasDiv.appendChild(boletimMateria);
//     });

//     document.getElementById('boletim').style.display = 'block';
// }

// function estaAprovado(media) {
//     return media >= 6 ? 'Aprovado' : 'Reprovado';
//  }