-- ============================================
-- CORRIGIR POLÍTICAS RLS PARA FOTO_URL
-- ============================================

-- Remover políticas antigas
DROP POLICY IF EXISTS "Usuários podem atualizar própria foto" ON usuarios;
DROP POLICY IF EXISTS "Usuários podem atualizar próprio perfil" ON usuarios;

-- Criar política abrangente para UPDATE
CREATE POLICY "Usuários podem atualizar próprio perfil"
ON usuarios FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Verificar se RLS está ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usuarios';

-- Verificar políticas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'usuarios';

