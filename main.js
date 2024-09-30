/* document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-buscar-cep")
    .addEventListener("click", function () {
      // AJAX - Asynchronous JavaScript and XML
      const xhttp = new XMLHttpRequest();
      const cep = document.getElementById("cep").value;
      const endpoint = `https://viacep.com.br/ws/${cep}/json`;

      xhttp.open("GET", endpoint);
      xhttp.send();

      // https://viacep.com.br/ws/123123132/json
    });
}); */

$(document).ready(function () {
  $("#cep").mask("00000-000");

  $("#btn-buscar-cep").click(function () {
    const cep = $("#cep").val();
    const endpoint = `https://viacep.com.br/ws/${cep}/json`;
    const botao = $(this); // (this) é a mesma coisa que #btn-buscar-cep, usa-se para o código não ficar repetitivo
    $(botao).find("i").addClass("d-none");
    $(botao).find("span").removeClass("d-none");

    // $.ajax(endpoint).done(function (resposta) {
    //   const logradouro = resposta.logradouro;
    //   const bairro = resposta.bairro;
    //   const cidade = resposta.localidade;
    //   const estado = resposta.uf;
    //   const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
    //   $("#endereco").val(endereco);

    //   setTimeout(function () {
    //     $(botao).find("i").removeClass("d-none");
    //     $(botao).find("span").addClass("d-none");
    //   }, 200);

    fetch(endpoint)
      .then(function (resposta) {
        // o then ele é executado como sucesso (try), então podemos ir para os próximos (catch e finally)
        return resposta.json();
      })
      .then(function (json) {
        const logradouro = json.logradouro;
        const bairro = json.bairro;
        const cidade = json.localidade;
        const estado = json.uf;
        const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
        $("#endereco").val(endereco);
      })
      .catch(function (erro) {
        alert(
          "Ocorreu um erro ao buscar o endereço, tente novamente mais tarde."
        );
      })
      .finally(function () {
        setTimeout(function () {
          $(botao).find("i").removeClass("d-none");
          $(botao).find("span").addClass("d-none");
        }, 500);
      });
  });
});
