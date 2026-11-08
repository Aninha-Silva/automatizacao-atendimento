"use strict";

/**
 * SIMULAÇÃO — Este módulo não representa compreensão semântica real.
 *
 * Utiliza extração textual heurística para estruturar as informações de uma conversa.
 * As análises dependem de padrões linguísticos simples aplicados ao texto do colaborador.
 * Variações de linguagem, sinônimos e contextos implícitos NÃO são compreendidos.
 *
 * Esta implementação deve ser substituída por um interpretador com LLM quando
 * a integração com um modelo de linguagem for disponibilizada.
 *
 * Contrato público (qualquer InterpretadorLLM futuro deve seguir a mesma assinatura):
 *
 *   interpretar(historicoNormalizado) → {
 *     assuntoPrincipal:      string,
 *     informacoesFornecidas: string[],
 *     informacoesFaltantes:  string[],
 *     resumo:                string
 *   }
 */

// Estruturas linguísticas usadas para identificar como o colaborador introduz o tópico.
// Não representam uma taxonomia de assuntos — extraem o que o colaborador escreveu.
// LIMITAÇÃO: cobrem apenas formas comuns em português conversacional.
const ESTRUTURAS_DE_INTRODUCAO = [
  /(?:dúvidas?\s+sobre|problema\s+com|questão\s+(?:sobre|referente\s+a)|situação\s+(?:com|sobre))\s+(.+?)(?:[.,!?]|$)/i,
  /(?:quero\s+saber\s+sobre|gostaria\s+de\s+(?:saber|entender)(?:\s+sobre)?)\s+(.+?)(?:[.,!?]|$)/i,
  /(?:estou\s+com|tenho\s+uma?)\s+(.+?)(?:[.,!?]|$)/i,
  /(?:meu|minha)\s+(\w+(?:\s+\w+){0,2})\s+(?:veio|está|foi|ficou|não|apresentou)/i,
  /(?:recebi|não\s+recebi)\s+(.+?)(?:[.,!?]|$)/i,
];

// Marcadores linguísticos usados para verificar dois aspectos universais de qualquer
// atendimento: se o colaborador se identificou e se forneceu referência temporal.
// NÃO formam uma lista de categorias de assunto.
const MARCADORES_DE_IDENTIFICACAO = ["nome", "matrícula", "matricula", "cpf", "chamo", "sou o", "sou a"];
const MARCADORES_DE_TEMPO = ["semana", "ontem", "mês", "mes ", "data"];

// --- Funções internas ---

function extrairAssuntoPrincipal(mensagensDoColaborador) {
  if (mensagensDoColaborador.length === 0) {
    return "Não identificado";
  }

  const primeiraMensagem = mensagensDoColaborador[0];

  for (const estrutura of ESTRUTURAS_DE_INTRODUCAO) {
    const correspondencia = primeiraMensagem.match(estrutura);
    if (correspondencia && correspondencia[1]) {
      const topico = correspondencia[1].trim();
      if (topico.length >= 3 && topico.length <= 80) {
        return topico.charAt(0).toUpperCase() + topico.slice(1);
      }
    }
  }

  // Fallback: primeira frase do primeiro relato (sem pontuação final).
  const primeiraFrase = primeiraMensagem.split(/[.!?]/)[0].trim();
  if (primeiraFrase.length > 0) {
    return primeiraFrase.charAt(0).toUpperCase() + primeiraFrase.slice(1);
  }

  return "Não identificado com precisão — consultar histórico completo";
}

function extrairInformacoesFornecidas(mensagensDoColaborador) {
  const informacoes = [];

  for (const mensagem of mensagensDoColaborador) {
    const sentencas = dividirEmSentencas(mensagem);
    for (const sentenca of sentencas) {
      if (!eDeclarativa(sentenca)) continue;
      if (sentenca.length < 8) continue; // descarta fragmentos muito curtos
      informacoes.push(sentenca);
    }
  }

  return informacoes;
}

function identificarInformacoesFaltantes(historicoNormalizado) {
  const faltantes = [];
  const textoLower = historicoNormalizado.textoDoColaborador.toLowerCase();

  // Verificação 1: o colaborador se identificou?
  const contemIdentificacao = MARCADORES_DE_IDENTIFICACAO.some((m) => textoLower.includes(m));
  if (!contemIdentificacao) {
    faltantes.push("Identificação do colaborador (nome completo e matrícula ou CPF)");
  }

  // Verificação 2: há referência temporal?
  const contemTempo =
    MARCADORES_DE_TEMPO.some((m) => textoLower.includes(m)) ||
    /dia\s+\d/.test(textoLower) ||
    /\d{1,2}\/\d{1,2}/.test(textoLower);
  if (!contemTempo) {
    faltantes.push("Referência temporal — quando a situação ocorreu ou foi identificada");
  }

  // Conversa muito curta: não há elementos suficientes para determinar outras lacunas.
  if (historicoNormalizado.mensagensDoColaborador.length <= 1) {
    faltantes.push(
      "Detalhamento adicional da situação — a conversa contém apenas uma mensagem, " +
      "não é possível identificar outras lacunas com precisão"
    );
    return faltantes;
  }

  if (faltantes.length === 0) {
    return [
      "Nenhum ponto crítico identificado como ausente com base nas verificações disponíveis. " +
      "Outros detalhes específicos podem ser necessários conforme o contexto da solicitação.",
    ];
  }

  return faltantes;
}

function gerarResumo(historicoNormalizado, informacoesFornecidas, assuntoPrincipal) {
  const { mensagensDoColaborador } = historicoNormalizado;

  if (mensagensDoColaborador.length === 0) {
    return "Nenhuma mensagem do colaborador foi encontrada no histórico.";
  }

  if (informacoesFornecidas.length === 0) {
    return (
      `O colaborador entrou em contato, mas não foram identificadas declarações factuais ` +
      `no histórico disponível. Primeira mensagem registrada: "${mensagensDoColaborador[0]}".`
    );
  }

  const contextoDeQuantidade =
    mensagensDoColaborador.length === 1
      ? "em uma mensagem"
      : `ao longo de ${mensagensDoColaborador.length} mensagens`;

  // O resumo é montado a partir das declarações extraídas — sem inventar informações.
  return (
    `O colaborador relatou ${contextoDeQuantidade} uma situação relacionada a ` +
    `"${assuntoPrincipal}". ` +
    `Declarações identificadas no histórico: ${informacoesFornecidas.join(" ")}`
  );
}

// --- Funções auxiliares de texto ---

function dividirEmSentencas(texto) {
  return texto
    .split(/(?<=[.!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function eDeclarativa(sentenca) {
  return !sentenca.trim().endsWith("?");
}

// --- Função exportada (contrato público do interpretador) ---

function interpretar(historicoNormalizado) {
  const assuntoPrincipal = extrairAssuntoPrincipal(historicoNormalizado.mensagensDoColaborador);
  const informacoesFornecidas = extrairInformacoesFornecidas(historicoNormalizado.mensagensDoColaborador);
  const informacoesFaltantes = identificarInformacoesFaltantes(historicoNormalizado);
  const resumo = gerarResumo(historicoNormalizado, informacoesFornecidas, assuntoPrincipal);

  return { assuntoPrincipal, informacoesFornecidas, informacoesFaltantes, resumo };
}

module.exports = { interpretar };
