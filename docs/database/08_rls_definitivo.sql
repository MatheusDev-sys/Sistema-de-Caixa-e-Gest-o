-- ============================================
-- SOLUÇÃO DEFINITIVA RLS PARA AVATAR
-- ============================================

-- 1. DESABILITAR RLS temporariamente
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;

-- 2. REMOVER TODAS as políticas de UPDATE
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'usuarios' AND cmd = 'UPDATE'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON usuarios', pol.policyname);
        RAISE NOTICE 'Removida política: %', pol.policyname;
    END LOOP;
END $$;

-- 3. REABILITAR RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- 4. Criar política SIMPLES para UPDATE
CREATE POLICY "usuarios_podem_atualizar_proprio_perfil"
ON usuarios FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. Verificar resultado
SELECT 
    tablename,
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'usuarios'
ORDER BY cmd, policyname;

-- 6. Testar se RLS está ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usuarios';
