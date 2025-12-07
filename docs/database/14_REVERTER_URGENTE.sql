-- ============================================
-- REVERTER POLÍTICAS RLS - CORREÇÃO EMERGENCIAL
-- ============================================
-- Execute IMEDIATAMENTE para resolver o erro de recursão infinita

-- ============================================
-- 1. REMOVER POLÍTICAS QUE CAUSAM RECURSÃO
-- ============================================

DROP POLICY IF EXISTS "usuarios_select_own_or_admin" ON usuarios;
DROP POLICY IF EXISTS "usuarios_delete_admin_only" ON usuarios;
DROP POLICY IF EXISTS "produtos_insert_admin_only" ON produtos;
DROP POLICY IF EXISTS "produtos_update_admin_only" ON produtos;
DROP POLICY IF EXISTS "produtos_delete_admin_only" ON produtos;
DROP POLICY IF EXISTS "feriados_insert_admin_only" ON feriados;
DROP POLICY IF EXISTS "feriados_update_admin_only" ON feriados;
DROP POLICY IF EXISTS "feriados_delete_admin_only" ON feriados;
DROP POLICY IF EXISTS "auditoria_select_admin_only" ON auditoria;

-- ============================================
-- 2. RECRIAR POLÍTICAS SIMPLES (SEM RECURSÃO)
-- ============================================

-- USUARIOS - Política simples sem recursão
CREATE POLICY "usuarios_select_own"
ON usuarios FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "usuarios_insert"
ON usuarios FOR INSERT
WITH CHECK (true);

CREATE POLICY "usuarios_update_own"
ON usuarios FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- PRODUTOS - Política simples (qualquer autenticado)
CREATE POLICY "produtos_select"
ON produtos FOR SELECT
USING (true);

CREATE POLICY "produtos_insert"
ON produtos FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "produtos_update"
ON produtos FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "produtos_delete"
ON produtos FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- FERIADOS - Política simples
CREATE POLICY "feriados_select"
ON feriados FOR SELECT
USING (true);

CREATE POLICY "feriados_insert"
ON feriados FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "feriados_update"
ON feriados FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "feriados_delete"
ON feriados FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- AUDITORIA - Política simples
CREATE POLICY "auditoria_select"
ON auditoria FOR SELECT
USING (true);

CREATE POLICY "auditoria_insert"
ON auditoria FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- 3. VERIFICAR SE VOLTOU AO NORMAL
-- ============================================

SELECT 'Políticas revertidas com sucesso!' as status;

-- Listar políticas atuais
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('usuarios', 'produtos', 'feriados', 'auditoria')
ORDER BY tablename, cmd;
