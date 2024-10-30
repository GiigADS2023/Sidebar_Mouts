const dateInput = document.getElementById('data');
const outputDiv = document.getElementById('turma');
const materiaSelect = document.getElementById('sMateria');

const tabelaResponsiva = `
  <table class="table table-hover" id="tabela-responsiva">
      <thead>
          <tr>
              <th scope="col">Nome</th>
              <th scope="col">Presença</th>
          </tr>
      </thead>
      <tbody>
          <tr onclick="toggleCheckbox(event, this)">
              <td>Lucas Martini</td>                    
              <td><input type="checkbox" class="form-check-input presenca-check"></td>
          </tr>
          <tr onclick="toggleCheckbox(event, this)">
              <td>Lucas Martini</td>
              <td><input type="checkbox" class="form-check-input presenca-check" checked></td>
          </tr>
      </tbody>
      <tfoot>
        <tr>             
          <th>-</th>                
          <th>Selecionar todos<br> <input type="checkbox" class="form-check-input" id="selecionar-todos-check" onclick="selectAll(this)"></th>
        </tr>
        <tr>              
          <td colspan="2"><button class="btn" id="salvar">Salvar</button></td>  
        </tr>
      </tfoot>
  </table>`;

document.addEventListener("DOMContentLoaded", function() {
  popularSelectMateria();
  
  // Define a data máxima como a data de hoje
  const hoje = new Date().toISOString().split('T')[0]; // Obtém a data no formato 'YYYY-MM-DD'
  dateInput.setAttribute('max', hoje);
});

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

function saveCheckboxState() {
  return Array.from(document.querySelectorAll('.presenca-check')).map(checkbox => checkbox.checked);
}

function restoreCheckboxState(states) {
  const checkboxes = document.querySelectorAll('.presenca-check');
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = states[index];
  });
}

function updateTable() {

  if(validarDataAnterior()){
    fetch(`https://localhost:5000/presence?datePresence=${dateInput.value}&subject=${materiaSelect.value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        let tabela = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Matéria</th>
                        <th scope="col">Presença</th>
                    </tr>
                </thead>
                <tbody>`;

        let contador = 0;
        for (let item of data.presences) {
            contador++;
            tabela += `
                <tr onclick="">
                    <th scope="row">${contador}</th>
                    <td>Lucas Martini</td>                    
                    <td>${item.subject.id}</td>
                    <td><input type="checkbox" class="form-check-input presenca-check" id="${item.student.id}" checked disabled></td>
                </tr>`;
        }

        tabela += `
            </tbody>
            <tfoot>
                <tr>             
                  <th>-</th>                
                  <th>-</th>                
                  <th>-</th>                
                  <th>Selecionar todos<br> <input type="checkbox" class="form-check-input" id="selecionar-todos-check" onclick="selectAll(this)" disabled></th>
                </tr>
                <tr>              
                  <td colspan="4"><button class="btn" id="salvar" onClick="salvarPresencas()" disabled>Salvar</button></td>  
                </tr>
            </tfoot>
        </table>`; 

        outputDiv.innerHTML = tabela;
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    }

  const checkboxStates = saveCheckboxState();
  restoreCheckboxState(checkboxStates);

  const formItems = document.getElementById('formItems')
  const form = document.getElementById('form')
  
  form.style.width = 'auto'
  form.style.paddingLeft = '15px'
  form.style.paddingRight = '15px'
  form.style.paddingTop = '10px'
  form.style.paddingBottom = '10px'
  form.style.height = 'auto'

  formItems.style.display = 'flex'
  formItems.style.gap = '20px'
}

dateInput.addEventListener('change', function () {
  if (dateInput.value && materiaSelect.value) {
    updateTable();
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth <= 1025) {
    outputDiv.innerHTML = tabelaResponsiva;
  } else if (dateInput.value && materiaSelect.value) {
    updateTable();
  }
});

function popularSelectMateria() {
  fetch('https://localhost:5000/presence')
      .then(response => {
          if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Dados recebidos:', data);

          const idsMaterias = [...new Set(data.presences.map(presence => presence.subject.id))];
          let options = '';

          for (let item of idsMaterias) {
              options += `<option value="${item}">${item}</option>`;
          }

          materiaSelect.innerHTML += options;
      })
      .catch(error => {
          console.error('Erro:', error);
    });
}

function salvarPresencas(){
  const boxes = document.getElementsByClassName('presenca-check');

  let checkedBoxes = Array.from(boxes).filter(item => item.checked).map(item => item.id);

  let body = {
    presences: []
  }

  for(let item of checkedBoxes){
    let presenca = {
      datePresence: String(dateInput.value),
      student: {
        Id: item
      },
      teacher: {
        Id: "a12bc456-789e-4def-9d12-9f34a7b4567f"
      },
      subject: {
        Id: materiaSelect.value
      }
    }

    body.presences.push(presenca);
  }

  fetch("https://localhost:5000/presence/various", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(body) // Converte os dados para uma string JSON
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    console.log('Resposta da API:', result); // Manipula a resposta da API
  })
  .catch(error => {
    console.error('Erro:', error);
  });

  window.alert("Presenças registradas!");
}

function validarDataAnterior() {
  const dataSelecionada = new Date(dateInput.value);
  const hoje = new Date();
  
  // Zerar horas para comparar apenas a data
  hoje.setHours(0, 0, 0, 0);

  if (dataSelecionada < hoje) {
    console.log("A data selecionada é anterior a hoje.");
    return true;
  } else {
    console.log("A data selecionada é hoje ou futura.");
    return false;
  }
}