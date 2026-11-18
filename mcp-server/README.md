# MCP — Copiloto de Atendimento de RH

Servidor MCP desenvolvido na Aula 8 da especialização em IA.

O servidor utiliza transporte **stdio** e disponibiliza três ferramentas para apoiar a análise e validação de históricos de atendimento de RH.

## Ferramentas disponíveis

- `rolar_dado`: exemplo de ferramenta mantida da Aula 7.
- `analisar_atendimento_rh`: analisa o histórico, identifica o assunto principal, as informações fornecidas e as informações faltantes.
- `validar_historico_atendimento`: verifica a estrutura e os limites do histórico recebido.

## Requisitos

- Node.js 20 ou superior.
- npm.

## Instalação

Na pasta `mcp-server`, execute:

```bash
npm install
```

## Executar os testes

```bash
npm test
```

## Iniciar o servidor

```bash
npm start
```

O servidor utiliza transporte stdio. Para conectá-lo ao Claude Code, registre-o com:

```bash
claude mcp add meu-mcp -- node "$(pwd)/server.mjs"
```

Depois, abra o Claude Code na mesma pasta e utilize `/mcp` para verificar a conexão e as ferramentas disponíveis.

## Estrutura principal

- `server.mjs`: configuração do servidor MCP e registro das ferramentas.
- `ferramentas.mjs`: implementação das funções utilizadas pelas ferramentas.
- `tests/`: testes automatizados.
- `conversa.log`: registro das mensagens do protocolo MCP pelo servidor de inspeção.
- `EVIDENCIAS-AULA8.md`: documentação dos testes e evidências da atividade.

## Segurança

O histórico é tratado como dado de entrada, não como instrução para o servidor. A validação limita o número de mensagens, o tamanho individual e o tamanho total do histórico.

Não utilize dados reais ou confidenciais de colaboradores nos testes.
