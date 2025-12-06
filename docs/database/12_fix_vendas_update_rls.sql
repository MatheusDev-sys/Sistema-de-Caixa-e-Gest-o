-- ============================================
-- FIX: Permitir UPDATE em vendas (SEGURO)
-- ============================================
-- Este script corrige as políticas RLS para permitir
-- que APENAS usuários autenticados E ativos possam editar vendas

-- 1. Remover política antiga de UPDATE se existir
DROP POLICY IF EXISTS "Usuários podem atualizar vendas" ON vendas;
DROP POLICY IF EXISTS "update_vendas" ON vendas;
DROP POLICY IF EXISTS "Permitir UPDATE em vendas" ON vendas;

-- 2. Criar nova política de UPDATE SEGURA
-- Permite UPDATE apenas para usuários autenticados que estão ativos no sistema
CREATE POLICY "Usuarios ativos podem editar vendas"
ON vendas
FOR UPDATE
TO authenticated
USING (
    -- Verifica se o usuário está autenticado E ativo
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
    )
)
WITH CHECK (
    -- Mesma verificação para garantir que apenas usuários ativos podem salvar
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
    )
);

-- 3. Verificar se RLS está habilitado
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;

-- 4. Verificar políticas atuais
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
WHERE tablename = 'vendas'
ORDER BY policyname;
