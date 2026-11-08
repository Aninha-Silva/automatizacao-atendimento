"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { normalizarHistorico } = require("../src/normalizadorDeHistorico");

const historicoMisto = [
  { autor: "colaborador", mensagem: "  Tenho uma dúvida.  " },
  { autor: "ia", mensagem: "Pode descrever melhor?" },
  { autor: "colaborador", mensagem: "Meu salário veio errado." },
  { autor: "ia", mensagem: "Vou verificar." },
];

test("separa mensagens do colaborador corretamente", () => {
  const resultado = normalizarHistorico(historicoMisto);
  assert.deepEqual(resultado.mensagensDoColaborador, [
    "Tenho uma dúvida.",
    "Meu salário veio errado.",
  ]);
});

test("separa mensagens da IA corretamente", () => {
  const resultado = normalizarHistorico(historicoMisto);
  assert.deepEqual(resultado.mensagensDaIA, ["Pode descrever melhor?", "Vou verificar."]);
});

test("remove espaços extras no início e no fim das mensagens", () => {
  const resultado = normalizarHistorico(historicoMisto);
  assert.equal(resultado.mensagensDoColaborador[0], "Tenho uma dúvida.");
});

test("agrupa todas as mensagens do colaborador em uma única string separada por espaço", () => {
  const resultado = normalizarHistorico(historicoMisto);
  assert.equal(resultado.textoDoColaborador, "Tenho uma dúvida. Meu salário veio errado.");
});

test("conta o total correto de mensagens no histórico", () => {
  const resultado = normalizarHistorico(historicoMisto);
  assert.equal(resultado.totalDeMensagens, 4);
});

test("retorna array vazio para mensagensDaIA quando não há mensagens da IA", () => {
  const apenasColaborador = [
    { autor: "colaborador", mensagem: "Olá." },
    { autor: "colaborador", mensagem: "Preciso de ajuda." },
  ];
  const resultado = normalizarHistorico(apenasColaborador);
  assert.deepEqual(resultado.mensagensDaIA, []);
});

test("retorna array vazio para mensagensDoColaborador quando não há mensagens do colaborador", () => {
  const apenasIA = [{ autor: "ia", mensagem: "Como posso ajudar?" }];
  const resultado = normalizarHistorico(apenasIA);
  assert.deepEqual(resultado.mensagensDoColaborador, []);
  assert.equal(resultado.textoDoColaborador, "");
});

test("resultado contém as quatro propriedades esperadas", () => {
  const resultado = normalizarHistorico(historicoMisto);
  assert.ok("mensagensDoColaborador" in resultado);
  assert.ok("mensagensDaIA" in resultado);
  assert.ok("textoDoColaborador" in resultado);
  assert.ok("totalDeMensagens" in resultado);
});
