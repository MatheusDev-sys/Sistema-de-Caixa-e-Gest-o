# 🚀 Guia de Deploy no GitHub Pages

Este guia mostra como fazer o deploy do sistema Mande Flores no GitHub Pages gratuitamente.

## 📋 Pré-requisitos

- Conta no [GitHub](https://github.com) (gratuita)
- Supabase já configurado ([ver guia](SUPABASE_SETUP.md))
- Arquivo `js/config.js` com suas credenciais do Supabase

## 🎯 Opções de Deploy

Existem duas formas de fazer o deploy:

### Opção 1: Upload Direto (Mais Simples)
### Opção 2: Via Git (Recomendado)

---

## 📤 Opção 1: Upload Direto

### Passo 1: Criar Repositório

1. Acesse [github.com](https://github.com)
2. Faça login
3. Clique no **"+"** no canto superior direito
4. Selecione **"New repository"**
5. Preencha:
   - **Repository name**: `mande-flores`
   - **Description**: Sistema de Gestão de Caixa
   - **Public** ou **Private** (sua escolha)
   - **NÃO** marque "Add a README file"
6. Clique em **"Create repository"**

### Passo 2: Upload dos Arquivos

1. Na página do repositório criado, clique em **"uploading an existing file"**
2. Arraste todos os arquivos e pastas do projeto para a área de upload
3. **IMPORTANTE**: Verifique se o arquivo `js/config.js` tem suas credenciais corretas
4. Adicione uma mensagem de commit: "Initial commit"
5. Clique em **"Commit changes"**

### Passo 3: Ativar GitHub Pages

1. No repositório, clique em **"Settings"**
2. No menu lateral, clique em **"Pages"**
3. Em **"Source"**, selecione:
   - **Branch**: `main` (ou `master`)
   - **Folder**: `/ (root)`
4. Clique em **"Save"**
5. Aguarde alguns minutos

### Passo 4: Acessar o Site

1. Após alguns minutos, recarregue a página
2. Você verá uma mensagem: **"Your site is live at https://seu-usuario.github.io/mande-flores/"**
3. Clique no link para acessar seu sistema!

---

## 💻 Opção 2: Via Git (Recomendado)

### Passo 1: Instalar Git

Se ainda não tem o Git instalado:

**Windows**:
1. Baixe em [git-scm.com](https://git-scm.com/download/win)
2. Execute o instalador
3. Use as opções padrão

**Mac**:
```bash
brew install git
```

**Linux**:
```bash
sudo apt-get install git
```

### Passo 2: Configurar Git

Abra o terminal/prompt e execute:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Passo 3: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"**
3. Preencha:
   - **Repository name**: `mande-flores`
   - **Public** ou **Private**
4. Clique em **"Create repository"**
5. **Copie** a URL do repositório (ex: `https://github.com/seu-usuario/mande-flores.git`)

### Passo 4: Fazer Push do Código

No terminal, navegue até a pasta do projeto e execute:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit"

# Adicionar repositório remoto (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/mande-flores.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

### Passo 5: Ativar GitHub Pages

1. No repositório do GitHub, vá em **"Settings"** > **"Pages"**
2. Em **"Source"**, selecione `main` e `/ (root)`
3. Clique em **"Save"**
4. Aguarde alguns minutos

### Passo 6: Acessar o Site

Seu site estará disponível em: `https://seu-usuario.github.io/mande-flores/`

---

## 🔧 Atualizações Futuras

### Via Upload Direto

1. Acesse o repositório no GitHub
2. Navegue até o arquivo que deseja editar
3. Clique no ícone de lápis (Edit)
4. Faça as alterações
5. Clique em **"Commit changes"**

### Via Git

```bash
# Fazer alterações nos arquivos

# Adicionar alterações
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Fazer push
git push
```

As alterações aparecerão no site em alguns minutos.

---

## 🌐 Domínio Customizado (Opcional)

Se você tem um domínio próprio (ex: `www.mandeflores.com.br`):

### Passo 1: Configurar DNS

No painel do seu provedor de domínio, adicione:

**Tipo A** (para domínio raiz):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME** (para www):
```
seu-usuario.github.io
```

### Passo 2: Configurar no GitHub

1. No repositório, vá em **"Settings"** > **"Pages"**
2. Em **"Custom domain"**, digite seu domínio
3. Clique em **"Save"**
4. Marque **"Enforce HTTPS"** (após propagação do DNS)

Aguarde até 24h para propagação do DNS.

---

## ✅ Verificar Deploy

Para verificar se o deploy foi bem-sucedido:

1. Acesse a URL do GitHub Pages
2. Você deve ver a tela de login
3. Tente fazer login com suas credenciais
4. Se funcionar, o deploy está correto!

---

## 🔒 Segurança das Credenciais

### ⚠️ IMPORTANTE

Se seu repositório for **público**, suas credenciais do Supabase ficarão visíveis!

**Soluções**:

1. **Repositório Privado** (Recomendado)
   - Torne o repositório privado nas configurações
   - GitHub Pages funciona com repositórios privados

2. **Variáveis de Ambiente** (Avançado)
   - Use GitHub Actions para injetar variáveis
   - Requer configuração adicional

3. **RLS Ativo** (Já implementado)
   - O sistema usa RLS, então mesmo com credenciais públicas, os dados estão protegidos
   - Mas ainda assim, é melhor manter o repositório privado

---

## 🆘 Problemas Comuns

### Site não carrega

**Solução**:
1. Aguarde 5-10 minutos após ativar GitHub Pages
2. Limpe o cache do navegador (Ctrl+Shift+Del)
3. Tente em modo anônimo

### Erro 404

**Solução**:
1. Verifique se o arquivo `index.html` está na raiz do repositório
2. Verifique se a branch e pasta estão corretas em Settings > Pages

### Erro ao fazer login

**Solução**:
1. Abra o console do navegador (F12)
2. Verifique se há erros relacionados ao Supabase
3. Confirme que o arquivo `js/config.js` tem as credenciais corretas

### CSS não carrega

**Solução**:
1. Verifique se a pasta `css` foi enviada corretamente
2. Verifique os caminhos nos arquivos HTML (devem ser relativos)

---

## 📊 Monitoramento

### Ver Acessos

1. No repositório, vá em **"Insights"**
2. Clique em **"Traffic"**
3. Veja estatísticas de visitantes

### Logs de Deploy

1. Vá em **"Actions"** (se usar GitHub Actions)
2. Veja o histórico de deploys

---

## 🔄 Rollback (Voltar Versão)

Se algo der errado após uma atualização:

1. No repositório, clique em **"Commits"**
2. Encontre o commit anterior que funcionava
3. Clique nos **"..."** ao lado do commit
4. Selecione **"Revert"**
5. Confirme

---

## 📱 Testar em Dispositivos

Após o deploy, teste em:
- Desktop (Chrome, Firefox, Edge)
- Tablet
- Smartphone (Android e iOS)

Use o DevTools do navegador (F12) para simular dispositivos móveis.

---

## 🎉 Pronto!

Seu sistema Mande Flores está no ar! 🌸

**URL do sistema**: `https://seu-usuario.github.io/mande-flores/`

---

**Próximo passo**: [Manual do Usuário](MANUAL_USO.md)
