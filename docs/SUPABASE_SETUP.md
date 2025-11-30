# 🔧 Guia de Configuração do Supabase

Este guia irá te ajudar a configurar o backend do sistema Mande Flores usando o Supabase.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com) (gratuita)
- Navegador web atualizado

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: Mande Flores
   - **Database Password**: Crie uma senha forte e **anote**
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
5. Clique em **"Create new project"**
6. Aguarde alguns minutos enquanto o projeto é criado

### 2. Executar Scripts SQL

Agora você precisa criar as tabelas e configurar a segurança do banco de dados.

#### 2.1 Criar Schema (Tabelas)

1. No painel do Supabase, clique em **"SQL Editor"** no menu lateral
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `docs/database/01_schema.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione Ctrl+Enter)
6. Aguarde a confirmação de sucesso

#### 2.2 Configurar RLS (Segurança)

1. Ainda no SQL Editor, clique em **"New query"**
2. Copie todo o conteúdo do arquivo `docs/database/02_rls_policies.sql`
3. Cole no editor SQL
4. Clique em **"Run"**
5. Aguarde a confirmação de sucesso

#### 2.3. Criar Functions e Triggers

1. Clique em **"New query"** novamente
2. Copie todo o conteúdo do arquivo `docs/database/03_functions.sql`
3. Cole no editor SQL
4. Clique em **"Run"**
5. Aguarde a confirmação de sucesso

### 3. Obter Credenciais

1. No painel do Supabase, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"** no submenu
3. Você verá duas informações importantes:
   - **Project URL**: Algo como `https://xxxxx.supabase.co`
   - **anon public**: Uma chave longa começando com `eyJ...`
4. **Copie e guarde** essas duas informações

### 4. Configurar no Projeto

1. Abra o arquivo `js/config.js` do projeto
2. Substitua os valores:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Cole sua Project URL aqui
const SUPABASE_ANON_KEY = 'eyJ...'; // Cole sua anon public key aqui
```

3. Salve o arquivo

### 5. Criar Primeiro Usuário Admin

Como o sistema usa autenticação, você precisa criar o primeiro usuário manualmente:

#### 5.1 Criar Usuário na Autenticação

1. No painel do Supabase, clique em **"Authentication"**
2. Clique em **"Users"**
3. Clique em **"Add user"** > **"Create new user"**
4. Preencha:
   - **Email**: Seu email (ex: admin@mandeflores.com)
   - **Password**: Crie uma senha forte
   - **Auto Confirm User**: Marque esta opção
5. Clique em **"Create user"**
6. **IMPORTANTE**: Copie o **UUID** do usuário criado (está na coluna ID)

#### 5.2 Adicionar Usuário na Tabela

1. Clique em **"Table Editor"**
2. Selecione a tabela **"usuarios"**
3. Clique em **"Insert"** > **"Insert row"**
4. Preencha:
   - **id**: Cole o UUID que você copiou
   - **email**: Mesmo email usado na autenticação
   - **nome**: Seu nome completo
   - **cargo**: Selecione **"admin"**
   - **ativo**: Marque como **true**
5. Clique em **"Save"**

Pronto! Agora você pode fazer login no sistema com este email e senha.

## ✅ Verificar Instalação

Para verificar se tudo está funcionando:

1. Abra o arquivo `index.html` no navegador
2. Tente fazer login com o email e senha criados
3. Se conseguir entrar, a configuração está correta!

## 🔒 Segurança

### RLS (Row Level Security)

O sistema usa RLS para garantir que:
- Funcionários só vejam seus próprios caixas
- Gerentes vejam todos os caixas
- Admins tenham acesso total
- Ninguém acesse dados não autorizados

### Políticas Implementadas

- **usuarios**: Apenas admins podem ver todos os usuários
- **caixas**: Funcionários veem apenas caixas que abriram
- **vendas**: Acesso baseado no caixa
- **retiradas**: Acesso baseado no caixa
- **produtos**: Todos veem, apenas admin edita
- **feriados**: Todos veem, apenas admin edita
- **auditoria**: Cada um vê suas próprias ações, admin vê tudo

## 🆘 Problemas Comuns

### Erro: "Invalid API key"

**Solução**: Verifique se copiou corretamente a `anon public` key do Supabase.

### Erro: "relation does not exist"

**Solução**: Execute novamente o script `01_schema.sql` no SQL Editor.

### Erro ao fazer login

**Solução**: 
1. Verifique se o usuário foi criado na tabela `usuarios`
2. Verifique se o `id` na tabela corresponde ao UUID do usuário na autenticação
3. Verifique se marcou "Auto Confirm User" ao criar

### Erro: "permission denied"

**Solução**: Execute novamente o script `02_rls_policies.sql` para configurar as permissões.

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas

1. **usuarios** - Dados dos usuários do sistema
2. **caixas** - Registros de abertura/fechamento de caixa
3. **vendas** - Todas as vendas registradas
4. **retiradas** - Retiradas de dinheiro do caixa
5. **produtos** - Catálogo de produtos
6. **feriados** - Feriados nacionais e customizados
7. **auditoria** - Log de ações no sistema

### Relacionamentos

```
usuarios
  ├── caixas (aberto_por, fechado_por)
  ├── vendas (criado_por)
  ├── retiradas (autorizado_por)
  └── auditoria (usuario_id)

caixas
  ├── vendas (caixa_id)
  └── retiradas (caixa_id)

produtos
  └── vendas (produto_id)
```

## 🔄 Backup

É recomendado fazer backup regular do banco de dados:

1. No painel do Supabase, vá em **"Database"**
2. Clique em **"Backups"**
3. Configure backups automáticos ou faça backup manual

## 📞 Suporte

Se tiver problemas:
1. Verifique a documentação do [Supabase](https://supabase.com/docs)
2. Revise os passos deste guia
3. Verifique os logs no console do navegador (F12)

---

**Próximo passo**: [Deploy no GitHub Pages](DEPLOY.md)
