
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  rolarDado,
  analisarAtendimentoRH,
  validarHistoricoAtendimento,
} from "../ferramentas.mjs";

test("rolar_dado devolve um número entre 1 e o número de lados", () => {
  for (let i = 0; i < 500; i++) {
    const n = rolarDado(20);
    assert.ok(Number.isInteger(n));
    assert.ok(n >= 1 && n <= 20, `saiu ${n}`);
  }
});

test("rolar_dado recusa dado impossível", () => {
  assert.throws(() => rolarDado(1));
  assert.throws(() => rolarDado(2.5));
  assert.throws(() => rolarDado(5000));
});

const historicoValido = [
  {
    autor: "colaborador",
    mensagem: "Olá, gostaria de saber sobre minhas férias."
  },
  {
    autor: "ia",
    mensagem: "Claro! Qual é a sua dúvida?"
  },
  {
    autor: "colaborador",
    mensagem: "Quero saber quantos dias tenho disponíveis."
  }
];

test("analisarAtendimentoRH analisa um histórico válido", () => {
  const resultado = analisarAtendimentoRH(historicoValido);

  assert.equal(resultado.valido, true);
  assert.equal(typeof resultado.resumo, "string");
  assert.equal(typeof resultado.assuntoPrincipal, "string");
  assert.ok(Array.isArray(resultado.informacoesFornecidas));
  assert.ok(Array.isArray(resultado.informacoesFaltantes));
});

test("analisarAtendimentoRH identifica histórico inválido", () => {
  const resultado = analisarAtendimentoRH([
    { autor: "desconhecido", mensagem: "Olá" }
  ]);

  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.length > 0);
});

test("validarHistoricoAtendimento aceita histórico válido", () => {
  const resultado = validarHistoricoAtendimento(historicoValido);

  assert.equal(resultado.valido, true);
  assert.deepEqual(resultado.erros, []);
});

test("validarHistoricoAtendimento identifica mensagens inválidas", () => {
  const resultado = validarHistoricoAtendimento([
    { autor: "colaborador", mensagem: "" }
  ]);

  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.length > 0);
});

test("validarHistoricoAtendimento recusa histórico vazio", () => {
  const resultado = validarHistoricoAtendimento([]);

  assert.equal(resultado.valido, false);
  assert.ok(resultado.erros.length > 0);
});
