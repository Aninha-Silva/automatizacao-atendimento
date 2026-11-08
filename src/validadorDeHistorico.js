"use strict";

const AUTORES_VALIDOS = ["colaborador", "ia"];

/**
 * Verifica se o histórico recebido está no formato esperado.
 * Não interpreta o conteúdo — apenas valida a estrutura.
 *
 * @param {unknown} historico
 * @returns {{ valido: boolean, erros: string[] }}
 */
function validarHistorico(historico) {
  if (!Array.isArray(historico)) {
    return { valido: false, erros: ['O histórico deve ser um array de mensagens.'] };
  }

  if (historico.length === 0) {
    return { valido: false, erros: ['O histórico está vazio.'] };
  }

  const erros = [];

  historico.forEach((entrada, indice) => {
    if (typeof entrada !== "object" || entrada === null || Array.isArray(entrada)) {
      erros.push(`Entrada [${indice}]: deve ser um objeto com as propriedades "autor" e "mensagem".`);
      return;
    }

    if (typeof entrada.autor !== "string" || entrada.autor.trim() === "") {
      erros.push(`Entrada [${indice}]: "autor" deve ser uma string não vazia.`);
    } else if (!AUTORES_VALIDOS.includes(entrada.autor)) {
      erros.push(
        `Entrada [${indice}]: "autor" deve ser "colaborador" ou "ia", mas recebeu "${entrada.autor}".`
      );
    }

    if (typeof entrada.mensagem !== "string" || entrada.mensagem.trim() === "") {
      erros.push(`Entrada [${indice}]: "mensagem" deve ser uma string não vazia.`);
    }
  });

  return { valido: erros.length === 0, erros };
}

module.exports = { validarHistorico };
