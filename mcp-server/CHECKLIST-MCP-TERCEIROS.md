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
