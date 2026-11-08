"use strict";

/**
 * Transforma o histórico bruto (já validado) em uma estrutura organizada
 * para ser consumida pelo interpretador.
 * Não toma decisões sobre o conteúdo — apenas separa e agrega.
 *
 * @param {Array<{autor: string, mensagem: string}>} historico
 * @returns {{
 *   mensagensDoColaborador: string[],
 *   mensagensDaIA: string[],
 *   textoDoColaborador: string,
 *   totalDeMensagens: number
 * }}
 */
function normalizarHistorico(historico) {
  const mensagensDoColaborador = historico
    .filter((entrada) => entrada.autor === "colaborador")
    .map((entrada) => entrada.mensagem.trim());

  const mensagensDaIA = historico
    .filter((entrada) => entrada.autor === "ia")
    .map((entrada) => entrada.mensagem.trim());

  return {
    mensagensDoColaborador,
    mensagensDaIA,
    textoDoColaborador: mensagensDoColaborador.join(" "),
    totalDeMensagens: historico.length,
  };
}

module.exports = { normalizarHistorico };
