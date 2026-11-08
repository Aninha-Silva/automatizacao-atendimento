"use strict";

const { validarHistorico } = require("./validadorDeHistorico");
const { normalizarHistorico } = require("./normalizadorDeHistorico");
const interpretadorPadrao = require("./interpretadorSimulado");

/**
 * Coordena o pipeline de análise de uma conversa de atendimento de RH.
 *
 * Pipeline: validação → normalização → interpretação.
 *
 * Aceita um interpretador opcional. Se não fornecido, usa o interpretador simulado.
 * Para integrar um LLM futuramente, basta criar um módulo que exporte
 * a função interpretar(historicoNormalizado) e passá-lo como segundo argumento.
 *
 * @param {Array<{autor: string, mensagem: string}>} historico
 * @param {{ interpretar: function }} interpretador - opcional
 * @returns {{
 *   resumo: string,
 *   assuntoPrincipal: string,
 *   informacoesFornecidas: string[],
 *   informacoesFaltantes: string[]
 * }}
 */
function analisarConversa(historico, interpretador = interpretadorPadrao) {
  const validacao = validarHistorico(historico);

  if (!validacao.valido) {
    return {
      resumo: "Não foi possível analisar a conversa.",
      assuntoPrincipal: "Não identificado",
      informacoesFornecidas: [],
      informacoesFaltantes: validacao.erros,
    };
  }

  const historicoNormalizado = normalizarHistorico(historico);

  return interpretador.interpretar(historicoNormalizado);
}

module.exports = { analisarConversa };
