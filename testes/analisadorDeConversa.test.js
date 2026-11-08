"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { analisarConversa } = require("../src/analisadorDeConversa");

// --- Históricos fictícios ---

// Situação 1: escrita direta
const conversaFormaA = [
  { autor: "colaborador", mensagem: "Estou com dúvidas sobre meu pagamento deste mês." },
  { autor: "ia", mensagem: "Você consultou o contracheque?" },
  { autor: "colaborador", mensagem: "Sim, já consultei. O valor veio diferente do que eu esperava porque tive uma alteração na minha jornada." },
  { autor: "ia", mensagem: "Recomendamos entrar em contato com o RH." },
];

// Situação equivalente à anterior, escrita de forma diferente.
// O simulador NÃO reconhece equivalência semântica — isso é esperado e documentado.
const conversaFormaB = [
  { autor: "colaborador", mensagem: "Meu pagamento veio diferente do que eu esperava." },
  { autor: "ia", mensagem: "Você consultou seu contracheque?" },
  { autor: "colaborador", mensagem: "Sim, mas não consegui entender a diferença. Minha jornada foi alterada recentemente." },
  { autor: "ia", mensagem: "Para essa situação, recomendamos falar com o RH." },
];

// Situação 3: terceira formulação do mesmo cenário
const conversaFormaC = [
  { autor: "colaborador", mensagem: "Recebi um valor diferente do esperado no meu pagamento." },
  { autor: "ia", mensagem: "Pode verificar se houve alguma alteração no seu cadastro?" },
  { autor: "colaborador", mensagem: "Verifiquei e encontrei uma alteração de jornada que não reconheço." },
];

// Informações incompletas: apenas uma mensagem curta
const conversaIncompleta = [
  { autor: "colaborador", mensagem: "Preciso de ajuda." },
  { autor: "ia", mensagem: "Pode descrever a situação?" },
];

// Histórico com apenas a IA falando (sem mensagens do colaborador)
const conversaSemColaborador = [
  { autor: "ia", mensagem: "Olá, como posso ajudar?" },
];

// --- Testes: estrutura de saída ---

test("resultado sempre contém as quatro propriedades esperadas", () => {
  const resultado = analisarConversa(conversaFormaA);
  assert.ok("resumo" in resultado, "Deve conter 'resumo'");
  assert.ok("assuntoPrincipal" in resultado, "Deve conter 'assuntoPrincipal'");
  assert.ok("informacoesFornecidas" in resultado, "Deve conter 'informacoesFornecidas'");
  assert.ok("informacoesFaltantes" in resultado, "Deve conter 'informacoesFaltantes'");
});

test("informacoesFornecidas e informacoesFaltantes são sempre arrays", () => {
  const resultado = analisarConversa(conversaFormaA);
  assert.ok(Array.isArray(resultado.informacoesFornecidas));
  assert.ok(Array.isArray(resultado.informacoesFaltantes));
});

test("resumo é uma string não vazia", () => {
  const resultado = analisarConversa(conversaFormaA);
  assert.ok(typeof resultado.resumo === "string" && resultado.resumo.length > 0);
});

// --- Testes: extração fiel do conteúdo ---

test("informacoesFornecidas contém texto do colaborador sem alteração de sentido", () => {
  const resultado = analisarConversa(conversaFormaA);
  assert.ok(resultado.informacoesFornecidas.length > 0, "Deve identificar ao menos uma informação");
  // Verifica que o texto extraído vem do próprio colaborador (não foi inventado)
  const textoDoColaborador = "Sim, já consultei. O valor veio diferente do que eu esperava porque tive uma alteração na minha jornada.";
  const algumItemVemDoTexto = resultado.informacoesFornecidas.some((info) =>
    textoDoColaborador.includes(info) || info.includes("Sim") || info.includes("valor")
  );
  assert.ok(algumItemVemDoTexto, "As informações fornecidas devem ser derivadas do texto do colaborador");
});

test("resumo não inventa informações ausentes no histórico", () => {
  const resultado = analisarConversa(conversaFormaA);
  // O resumo deve mencionar o que o colaborador disse, não adicionar novos fatos
  assert.ok(!resultado.resumo.includes("aprovado"), "Não deve inventar conclusões");
  assert.ok(!resultado.resumo.includes("resolvido"), "Não deve inventar conclusões");
});

test("assunto extraído é derivado do texto do colaborador", () => {
  const resultado = analisarConversa(conversaFormaA);
  assert.ok(typeof resultado.assuntoPrincipal === "string");
  assert.ok(resultado.assuntoPrincipal.length > 0);
  // O assunto deve conter algum termo presente na conversa (não uma categoria inventada)
  const textoConversa = "pagamento deste mês dúvidas";
  const assuntoTemRelacaoComTexto = textoConversa
    .split(" ")
    .some((palavra) => resultado.assuntoPrincipal.toLowerCase().includes(palavra));
  assert.ok(assuntoTemRelacaoComTexto, `Assunto identificado: "${resultado.assuntoPrincipal}"`);
});

// --- Testes: diferentes formas de escrita ---

test("retorna estrutura válida para conversa escrita de forma diferente (forma B)", () => {
  const resultado = analisarConversa(conversaFormaB);
  assert.ok("resumo" in resultado);
  assert.ok(Array.isArray(resultado.informacoesFornecidas));
  assert.ok(Array.isArray(resultado.informacoesFaltantes));
  assert.ok(resultado.resumo.length > 0);
});

test("extrai informações fornecidas mesmo com formulação diferente (forma B)", () => {
  const resultado = analisarConversa(conversaFormaB);
  assert.ok(resultado.informacoesFornecidas.length > 0);
});

test("retorna estrutura válida para uma terceira formulação do mesmo cenário (forma C)", () => {
  const resultado = analisarConversa(conversaFormaC);
  assert.ok("resumo" in resultado);
  assert.ok(resultado.informacoesFornecidas.length > 0);
  assert.ok(resultado.assuntoPrincipal.length > 0);
});

// --- Testes: informações incompletas ---

test("identifica lacunas quando a conversa tem apenas uma mensagem curta", () => {
  const resultado = analisarConversa(conversaIncompleta);
  assert.ok(resultado.informacoesFaltantes.length > 0, "Deve identificar pontos em aberto");
});

test("assunto é uma string não vazia mesmo em conversa incompleta", () => {
  const resultado = analisarConversa(conversaIncompleta);
  assert.ok(typeof resultado.assuntoPrincipal === "string");
  assert.ok(resultado.assuntoPrincipal.length > 0);
});

test("explicita que não há informações do colaborador quando a conversa não tem mensagens dele", () => {
  const resultado = analisarConversa(conversaSemColaborador);
  assert.equal(resultado.informacoesFornecidas.length, 0);
});

// --- Testes: históricos inválidos ---

test("retorna resultado com 'Não identificado' quando o histórico não é um array", () => {
  const resultado = analisarConversa("texto puro");
  assert.equal(resultado.assuntoPrincipal, "Não identificado");
  assert.equal(resultado.informacoesFornecidas.length, 0);
  assert.ok(resultado.informacoesFaltantes.length > 0);
});

test("retorna resultado com 'Não identificado' quando o histórico está vazio", () => {
  const resultado = analisarConversa([]);
  assert.equal(resultado.assuntoPrincipal, "Não identificado");
  assert.ok(resultado.informacoesFaltantes.length > 0);
});

test("retorna resultado com erro quando uma entrada está sem autor", () => {
  const resultado = analisarConversa([{ mensagem: "Olá." }]);
  assert.equal(resultado.assuntoPrincipal, "Não identificado");
  assert.ok(resultado.informacoesFaltantes.some((e) => e.includes("autor")));
});

test("retorna resultado com erro quando o autor é desconhecido", () => {
  const resultado = analisarConversa([{ autor: "supervisor", mensagem: "Olá." }]);
  assert.equal(resultado.assuntoPrincipal, "Não identificado");
  assert.ok(resultado.informacoesFaltantes.some((e) => e.includes("supervisor")));
});

// --- Testes: interpretador substituível ---

test("aceita um interpretador externo como segundo argumento", () => {
  const interpretadorExterno = {
    interpretar: () => ({
      assuntoPrincipal: "Assunto definido externamente",
      informacoesFornecidas: ["Dado fornecido externamente"],
      informacoesFaltantes: [],
      resumo: "Resumo gerado externamente",
    }),
  };
  const resultado = analisarConversa(conversaFormaA, interpretadorExterno);
  assert.equal(resultado.assuntoPrincipal, "Assunto definido externamente");
  assert.equal(resultado.resumo, "Resumo gerado externamente");
});

test("usa o interpretador simulado por padrão quando nenhum é informado", () => {
  const resultado = analisarConversa(conversaFormaA);
  // O interpretador simulado sempre retorna strings não vazias
  assert.ok(typeof resultado.assuntoPrincipal === "string" && resultado.assuntoPrincipal.length > 0);
  assert.ok(typeof resultado.resumo === "string" && resultado.resumo.length > 0);
});
