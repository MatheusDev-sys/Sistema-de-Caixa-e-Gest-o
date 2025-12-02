# Correção de Bug - Página em Branco

## Problema
Após implementar a funcionalidade de adições manuais, a página do caixa ficava em branco ao tentar abrir um caixa.

## Causa
A função `carregarAdicoes()` tentava acessar a tabela `adicoes_manuais` que ainda não foi criada no banco de dados, causando um erro que travava toda a página.

## Solução Aplicada

Adicionado tratamento de erro gracioso em `carregarAdicoes()`:
- Detecta se a tabela não existe (erro PGRST116)
- Inicializa `adicoes` como array vazio
- Exibe aviso no console mas permite que a página continue funcionando
- Mensagem amigável ao tentar adicionar saldo sem a tabela criada

## Como Testar

1. **Sem executar o SQL** (situação atual):
   - Abrir caixa → Deve funcionar normalmente
   - Tentar adicionar saldo → Mostra mensagem explicativa
   - Console mostra aviso sobre tabela faltando

2. **Após executar o SQL**:
   - Tudo deve funcionar completamente
   - Adições manuais serão salvas no banco

## Ação Necessária

Execute o script SQL quando estiver pronto:
```sql
-- No Supabase Dashboard > SQL Editor
-- Cole e execute o conteúdo de: 10_adicoes_manuais.sql
```

Até lá, o sistema funciona normalmente, apenas sem a funcionalidade de adições manuais.
