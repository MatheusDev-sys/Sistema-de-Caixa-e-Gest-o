# 🔧 CORREÇÃO URGENTE - Erro de Recursão

## ⚠️ O Problema

O erro `infinite recursion detected in policy for relation "usuarios"` acontece porque as políticas RLS estavam consultando a própria tabela `usuarios` dentro das políticas, criando um loop infinito.

## ✅ Solução Rápida (3 passos)

### 1️⃣ Executar Script Corrigido

```
Supabase → SQL Editor → New query
```

Copie e execute o arquivo: **`docs/database/02_rls_policies_CORRIGIDO.sql`**

### 2️⃣ Criar Usuário Admin

**Authentication → Users → Add user**
- Email: `admin@mandeflores.com`
- Password: (sua senha)
- ✅ Auto Confirm User
- Copie o UUID gerado

**Table Editor → usuarios → Insert row**
- id: (UUID copiado)
- email: `admin@mandeflores.com`
- nome: "Seu Nome"
- cargo: `admin`
- ativo: `true`

### 3️⃣ Testar

Abra `index.html` e faça login!

---

## 📋 Checklist

- [ ] Executei o script `02_rls_policies_CORRIGIDO.sql`
- [ ] Criei usuário na Authentication
- [ ] Copiei o UUID
- [ ] Adicionei usuário na tabela usuarios
- [ ] Testei o login

---

Veja o guia completo em: **CORRECAO_ERRO_RLS.md**
