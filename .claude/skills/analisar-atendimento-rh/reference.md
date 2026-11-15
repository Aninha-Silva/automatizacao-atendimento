# Referência: Analisar Atendimento de RH

Orientações detalhadas para aplicação da skill `analisar-atendimento-rh`.

---

## 1. Critérios de análise de conversas de RH

### O que analisar

- **Intenção principal:** qual problema ou dúvida motivou o contato do colaborador.
- **Progressão da conversa:** como a IA conduziu o atendimento e quais perguntas foram feitas.
- **Desfecho:** a conversa chegou a uma conclusão, foi interrompida ou transferida para humano?
- **Tom e urgência:** o colaborador demonstrou urgência, frustração ou satisfação?

### Categorias de assunto reconhecidas

| Categoria | Exemplos de solicitação |
|---|---|
| Férias | saldo de dias, agendamento, cancelamento |
| Benefícios | plano de saúde, vale-refeição, vale-transporte |
| Folha de pagamento | holerite, desconto indevido, adiantamento |
| Ponto e jornada | abono de falta, banco de horas, horário flexível |
| Desligamento | aviso-prévio, rescisão, FGTS |
| Treinamento e desenvolvimento | inscrição em curso, certificado |
| Outros | qualquer assunto não listado acima |

---

## 2. Como diferenciar informações fornecidas de informações faltantes

### Informações fornecidas

São dados que o colaborador declarou explicitamente durante a conversa. Exemplos:

- Nome, matrícula ou departamento informados pelo colaborador.
- Período de férias solicitado.
- Data de início do problema relatado.
- Número do protocolo citado pelo colaborador.

**Critério:** o dado aparece textualmente na fala do colaborador, sem necessidade de inferência.

### Informações faltantes

São dados necessários para resolver a solicitação que **não aparecem** na conversa. Exemplos:

- Matrícula não foi solicitada nem fornecida.
- O colaborador não confirmou o período desejado de férias.
- A IA não perguntou sobre o tipo de benefício afetado.

**Critério:** o dado é relevante para o encaminhamento, mas está ausente no histórico.

### O que NÃO fazer

- Inferir matrícula a partir do nome.
- Supor o período de férias com base no mês da conversa.
- Preencher campos faltantes com valores padrão ("provavelmente é o plano básico").

---

## 3. Como construir um resumo fiel e objetivo

### Estrutura do resumo

1. **Uma frase de contexto:** quem entrou em contato e sobre o quê.
2. **O que foi tratado:** principais pontos discutidos na conversa.
3. **Ponto de parada:** em que momento ou etapa a conversa foi interrompida ou transferida.
4. **Próximo passo sugerido:** ação imediata que o atendente humano deve tomar (apenas se derivável da conversa).

### Regras de escrita

- Voz passiva ou impessoal: "O colaborador informou…", "Foi solicitado…".
- Sem julgamentos: não qualifique o colaborador como "confuso" ou "insistente".
- Sem informações externas: não complemente o resumo com políticas de RH não mencionadas na conversa.
- Comprimento: de 3 a 6 linhas. Conciso, mas completo.

---

## 4. Como lidar com conversas incompletas, ambíguas ou com vários assuntos

### Conversa incompleta

Ocorre quando a conversa foi cortada antes de uma conclusão ou quando mensagens parecem estar faltando.

- Indique explicitamente: "A conversa foi interrompida sem resolução."
- Liste o que foi tratado até o ponto de corte.
- Não suponha o que viria a seguir.

### Conversa ambígua

Ocorre quando a intenção do colaborador não está clara ou quando há contradições entre mensagens.

- Descreva a ambiguidade: "Não foi possível determinar se o colaborador solicitava cancelamento ou reagendamento de férias."
- Liste as interpretações possíveis sem escolher uma.
- Marque o campo como "indefinido" em vez de deixá-lo em branco ou preenchido com suposição.

### Conversa com vários assuntos

Ocorre quando o colaborador aborda mais de um tema no mesmo atendimento.

- Liste os assuntos em ordem de aparição, não de suposta importância.
- Produza seções separadas de "informações fornecidas" e "informações faltantes" por assunto, se necessário.
- Identifique qual assunto estava em andamento no momento da transferência.

---

## 5. Como identificar limitações da interpretação simulada

O módulo `src/interpretadorSimulado.js` utiliza heurísticas simples (correspondência de palavras-chave, padrões de texto) para extrair campos estruturados da conversa. Ele **não** usa modelos de linguagem nem acessa sistemas externos.

### Quando sinalizar limitação

Sempre que o resumo for gerado via `interpretadorSimulado.js`, o resultado deve conter o aviso:

```
[SIMULAÇÃO] Este resumo foi gerado por interpretador simulado e pode conter imprecisões.
```

### Campos com maior risco de imprecisão

| Campo | Risco |
|---|---|
| Assunto principal | Pode classificar errado se a conversa mistura temas |
| Informações faltantes | Pode omitir campos ausentes não cobertos pelas heurísticas |
| Tom/urgência | Não é detectado pelo interpretador simulado |
| Próximo passo | Nunca inferido pelo simulador; sempre marcado como ausente |

### Como indicar a origem de cada campo

Ao listar os campos do resumo, use os sufixos:

- `[extraído]` — valor presente literalmente na conversa.
- `[inferido]` — valor deduzido por heurística; requer confirmação humana.
- `[ausente]` — campo necessário não encontrado na conversa.

---

## 6. Exemplos fictícios de conversas analisadas

> Todos os dados abaixo são estritamente fictícios. Nenhuma informação real de colaborador ou empresa foi utilizada.

---

### Exemplo A — Solicitação de férias com registro concluído

**Histórico fictício:**

```
Colaborador: Olá, quero solicitar minhas férias para janeiro.
IA: Claro! Pode me informar sua matrícula?
Colaborador: Minha matrícula é 00412.
IA: Obrigado. Qual período você deseja? Início e fim.
Colaborador: De 05/01 a 25/01.
IA: Entendido. Vou registrar a solicitação. Alguma preferência de pagamento antecipado?
Colaborador: Sim, quero o pagamento antecipado.
IA: Solicitação registrada. Protocolo: RH-2024-0881.
```

**Resultado esperado:**

```
Assunto principal: Férias — agendamento [extraído]
Colaborador: matrícula 00412 [extraído]

Informações fornecidas:
- Matrícula: 00412 [extraído]
- Período solicitado: 05/01 a 25/01 [extraído]
- Pagamento antecipado: sim [extraído]
- Protocolo gerado: RH-2024-0881 [extraído]

Informações faltantes:
- Aprovação do gestor: não registrada na conversa [ausente]

Resumo para o atendente:
O colaborador de matrícula 00412 solicitou férias no período de 05/01 a 25/01, com
pagamento antecipado. A IA registrou a solicitação e gerou o protocolo RH-2024-0881.
O registro foi concluído, mas a aprovação pelo gestor não foi confirmada na conversa
e deve ser verificada pelo atendente.

[SIMULAÇÃO] Este resumo foi gerado por interpretador simulado e pode conter imprecisões.
```

---

### Exemplo B — Conversa incompleta com assunto ambíguo

**Histórico fictício:**

```
Colaborador: Meu vale-refeição não foi creditado esse mês.
IA: Lamento pelo inconveniente. Você pode informar sua matrícula?
Colaborador: Não sei minha matrícula de cabeça.
IA: Tudo bem. Seu nome completo então?
Colaborador: Fernanda Lima.
IA: Obrigado, Fernanda. Deixa eu verificar seu cadastro...
[conversa encerrada sem resposta da IA]
```

**Resultado esperado:**

```
Assunto principal: Benefícios — vale-refeição não creditado [extraído]
Colaborador: Fernanda Lima [extraído]

Informações fornecidas:
- Nome: Fernanda Lima [extraído]
- Problema relatado: vale-refeição não creditado no mês corrente [extraído]

Informações faltantes:
- Matrícula: não fornecida [ausente]
- Mês de referência do problema: não especificado [ausente]
- Resultado da verificação de cadastro: conversa interrompida antes da resposta [ausente]

Resumo para o atendente:
A colaboradora Fernanda Lima relatou que seu vale-refeição não foi creditado no mês
corrente. A IA iniciou a verificação do cadastro, mas a conversa foi encerrada antes
de qualquer resposta ou resolução. O atendente deve solicitar a matrícula e confirmar
o mês de referência. A verificação do status do benefício em sistema real é uma ação
externa à simulação e não está implementada neste projeto — deve ser realizada pelo
atendente no sistema de RH da empresa.

[SIMULAÇÃO] Este resumo foi gerado por interpretador simulado e pode conter imprecisões.
```

---

### Exemplo C — Vários assuntos no mesmo atendimento

**Histórico fictício:**

```
Colaborador: Oi, tenho duas dúvidas. Primeira: quando sai meu holerite de outubro?
IA: O holerite de outubro fica disponível no portal no dia 5 de novembro.
Colaborador: Ótimo. Segunda dúvida: posso incluir meu filho no plano de saúde?
IA: Sim, inclusão de dependente é possível. Você tem a certidão de nascimento em mãos?
Colaborador: Tenho sim.
IA: Perfeito. Preciso transferir você para um atendente para finalizar o processo.
```

**Resultado esperado:**

```
Assunto principal: múltiplos — folha de pagamento e benefícios [extraído]

Assunto 1: Folha de pagamento — disponibilidade do holerite
Informações fornecidas:
- Mês de referência: outubro [extraído]
- Resposta da IA: disponível no portal em 05/11 [extraído]
Informações faltantes:
- Matrícula do colaborador [ausente]

Assunto 2: Benefícios — inclusão de dependente no plano de saúde
Informações fornecidas:
- Tipo de dependente: filho [extraído]
- Documentação disponível: certidão de nascimento [extraído]
Informações faltantes:
- Nome do dependente [ausente]
- Data de nascimento do dependente [ausente]

Resumo para o atendente:
O colaborador (não identificado por matrícula) apresentou duas solicitações. A primeira,
sobre o holerite de outubro, foi respondida pela IA. A segunda, inclusão de filho como
dependente no plano de saúde, está em andamento: o colaborador confirmou ter a certidão
de nascimento, mas o processo foi transferido sem coletar nome e data de nascimento do
dependente. O atendente deve retomar a partir da coleta desses dados.

[SIMULAÇÃO] Este resumo foi gerado por interpretador simulado e pode conter imprecisões.
```
