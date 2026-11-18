# Checklist de segurança — MCP de terceiros

Antes de instalar um MCP de terceiros:

- [ ] Conferir a origem, o desenvolvedor e a reputação do projeto.
- [ ] Revisar o código-fonte e as dependências.
- [ ] Ler a descrição completa de todas as tools.
- [ ] Procurar instruções escondidas ou incompatíveis com a finalidade anunciada (tool poisoning).
- [ ] Verificar se solicita acesso a arquivos, terminal, credenciais ou sistemas externos.
- [ ] Nunca expor arquivos .env, senhas, tokens ou chaves.
- [ ] Verificar conexões de rede e destinos acessados.
- [ ] Conceder somente as permissões estritamente necessárias.
- [ ] Testar primeiro em ambiente isolado, sem dados reais.
- [ ] Inspecionar chamadas, entradas, saídas e pedidos de permissão.
- [ ] Remover o MCP se houver comportamento inesperado.

**Regra:** não confiar apenas no nome ou na descrição da ferramenta. Conferir o que o código realmente faz.


## Avaliação realizada — Context7 4.7.3

- Origem identificada: pacote @upstash/context7-mcp, repositório Upstash.
- Dependências diretas e scripts declarados consultados.
- Requisito Node.js >=20.18.1 compatível com o ambiente utilizado.
- Ferramentas identificadas: resolve-library-id e query-docs.
- Limitações: código e dependências não foram auditados integralmente; permissões e destinos de rede não foram verificados por completo; backend, parsing e crawling são privados.
- Cuidados: não fornecer segredos ou dados reais; manter menor privilégio; interromper o uso diante de comportamento inesperado.

**Conclusão:** avaliação documental parcial. Não foi possível atestar a segurança integral do MCP.
