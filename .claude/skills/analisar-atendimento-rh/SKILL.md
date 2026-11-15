---
name: analisar-atendimento-rh
description: Analisa o histórico de uma conversa entre colaborador e IA de atendimento de RH, gerando um resumo estruturado para o atendente humano. Deve ser acionada quando o usuário pedir para analisar uma conversa de atendimento de RH, gerar um resumo para handoff ao atendente, ou identificar informações fornecidas e faltantes em uma conversa.
allowed-tools: Read, Grep, Glob
---

# Skill: Analisar Atendimento de RH

## Quando esta skill é acionada

- Usuário pede para analisar uma conversa de atendimento de RH.
- Usuário quer gerar um resumo para o atendente humano (handoff).
- Usuário pede para identificar informações fornecidas e faltantes em uma conversa.

## Regras obrigatórias (do CLAUDE.md)

- Não integrar APIs externas ou serviços de IA sem aprovação explícita.
- O interpretador simulado (`src/interpretadorSimulado.js`) deve ser identificado como simulação tanto no código quanto na saída.
- Dados de exemplo devem ser estritamente fictícios — sem informações reais de colaboradores ou empresa.
- Manter módulos independentes: cada arquivo tem uma única responsabilidade.

## Instruções para o Claude

### 1. Analisar o histórico fornecido

- Leia a conversa completa antes de produzir qualquer saída.
- Identifique todas as mensagens trocadas entre colaborador e IA.
- Preserve a sequência cronológica dos eventos.

### 2. Produzir um resumo fiel à conversa

- O resumo deve refletir apenas o que está explicitamente na conversa.
- Nunca inferir, completar ou inventar informações não presentes no histórico.
- Use linguagem objetiva e neutra.

### 3. Identificar o assunto principal

- Determine o tema central do atendimento (ex.: férias, benefícios, folha de pagamento).
- Se houver múltiplos assuntos, liste-os em ordem de relevância.

### 4. Separar informações fornecidas e faltantes

**Fornecidas:** dados que o colaborador confirmou ou informou durante a conversa.

**Faltantes:** dados necessários para resolver a solicitação que não foram fornecidos.

### 5. Nunca inventar informações

- Se um dado não constar no histórico, declare explicitamente como ausente.
- Não preencha lacunas com suposições, mesmo que pareçam razoáveis.

### 6. Identificar limitações da interpretação simulada

- Sempre que o resultado for gerado via `src/interpretadorSimulado.js`, sinalize claramente que se trata de uma **simulação**.
- Indique quais campos foram inferidos por heurística e quais foram extraídos diretamente do texto.
- Exemplo de aviso obrigatório: `[SIMULAÇÃO] Este resumo foi gerado por interpretador simulado e pode conter imprecisões.`

### 7. Usar somente dados fictícios nos exemplos

- Ao demonstrar a skill com dados de exemplo, utilize apenas os arquivos do diretório `exemplos/`.
- Não cite nomes reais, CPFs, matrículas ou qualquer dado pessoal real.

## Formato de saída esperado

```
Assunto principal: <tema>
Colaborador: <nome fictício, se disponível>

Informações fornecidas:
- <item 1>
- <item 2>

Informações faltantes:
- <item 1>
- <item 2>

Resumo para o atendente:
<parágrafo objetivo descrevendo a situação e o ponto em que a conversa foi interrompida>

[SIMULAÇÃO] <aviso, se aplicável>
```

## Referência

Orientações detalhadas sobre critérios de interpretação, exemplos anotados e casos de borda estão documentadas em:
`.claude/skills/analisar-atendimento-rh/reference.md` (a ser criado).
