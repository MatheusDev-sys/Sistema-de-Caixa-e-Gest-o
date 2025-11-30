# ✅ SOLUÇÕES FINAIS

## 1. ✅ Retirada Corrigida
Adicionada proteção contra `null` no código.

**Teste:**
1. `Ctrl + Shift + R`
2. Registrar Retirada
3. Selecione "Outra Retirada"
4. Campo senha deve aparecer

## 2. 🔐 Avatar - Solução Definitiva

Você tem o bucket `avatars` com 4 políticas.

**O problema é que as políticas estão BLOQUEANDO o upload.**

### Solução no Supabase (Interface Web):

1. **Vá para:** Storage > Buckets > avatars > Policies
2. **Delete TODAS as 4 políticas existentes**
3. **Crie UMA nova política:**
   - Nome: `Permitir tudo`
   - Policy definition: `true`
   - WITH CHECK: `true`
   - Operations: ✅ SELECT, ✅ INSERT, ✅ UPDATE, ✅ DELETE

**OU use este SQL:**

```sql
-- 1. Ver políticas atuais
SELECT * FROM storage.objects WHERE bucket_id = 'avatars';

-- 2. Deletar políticas antigas (faça pela interface)
-- Storage > avatars > Policies > Delete cada uma

-- 3. Tornar bucket totalmente público
UPDATE storage.buckets 
SET public = true, 
    file_size_limit = 2097152,  -- 2MB
    allowed_mime_types = ARRAY['image/jpeg', 'image/png']
WHERE name = 'avatars';
```

### Depois teste:
1. `Ctrl + Shift + R`
2. Clique no avatar
3. Escolha imagem
4. Salvar

Se AINDA der erro, me envie:
- Screenshot das políticas do bucket
- Erro COMPLETO do Console (F12)
