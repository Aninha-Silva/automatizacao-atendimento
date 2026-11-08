"use strict";

const { analisarConversa } = require("../src/analisadorDeConversa");
const { conversa } = require("./conversas/divergenciaPagamento");

const resultado = analisarConversa(conversa);

console.log("=== COPILOTO DE ATENDIMENTO DE RH ===");
console.log("[ATENÇÃO: análise gerada por interpretador simulado — não representa compreensão semântica real]\n");

console.log("RESUMO:");
console.log(" ", resultado.resumo);

console.log("\nASSUNTO PRINCIPAL:");
console.log(" ", resultado.assuntoPrincipal);

console.log("\nINFORMAÇÕES FORNECIDAS PELO COLABORADOR:");
if (resultado.informacoesFornecidas.length === 0) {
  console.log("  Nenhuma identificada.");
} else {
  resultado.informacoesFornecidas.forEach((info) => console.log(" -", info));
}

console.log("\nINFORMAÇÕES QUE AINDA PRECISAM SER ESCLARECIDAS:");
if (resultado.informacoesFaltantes.length === 0) {
  console.log("  Nenhuma pendente.");
} else {
  resultado.informacoesFaltantes.forEach((info) => console.log(" -", info));
}
