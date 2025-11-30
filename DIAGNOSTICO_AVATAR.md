# 🔧 Diagnóstico do Avatar RLS

## Problema
Avatar dá erro mesmo com RLS desabilitado (`rowsecurity = false`).

## Possíveis Causas

### 1. Erro não é de RLS, mas de Storage
O erro pode ser do **Supabase Storage**, não da tabela `usuarios`.

**Teste:**
```sql
-- Ver políticas do bucket avatars
SELECT * FROM storage.policies WHERE bucket_id = 'avatars';
```

### 2. Bucket não existe
Execute:
```sql
-- Ver se bucket existe
SELECT * FROM storage.buckets WHERE name = 'avatars';
```

Se retornar vazio, crie o bucket no Supabase:
1. Storage > Create Bucket
2. Nome: `avatars`
3. Public: ✅ (marcado)

### 3. Políticas do Storage
Mesmo com RLS da tabela desabilitado, o **Storage tem seu próprio RLS**.

Execute:
```sql
-- Desabilitar RLS do bucket
UPDATE storage.buckets 
SET public = true 
WHERE name = 'avatars';

-- Criar política de upload
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Qualquer um pode fazer upload',
  'avatars',
  'true',
  'true'
);
```

## Teste Final

Depois de executar os SQLs acima:
1. `Ctrl + Shift + R`
2. Tente alterar avatar
3. Me envie o erro COMPLETO do Console (F12)

## Sobre o Caixa

Criei `caixa.html` novo e limpo com:
- ✅ Modal de retirada completo
- ✅ Todos os campos (Tipo, Descrição, Valor, Senha Mestra)
- ✅ Scripts na ordem certa
- ✅ Sem corrupção

Teste agora!
