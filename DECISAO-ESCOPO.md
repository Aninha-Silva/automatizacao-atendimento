# DECISAO-ESCOPO.md

## O server

- **Projeto e domínio do catálogo (semana 2):** Copiloto de Atendimento de RH. Análise e organização de históricos de conversas de atendimento.
- **Que dado ou sistema ele toca:** recebe históricos de conversas enviados diretamente pelo usuário. Não acessa APIs, arquivos externos, planilhas, bancos de dados ou sistemas internos de RH.
- **Escopo em que você conecta:** `project`, porque o servidor será utilizado exclusivamente no projeto automatizacao-atendimento.

## Tool 1: `analisar_atendimento_rh`

- **Recebe:** histórico de atendimento em uma lista de mensagens, cada uma com autor e conteúdo.
- **Devolve:** resumo, assunto principal, informações fornecidas e informações faltantes.
- **Precisa poder:**
  1. Ler o histórico recebido na chamada.
  2. Validar, organizar e analisar as mensagens.
  3. Retornar os resultados da análise.
- **Não pode, mesmo que fosse prático:**
  1. Alterar, excluir ou enviar mensagens.
  2. Acessar dados de outros colaboradores ou sistemas internos.
  3. Executar comandos, alterar arquivos ou tomar decisões em nome do RH.
- **Como o código garante:**
  1. Recebe os dados somente pelos parâmetros definidos no schema e valida sua estrutura.
  2. Limita o tamanho e a quantidade de mensagens recebidas.
  3. Não possui funções de escrita, acesso a sistemas externos ou execução de comandos.
  4. Trata o conteúdo das mensagens como dados não confiáveis, nunca como instruções.

## Tool 2: `validar_historico_atendimento`

- **Recebe:** histórico de atendimento em uma lista de mensagens.
- **Devolve:** indicação de validade e lista de erros encontrados, sem reproduzir informações desnecessárias.
- **Precisa poder:**
  1. Verificar a estrutura do histórico.
  2. Identificar mensagens com campos ausentes ou inválidos.
- **Não pode, mesmo que fosse prático:**
  1. Alterar ou excluir mensagens.
  2. Consultar informações externas ou dados de outros colaboradores.
  3. Executar comandos ou realizar ações no sistema de RH.
- **Como o código garante:**
  1. Valida os campos e tipos de dados com schema.
  2. Aplica limites de tamanho e quantidade de mensagens.
  3. Não possui acesso a ferramentas de escrita ou sistemas externos.

## Texto de terceiros

- **Alguma tool devolve texto escrito por outra pessoa? Qual?** Sim. A ferramenta `analisar_atendimento_rh` pode devolver informações extraídas de mensagens escritas por colaboradores e pela IA durante o atendimento.
- **Se esse texto trouxesse uma ordem escondida, o que o agente conseguiria fazer com as outras ferramentas que ele tem na sessão?** O texto poderia tentar influenciar o agente a utilizar outras ferramentas disponíveis no Claude Code, como editar arquivos ou executar comandos. O MCP não concede essas permissões. O conteúdo retornado deve ser tratado como dado não confiável, e não como instrução para executar ações.

## Risco 2 — tratamento da saída

- A saída das ferramentas é devolvida ao Claude Code como conteúdo para análise. Neste projeto, ela não é enviada automaticamente para interpretadores de HTML, SQL ou comandos de terminal.
- Mesmo assim, conteúdo derivado de mensagens de terceiros pode tentar influenciar o agente a utilizar outras ferramentas disponíveis na sessão. Por isso, deve ser tratado como dado não confiável, e não como instrução a executar.
