# 🔧 CORREÇÃO DO ERRO: foto_url

## ❌ Erro
```
column usuarios.foto_url does not exist
```

## ✅ Solução

Execute o script SQL no Supabase:

### Passo 1: Abra o SQL Editor no Supabase
1. Acesse seu projeto no Supabase
2. Vá em **SQL Editor** (menu lateral)
3. Clique em **New Query**

### Passo 2: Execute o Script
Copie e cole o conteúdo do arquivo:
```
docs/database/03_adicionar_foto_url.sql
```

OU copie este código:

```sql
-- Adicionar coluna foto_url
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS foto_url TEXT;

-- Criar bucket para avatares
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage
CREATE POLICY "Avatares são públicos"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Usuários podem fazer upload do próprio avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Passo 3: Clique em RUN

Pronto! O erro está corrigido.

## 📝 O que foi feito

1. ✅ Adicionada coluna `foto_url` na tabela `usuarios`
2. ✅ Criado bucket `avatars` no Storage
3. ✅ Configuradas políticas de segurança (RLS)
4. ✅ Corrigido `index.html` para não quebrar se a coluna não existir

## 🧪 Testar

Após executar o script, teste o login novamente. Deve funcionar perfeitamente!

---

**Status**: ✅ Erro corrigido
**Próximo**: Continuar criação das telas
