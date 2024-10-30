var liDados = document.getElementById('li_dados');
var liBoletim = document.getElementById('li_boletim');
var liCertificado = document.getElementById('li_certificado');

var sectionDados = document.getElementById('id_abaDados');
var sectionBoletim = document.getElementById('id_abaBoletim');
var sectionCertificado = document.getElementById('id_abaCertificado');

liDados.addEventListener('click', btDados);
liBoletim.addEventListener('click', btBoletim);
liCertificado.addEventListener('click', btCertificado);

var btgerarBoletim = document.getElementById('btImprimirBoletim');
var btgerarCertificado = document.getElementById('btImprimirCertificado');
//btgerarBoletim.addEventListener('click', funcGerarBoletim)



function btDados() {
  sectionDados.removeAttribute("hidden");
  sectionBoletim.setAttribute("hidden", "true");
  sectionCertificado.setAttribute("hidden", "true");
}

function btBoletim() {
  sectionDados.setAttribute("hidden", "true");
  sectionBoletim.removeAttribute("hidden");
  sectionCertificado.setAttribute("hidden", "true");
}

function btCertificado() {
  sectionDados.setAttribute("hidden", "true");
  sectionBoletim.setAttribute("hidden", "true");
  sectionCertificado.removeAttribute("hidden");
}

btgerarBoletim.addEventListener("click", () => {

  // pega a div do conteudo que desejamo gerar o pdf
  //const content = document.querySelector('#content');
  const content = document.getElementById('id_abaBoletim2');
  //configuração da bilioteca html2pdf
  const options = {
      margin: 1,
      filename: "boletim.pdf",
      html2canvas: { scale: 2 },
      image: { type: 'jpeg', quality: 1 },
      jsPDF: { unit: "cm", format: "a4", orientation: "landscape" }
  }

  //gerar e baixar pdf
  //html2pdf().set(options).from(content).save();
  //window.alert("entrou aqui")

  html2pdf()
    .from(content)
    .set(options)
    .save()
    .catch((error) => window.alert("erro"));
});




btgerarCertificado.addEventListener("click", () => {

  // pega a div do conteudo que desejamo gerar o pdf
  //const content = document.querySelector('#content');
  const content = document.getElementById('id_abaCertificado2');
  //configuração da bilioteca html2pdf
  const options = {
      margin: 1,
      filename: "Certificado.pdf",
      html2canvas: { scale: 2 },
      image: { type: 'jpeg', quality: 1 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
  }

  //gerar e baixar pdf
  //html2pdf().set(options).from(content).save();
  //window.alert("entrou aqui")

  html2pdf()
    .from(content)
    .set(options)
    .save()
    .catch((error) => window.alert("erro"));
});
