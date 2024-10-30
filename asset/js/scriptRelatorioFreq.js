(() => {
    const dateInput = document.getElementById('data');
    const outputDiv = document.getElementById('turma');
    const pesquisarBtn = document.getElementById('pesquisar');

const tabela = `
  <table class="table table-hover">
      <thead>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Aluno</th>
              <th scope="col">Matéria</th>
              <th scope="col">Frequência</th>
          </tr>
      </thead>
      <tbody>
          <tr onclick="toggleCheckbox(event, this)">
              <th scope="row">1</th>
              <td>Lucas Martini</td>
              <td>História</td>                  
              <td></td>
          </tr>
          <tr onclick="toggleCheckbox(event, this)">
              <th scope="row">2</th>
              <td>Lucas Martini</td>
              <td>História</td>                  
              <td></td>
          </tr>
          <tr onclick="toggleCheckbox(event, this)">
              <th scope="row">3</th>
              <td>Lucas Martini</td>
              <td>História</td>                  
              <td></td>
          </tr>
      </tbody>
      
  </table>`;

const tabelaResponsiva = `
  <table class="table table-hover" id="tabela-responsiva">
      <thead>
          <tr>
              <th scope="col">Aluno</th>
              <th scope="col">Matéria</th>
              <th scope="col">Frequência</th>
          </tr>
      </thead>
      <tbody>
          <tr onclick="toggleCheckbox(event, this)">
              <td>Lucas Martini</td>
              <td>História</td>                    
              <td></td>
          </tr>
          <tr onclick="toggleCheckbox(event, this)">
              <td>Lucas Martini</td>
              <td>História</td>             
              <td></td>
          </tr>
          <tr onclick="toggleCheckbox(event, this)">
              <td>Lucas Martini</td>
              <td>História</td>                   
              <td></td>
          </tr>
      </tbody>      
  </table>`;


function selectAll(selectAllCheckbox) {
    const checkboxes = document.querySelectorAll('.presenca-check');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

function toggleCheckbox(event, row) {
    const checkbox = row.querySelector('.presenca-check');
    if (event.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
    }
}
function exibirTabela() {
    outputDiv.innerHTML = window.innerWidth > 1025 ? tabela : tabelaResponsiva;

    const formItems = document.getElementById('formItems')
    const form = document.getElementById('form')
    const formInputs = document.getElementsByClassName('form-input')
    const btnPesquisar = document.getElementById('pesquisar')

    form.style.width = '80%'
    form.style.paddingLeft = '15px'
    form.style.paddingRight = '15px'
    form.style.paddingTop = '10px'
    form.style.paddingBottom = '10px'
    form.style.height = 'auto'


    formItems.style.display = 'flex'
    formItems.style.gap = '20px'
    formItems.style.alignItems = 'center'

    Array.from(formInputs).forEach(input => {
        input.style.width = '200px';
    });

    btnPesquisar.style.marginTop = '30px'

}

pesquisarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    exibirTabela();
});

window.addEventListener('resize', exibirTabela);
})();