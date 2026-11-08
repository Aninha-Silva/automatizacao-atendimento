"use strict";

// Dados fictícios — nenhuma informação real de colaborador ou empresa.
const conversa = [
  { autor: "colaborador", mensagem: "Estou com dúvidas sobre meu pagamento deste mês." },
  { autor: "ia", mensagem: "Você pode consultar seu contracheque pelo portal do colaborador." },
  {
    autor: "colaborador",
    mensagem:
      "Eu já consultei. O valor veio diferente do que eu esperava porque tive uma alteração na minha jornada.",
  },
  { autor: "ia", mensagem: "Para essa situação, recomendamos entrar em contato com o RH." },
];

module.exports = { conversa };
