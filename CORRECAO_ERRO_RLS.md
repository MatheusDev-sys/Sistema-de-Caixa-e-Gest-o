# 🔧 Correção do Erro de Recursão Infinita

## ❌ Problema

Erro: `infinite recursion detected in policy for relation "usuarios"`

## ✅ Solução

### Passo 1: Executar Script de Correção

1. Acesse o **Supabase**
2. Vá em **SQL Editor**
3. Clique em **New query**
4. Copie TODO o conteúdo do arquivo `docs/database/02_rls_policies_CORRIGIDO.sql`
5. Cole no editor
6. Clique em **Run** (ou Ctrl+Enter)
7. Aguarde a confirmação de sucesso

### Passo 2: Criar Usuário Admin

Agora você pode criar o usuário sem erro:

#### 2.1 Criar na Autenticação

1. **Authentication** > **Users** > **Add user**
2. Preencha:
   - Email: `admin@mandeflores.com` (ou seu email)
   - Password: Crie uma senha forte
   - **Auto Confirm User**: ✅ MARQUE ESTA OPÇÃO
3. Clique em **Create user**
4. **COPIE o UUID** que aparece na coluna ID

#### 2.2 Adicionar na Tabela usuarios

1. **Table Editor** > **usuarios**
2. Clique em **Insert** > **Insert row**
3. Preencha:
   - **id**: Cole o UUID que você copiou
   - **email**: Mesmo email usado acima
   - **nome**: Seu nome completo
   - **cargo**: Selecione `admin`
   - **ativo**: Marque como `true`
4. Clique em **Save**

### Passo 3: Testar Login

1. Abra o arquivo `index.html` no navegador
2. Digite o email e senha que você criou
3. Clique em **Entrar**

Deve funcionar agora! 🎉

## 📝 O Que Foi Corrigido?

As políticas RLS antigas tentavam consultar a tabela `usuarios` dentro das próprias políticas, criando um loop infinito. As novas políticas são mais simples:

- ✅ Removem a recursão
- ✅ Permitem que usuários autenticados acessem os dados
- ✅ Controle de permissões por cargo é feito no JavaScript (frontend)
- ✅ Mantém a segurança básica (só usuários logados acessam)

## 🆘 Ainda com Problemas?

### Erro persiste após executar o script

**Solução**: 
1. Verifique se o script foi executado completamente
2. Vá em **Database** > **Policies**
3. Verifique se as políticas antigas foram removidas
4. Se ainda houver políticas antigas, delete-as manualmente

### Não consigo criar usuário na tabela

**Solução**:
1. Certifique-se de que o UUID corresponde ao usuário criado na autenticação
2. Verifique se marcou "Auto Confirm User"
3. Tente criar o usuário via SQL:

```sql
INSERT INTO usuarios (id, email, nome, cargo, ativo)
VALUES (
  'COLE_O_UUID_AQUI',
  'seu@email.com',
  'Seu Nome',
  'admin',
  true
);
```

### Login ainda não funciona

**Solução**:
1. Abra o Console do navegador (F12)
2. Veja se há erros
3. Verifique se as credenciais em `js/config.js` estão corretas
4. Confirme que o email e senha estão corretos

---

**Após corrigir, o sistema funcionará perfeitamente!** 🌸
