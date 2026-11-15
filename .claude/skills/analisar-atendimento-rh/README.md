# Skill: analisar-atendimento-rh

Analisa o histórico de uma conversa entre colaborador e IA de atendimento de RH
e gera um resumo estruturado para o atendente humano, resolvendo o problema de
perda de contexto no momento do handoff.

## O que a skill faz

- Identifica o assunto principal da conversa.
- Separa informações fornecidas pelo colaborador de informações faltantes.
- Produz um resumo objetivo, fiel ao histórico, sem inventar dados.
- Sinaliza claramente quando o resultado vem do interpretador simulado
  (`src/interpretadorSimulado.js`) e quais campos foram extraídos, inferidos
  ou estão ausentes.

## Quando utilizar

- Ao analisar uma conversa de atendimento de RH transferida para humano.
- Ao gerar um resumo de handoff para o atendente.
- Ao identificar quais dados ainda precisam ser coletados do colaborador.

## Como invocar no Claude Code

Digite na conversa com o Claude:

```
/analisar-atendimento-rh
```

O Claude solicitará o histórico da conversa (ou o localizará no projeto) e
produzirá o resumo estruturado no formato:

```
Assunto principal: <tema>
Colaborador: <identificação, se disponível>

Informações fornecidas:
- <item> [extraído|inferido]

Informações faltantes:
- <item> [ausente]

Resumo para o atendente:
<parágrafo objetivo>

[SIMULAÇÃO] <aviso, se aplicável>
```

## Como reutilizar em outro projeto

Copie a pasta inteira para o diretório `.claude/skills/` do novo projeto:

```bash
cp -r .claude/skills/analisar-atendimento-rh /caminho/do/novo-projeto/.claude/skills/
```

A skill ficará disponível automaticamente ao abrir o novo projeto no Claude Code.

> Se o novo projeto não usar `src/interpretadorSimulado.js`, remova ou adapte
> as referências a esse módulo no `SKILL.md` e no `reference.md`.

## Arquivos da skill

| Arquivo | Conteúdo |
|---|---|
| `SKILL.md` | Definição da skill: gatilhos, regras e formato de saída |
| `reference.md` | Critérios detalhados, casos de borda e exemplos fictícios |
| `README.md` | Este arquivo |
