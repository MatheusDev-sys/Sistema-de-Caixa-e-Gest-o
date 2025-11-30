-- ============================================
-- REABILITAR RLS E SEGURANÇA TOTAL
-- ============================================

-- 1. REABILITAR RLS na tabela usuarios
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- 2. Manter apenas as políticas essenciais
-- (As políticas já existentes devem estar corretas)

-- 3. Verificar políticas ativas
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

-- 4. Confirmar RLS ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usuarios';

-- Resultado esperado: rowsecurity = true
