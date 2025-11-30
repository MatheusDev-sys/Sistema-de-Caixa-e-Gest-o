-- ============================================
-- ADICIONAR COLUNA FOTO_URL E CONFIGURAR STORAGE
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Adicionar coluna foto_url na tabela usuarios
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS foto_url TEXT;

-- 2. Criar bucket para avatares (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Políticas de Storage para Avatares

-- Permitir que todos vejam avatares (bucket público)
CREATE POLICY "Avatares são públicos"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Permitir que usuários façam upload do próprio avatar
CREATE POLICY "Usuários podem fazer upload do próprio avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Permitir que usuários atualizem o próprio avatar
CREATE POLICY "Usuários podem atualizar próprio avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Permitir que usuários deletem o próprio avatar
CREATE POLICY "Usuários podem deletar próprio avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Comentários
COMMENT ON COLUMN usuarios.foto_url IS 'URL da foto de perfil do usuário armazenada no Supabase Storage';

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se a coluna foi criada
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'usuarios' AND column_name = 'foto_url';

-- Verificar se o bucket foi criado
SELECT * FROM storage.buckets WHERE id = 'avatars';

-- Verificar políticas de storage
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%avatar%';
