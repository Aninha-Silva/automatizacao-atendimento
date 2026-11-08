"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validarHistorico } = require("../src/validadorDeHistorico");

test("aceita histórico com entradas válidas de ambos os autores", () => {
  const historico = [
    { autor: "colaborador", mensagem: "Tenho uma dúvida sobre meu pagamento." },
    { autor: "ia", mensagem: "Pode descrever melhor a situação?" },
  ];
  const resultado = validarHistorico(historico);
  assert.equal(resultado.valido, true);
  assert.deepEqual(resultado.erros, []);
});

test("aceita histórico com apenas mensagens do colaborador", () => {
  const historico = [{ autor: "colaborador", mensagem: "Olá, preciso de ajuda." }];
  const resultado = validarHistorico(historico);
  assert.equal(resultado.valido, true);
});

test("rejeita histórico que não é um array", () => {
  const resultado = validarHistorico("não sou um array");
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.length > 0);
});

test("rejeita histórico vazio", () => {
  const resultado = validarHistorico([]);
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.some((e) => e.toLowerCase().includes("vazio")));
});

test("rejeita entrada sem a propriedade autor", () => {
  const resultado = validarHistorico([{ mensagem: "Olá." }]);
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.some((e) => e.includes("autor")));
});

test("rejeita entrada sem a propriedade mensagem", () => {
  const resultado = validarHistorico([{ autor: "colaborador" }]);
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.some((e) => e.includes("mensagem")));
});

test("rejeita autor com valor não reconhecido", () => {
  const resultado = validarHistorico([{ autor: "gestor", mensagem: "Olá." }]);
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.some((e) => e.includes("gestor")));
});

test("rejeita mensagem que contém apenas espaços em branco", () => {
  const resultado = validarHistorico([{ autor: "colaborador", mensagem: "   " }]);
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.some((e) => e.includes("mensagem")));
});

test("identifica múltiplos erros em um único histórico inválido", () => {
  const historico = [
    { autor: "colaborador", mensagem: "" },
    { autor: "desconhecido", mensagem: "Olá" },
    { mensagem: "Sem autor aqui" },
  ];
  const resultado = validarHistorico(historico);
  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.length >= 3);
});

test("retorna erros como array mesmo quando há um único erro", () => {
  const resultado = validarHistorico([]);
  assert.ok(Array.isArray(resultado.erros));
});
