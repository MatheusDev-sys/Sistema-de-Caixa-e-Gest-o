-- ============================================
-- POLÍTICAS RLS SEGURAS PARA ADMIN
-- ============================================
-- Este script cria políticas que verificam o cargo do usuário
-- APENAS admin e gerente podem acessar funções administrativas

-- ============================================
-- 1. REMOVER POLÍTICAS INSEGURAS
-- ============================================

-- Produtos
DROP POLICY IF EXISTS "produtos_insert" ON produtos;
DROP POLICY IF EXISTS "produtos_update" ON produtos;
DROP POLICY IF EXISTS "produtos_delete" ON produtos;

-- Feriados
DROP POLICY IF EXISTS "feriados_insert" ON feriados;
DROP POLICY IF EXISTS "feriados_update" ON feriados;
DROP POLICY IF EXISTS "feriados_delete" ON feriados;

-- Auditoria
DROP POLICY IF EXISTS "auditoria_select" ON auditoria;

-- ============================================
-- 2. CRIAR POLÍTICAS SEGURAS PARA PRODUTOS
-- ============================================

-- SELECT: Todos podem ver produtos (necessário para vendas)
CREATE POLICY "produtos_select_all"
ON produtos FOR SELECT
USING (true);

-- INSERT: Apenas admin e gerente
CREATE POLICY "produtos_insert_admin_only"
ON produtos FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- UPDATE: Apenas admin e gerente
CREATE POLICY "produtos_update_admin_only"
ON produtos FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- DELETE: Apenas admin e gerente
CREATE POLICY "produtos_delete_admin_only"
ON produtos FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- ============================================
-- 3. CRIAR POLÍTICAS SEGURAS PARA FERIADOS
-- ============================================

-- SELECT: Todos podem ver feriados
CREATE POLICY "feriados_select_all"
ON feriados FOR SELECT
USING (true);

-- INSERT: Apenas admin e gerente
CREATE POLICY "feriados_insert_admin_only"
ON feriados FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- UPDATE: Apenas admin e gerente
CREATE POLICY "feriados_update_admin_only"
ON feriados FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- DELETE: Apenas admin e gerente
CREATE POLICY "feriados_delete_admin_only"
ON feriados FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- ============================================
-- 4. CRIAR POLÍTICAS SEGURAS PARA AUDITORIA
-- ============================================

-- SELECT: Apenas admin e gerente podem ver auditoria
CREATE POLICY "auditoria_select_admin_only"
ON auditoria FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo IN ('admin', 'gerente')
    )
);

-- INSERT: Todos autenticados podem inserir (para logging)
CREATE POLICY "auditoria_insert_authenticated"
ON auditoria FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- 5. CRIAR POLÍTICAS SEGURAS PARA USUÁRIOS
-- ============================================

-- Remover política insegura
DROP POLICY IF EXISTS "usuarios_select_own" ON usuarios;

-- SELECT: Admin/gerente vê todos, outros veem só a si mesmos
CREATE POLICY "usuarios_select_own_or_admin"
ON usuarios FOR SELECT
TO authenticated
USING (
    auth.uid() = id  -- Vê a si mesmo
    OR EXISTS (  -- OU é admin/gerente
        SELECT 1 FROM usuarios u
        WHERE u.id = auth.uid()
        AND u.ativo = true
        AND u.cargo IN ('admin', 'gerente')
    )
);

-- DELETE: Apenas admin pode excluir usuários
CREATE POLICY "usuarios_delete_admin_only"
ON usuarios FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.ativo = true
        AND usuarios.cargo = 'admin'  -- Apenas admin, não gerente
    )
);

-- ============================================
-- 6. VERIFICAR RLS ESTÁ ATIVO
-- ============================================

ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE feriados ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. VERIFICAR POLÍTICAS CRIADAS
-- ============================================

SELECT 
    tablename,
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('produtos', 'feriados', 'auditoria', 'usuarios')
ORDER BY tablename, cmd, policyname;
