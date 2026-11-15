# Evidências — Aula 7 | LAB 2

## 1. Ferramentas implementadas

- `rolar_dado`
- `verificar_dados_atendimento`

Os testes automatizados passaram: 5 testes, 0 falhas.

## 2. Qual mensagem leva a descrição da tool até o modelo?

A mensagem é a resposta do método `tools/list`.

Ela apresenta ao modelo o nome da ferramenta, sua descrição e seu `inputSchema`, incluindo os campos obrigatórios.

Trecho do conversa.log:

```json
{
  "name": "verificar_dados_atendimento",
  "description": "Verifica se um atendimento de RH possui nome, assunto e descrição preenchidos. Use quando a pessoa quiser conferir se faltam informações em um atendimento.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "nome": {
        "type": "string",
        "description": "Nome da pessoa atendida."
      },
      "assunto": {
        "type": "string",
        "description": "Assunto do atendimento."
      },
      "descricao": {
        "type": "string",
        "description": "Descrição do atendimento."
      }
    },
    "required": ["nome", "assunto", "descricao"]
  }
}


## 3. Quantos tokens a ferramenta ocupa?

Resultado do Tokenizer da OpenAI:

- Tokens: 286
- Caracteres: 1.272

## 4. Quanto 40 ferramentas desse tamanho ocupariam?

Cálculo:

286 × 40 = 11.440 tokens.

Portanto, 40 ferramentas com aproximadamente o mesmo tamanho ocupariam cerca de 11.440 tokens antes do primeiro prompt do usuário.

Esse valor é uma estimativa, pois ferramentas diferentes podem ter tamanhos diferentes.

## 5. Evidência da execução da ferramenta

Dados enviados pelo Claude Code:

- Nome: Ana
- Assunto: vazio
- Descrição: Dúvida sobre benefício

Resultado retornado pelo servidor:

Informações faltantes: assunto

## 6. Arquivos do projeto

- server.mjs
- ferramentas.mjs
- tests/ferramentas.test.mjs
- espiao.mjs
- conversa.log

