# Copiloto de Atendimento de RH

Ferramenta que apoia atendentes de RH na compreensão rápida de solicitações, gerando um resumo estruturado a partir do histórico de uma conversa entre um colaborador e uma IA de atendimento.

---

## O problema

Quando uma conversa iniciada com uma IA de atendimento é encaminhada para um atendente humano, o histórico anterior nem sempre fica disponível na interface de atendimento. Isso obriga o atendente a perguntar novamente informações que o colaborador já forneceu, gerando retrabalho e uma experiência frustrante para quem está sendo atendido.

---

## O que a ferramenta faz

A partir do histórico de uma conversa, o Copiloto de Atendimento de RH produz um resumo estruturado com quatro seções:

- **Resumo** — descrição fiel do que o colaborador relatou, sem inventar informações ausentes no histórico.
- **Assunto principal** — o tópico central identificado na conversa, extraído do próprio texto do colaborador.
- **Informações fornecidas** — o que o colaborador já declarou ao longo da conversa.
- **Informações faltantes** — pontos que ainda precisam ser esclarecidos antes do atendimento.

### Exemplo de entrada

```
Colaborador: Estou com dúvidas sobre meu pagamento deste mês.
IA: Você pode consultar seu contracheque pelo portal do colaborador.
Colaborador: Eu já consultei. O valor veio diferente do que eu esperava porque tive uma alteração na minha jornada.
IA: Para essa situação, recomendamos entrar em contato com o RH.
```

### Exemplo de saída

```
Resumo: O colaborador relatou ao longo de 2 mensagens uma situação relacionada a
"meu pagamento deste mês". Declarações identificadas no histórico: Estou com dúvidas
sobre meu pagamento deste mês. Eu já consultei. O valor veio diferente do que eu
esperava porque tive uma alteração na minha jornada.

Assunto principal: Meu pagamento deste mês

Informações fornecidas:
- Estou com dúvidas sobre meu pagamento deste mês.
- Eu já consultei.
- O valor veio diferente do que eu esperava porque tive uma alteração na minha jornada.

Informações faltantes:
- Identificação do colaborador (nome completo e matrícula ou CPF)
```

---

## Estrutura do projeto

```
automatizacao-atendimento/
├── src/
│   ├── analisadorDeConversa.js       # Orquestrador do pipeline
│   ├── validadorDeHistorico.js       # Validação de estrutura e formato
│   ├── normalizadorDeHistorico.js    # Separação e agregação dos dados
│   └── interpretadorSimulado.js      # Interpretação heurística (simulação)
├── testes/
│   ├── analisadorDeConversa.test.js
│   ├── validadorDeHistorico.test.js
│   └── normalizadorDeHistorico.test.js
├── exemplos/
│   ├── conversas/
│   │   └── divergenciaPagamento.js   # Dados fictícios de exemplo
│   └── conversaExemplo.js            # Demonstração executável
└── package.json
```

---

## Como executar

**Pré-requisito:** Node.js versão 18 ou superior.

**Instalar dependências:** nenhuma dependência externa é necessária. O projeto utiliza apenas recursos nativos do Node.js.

**Rodar os testes:**

```bash
npm test
```

**Ver um exemplo de execução:**

```bash
npm run exemplo
```

---

## Arquitetura e decisões técnicas

O projeto foi estruturado para que cada responsabilidade fique em um módulo separado:

| Módulo | Responsabilidade |
|---|---|
| `validadorDeHistorico` | Verifica se o formato do histórico está correto antes de qualquer processamento |
| `normalizadorDeHistorico` | Separa as mensagens por autor e agrega o texto para facilitar a análise |
| `interpretadorSimulado` | Extrai o assunto, as informações fornecidas, as lacunas e gera o resumo |
| `analisadorDeConversa` | Coordena os três módulos acima em sequência |

### Interpretador substituível

A função principal aceita um interpretador como parâmetro:

```javascript
const { analisarConversa } = require("./src/analisadorDeConversa");

analisarConversa(historico, meuInterpretador);
```

Qualquer módulo que exporte uma função `interpretar(historicoNormalizado)` com a mesma assinatura pode ser passado no lugar do interpretador simulado — incluindo um futuro interpretador baseado em LLM.

### Sobre o interpretador atual

O `interpretadorSimulado` utiliza extração textual heurística. Ele identifica padrões linguísticos comuns para extrair o assunto declarado pelo colaborador e separa as sentenças declarativas das mensagens. **Não representa compreensão semântica real** e não reconhece equivalência entre frases escritas de formas diferentes.

---

## Limitações desta versão

- Frases com significado equivalente mas escritas de forma diferente não são reconhecidas como a mesma situação.
- O assunto é extraído a partir de padrões linguísticos, não de compreensão do contexto.
- A identificação de lacunas está limitada a dois pontos universais: identificação do colaborador e referência temporal.
- Não há integração com sistemas externos, APIs ou bases de conhecimento.
- Não há persistência de dados entre execuções.

---

## Implementações futuras

As funcionalidades abaixo foram planejadas como evolução do projeto, mas não serão implementadas nesta etapa.

### Integração com modelo de linguagem (LLM)

A arquitetura já está preparada para receber um interpretador baseado em LLM. A substituição exige apenas a criação de um novo módulo que implemente o mesmo contrato da função `interpretar()`, sem alterações nos demais arquivos.

Com um LLM, a ferramenta passaria a compreender o sentido das mensagens independentemente de como foram escritas, eliminando a dependência de padrões linguísticos fixos.

### Perguntas complementares ao colaborador

Enquanto o colaborador aguarda o atendimento humano, o sistema poderia fazer perguntas direcionadas para coletar as informações identificadas como faltantes, chegando ao atendente com o contexto mais completo possível.

### Reavaliação com base nas respostas complementares

Após receber as respostas às perguntas complementares, o sistema reavaliaria o resumo e atualizaria as seções de informações fornecidas e faltantes.

### Consulta a uma base de orientações de RH

O copiloto poderia consultar uma base de conhecimento com orientações e políticas internas da empresa para sugerir ao atendente informações relevantes sobre o tipo de solicitação identificada.

### Respostas padrão cadastradas pelos atendentes

Atendentes poderiam cadastrar respostas frequentes para situações recorrentes, formando uma base de conhecimento construída pela própria equipe de RH.

### Sugestão de resposta personalizada

Com base nas respostas padrão e no contexto identificado na conversa, o sistema sugeriria ao atendente uma resposta adaptada ao caso específico do colaborador, que poderia ser usada diretamente ou editada antes do envio.

---

## Tecnologias utilizadas

- JavaScript (Node.js)
- Módulo nativo `node:test` para testes automatizados
- Sem dependências externas
