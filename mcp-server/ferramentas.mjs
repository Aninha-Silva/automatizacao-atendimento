
import { randomInt } from "node:crypto";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const { analisarConversa } = require("../src/analisadorDeConversa.js");
const { validarHistorico } = require("../src/validadorDeHistorico.js");

// Ferramenta de exemplo da Aula 7.
export function rolarDado(lados) {
  if (!Number.isInteger(lados) || lados < 2 || lados > 1000) {
    throw new Error("lados precisa ser um inteiro entre 2 e 1000");
  }

  return randomInt(1, lados + 1);
}

// Analisa um histórico usando a lógica existente do projeto de RH.
export function analisarAtendimentoRH(historico) {
  const validacao = validarHistorico(historico);

  if (!validacao.valido) {
    return { valido: false, erros: validacao.erros };
  }

  return {
    valido: true,
    ...analisarConversa(historico),
  };
}

// Valida a estrutura de um histórico sem interpretar as mensagens.
export function validarHistoricoAtendimento(historico) {
  return validarHistorico(historico);
}
