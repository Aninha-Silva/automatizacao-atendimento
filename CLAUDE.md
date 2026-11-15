# Copiloto de Atendimento de RH

Ferramenta que recebe o histórico de uma conversa entre um colaborador e uma IA de atendimento e gera um resumo estruturado para o atendente humano. Resolve o problema de perda de contexto quando a conversa é transferida da IA para o atendente.

## Stack

- JavaScript (Node.js 18+)
- Sem dependências externas
- Testes com `node:test` nativo

## Comandos

```bash
npm test          # executa os 36 testes automatizados
npm run exemplo   # demonstra o analisador com dados fictícios
```

## Estrutura

- `src/` — código do domínio
- `testes/` — testes automatizados
- `exemplos/` — dados fictícios e demonstração executável

## Regras

- Não integrar APIs externas ou serviços de IA sem aprovação explícita.
- O interpretador (`src/interpretadorSimulado.js`) deve sempre ser identificado como simulação no código e na saída.
- Dados de exemplo devem ser fictícios — sem informações reais de colaboradores ou empresa.
- Manter os módulos independentes: cada arquivo tem uma única responsabilidade.
