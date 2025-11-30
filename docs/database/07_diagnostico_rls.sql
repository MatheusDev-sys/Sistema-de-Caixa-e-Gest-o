-- ============================================
-- DIAGNÓSTICO E CORREÇÃO RLS PARA AVATAR
-- ============================================

-- 1. Ver TODAS as políticas da tabela usuarios
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'usuarios'
ORDER BY cmd, policyname;

-- 2. Ver se RLS está ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usuarios';

-- 3. SOLUÇÃO: Remover TODAS as políticas de UPDATE e criar uma nova
DO $$
DECLARE
    pol RECORD;
BEGIN
    -- Remover todas as políticas de UPDATE
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'usuarios' AND cmd = 'UPDATE'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON usuarios', pol.policyname);
    END LOOP;
END $$;

-- 4. Criar política simples e funcional
CREATE POLICY "usuarios_update_own"
ON usuarios FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. Verificar resultado
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'usuarios' AND cmd = 'UPDATE';
