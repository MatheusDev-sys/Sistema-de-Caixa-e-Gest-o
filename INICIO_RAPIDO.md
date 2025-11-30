# 🚀 Início Rápido - Mande Flores

## ⚡ Configuração em 5 Minutos

### 1️⃣ Configurar Supabase

Você já executou os scripts SQL! Agora:

1. Acesse seu projeto no [Supabase](https://supabase.com)
2. Vá em **Settings** > **API**
3. Copie:
   - **Project URL**
   - **anon public key**

### 2️⃣ Configurar Credenciais

Abra o arquivo `js/config.js` e substitua:

```javascript
const SUPABASE_URL = 'COLE_SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'COLE_SUA_CHAVE_AQUI';
```

### 3️⃣ Criar Primeiro Usuário

No Supabase:

1. **Authentication** > **Users** > **Add user**
2. Preencha email e senha
3. Marque "Auto Confirm User"
4. **Copie o UUID** do usuário criado

5. **Table Editor** > **usuarios** > **Insert row**
6. Preencha:
   - `id`: UUID copiado
   - `email`: Mesmo email
   - `nome`: Seu nome
   - `cargo`: `admin`
   - `ativo`: `true`

### 4️⃣ Testar Localmente

Abra `index.html` no navegador e faça login!

### 5️⃣ Deploy no GitHub Pages

1. Crie repositório no GitHub
2. Faça upload de todos os arquivos
3. **Settings** > **Pages**
4. Source: `main` branch, `/ (root)` folder
5. Aguarde 5 minutos

Pronto! Seu sistema está no ar! 🎉

---

## 📚 Documentação Completa

- [README.md](README.md) - Visão geral
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) - Configuração detalhada
- [docs/DEPLOY.md](docs/DEPLOY.md) - Deploy passo a passo
- [docs/MANUAL_USO.md](docs/MANUAL_USO.md) - Como usar o sistema

---

## 🆘 Problemas?

### Erro ao fazer login
- Verifique se criou o usuário na tabela `usuarios`
- Confirme que o `id` corresponde ao UUID da autenticação

### Site não carrega no GitHub Pages
- Aguarde 5-10 minutos após ativar
- Limpe o cache do navegador

### Erro de conexão com Supabase
- Verifique as credenciais em `js/config.js`
- Confirme que executou todos os scripts SQL

---

## ✅ Checklist

- [ ] Scripts SQL executados no Supabase
- [ ] Credenciais configuradas em `js/config.js`
- [ ] Primeiro usuário admin criado
- [ ] Sistema testado localmente
- [ ] Deploy feito no GitHub Pages

---

**Desenvolvido com 🌸 para Mande Flores**
