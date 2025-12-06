-- ============================================
-- LIMPEZA TOTAL E RECRIAÇÃO - CORREÇÃO EMERGENCIAL
-- ============================================
-- Remove TODAS as políticas e recria do zero

-- ============================================
-- 1. REMOVER ABSOLUTAMENTE TODAS AS POLÍTICAS
-- ============================================

-- Remover todas as políticas de usuarios
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'usuarios'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON usuarios';
    END LOOP;
END $$;

-- Remover todas as políticas de produtos
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'produtos'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON produtos';
    END LOOP;
END $$;

-- Remover todas as políticas de feriados
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'feriados'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON feriados';
    END LOOP;
END $$;

-- Remover todas as políticas de auditoria
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'auditoria'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON auditoria';
    END LOOP;
END $$;

-- Remover todas as políticas de vendas
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'vendas'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON vendas';
    END LOOP;
END $$;

-- Remover todas as políticas de caixas
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'caixas'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON caixas';
    END LOOP;
END $$;

-- Remover todas as políticas de retiradas
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'retiradas'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON retiradas';
    END LOOP;
END $$;

-- ============================================
-- 2. RECRIAR POLÍTICAS SIMPLES E FUNCIONAIS
-- ============================================

-- USUARIOS - Simples, sem recursão
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

-- PRODUTOS - Todos autenticados podem gerenciar
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

-- FERIADOS - Todos autenticados podem gerenciar
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

-- AUDITORIA - Todos podem ver e inserir
CREATE POLICY "auditoria_select"
ON auditoria FOR SELECT
USING (true);

CREATE POLICY "auditoria_insert"
ON auditoria FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- VENDAS - Todos autenticados
CREATE POLICY "vendas_select"
ON vendas FOR SELECT
USING (true);

CREATE POLICY "vendas_insert"
ON vendas FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "vendas_update"
ON vendas FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- CAIXAS - Todos autenticados
CREATE POLICY "caixas_select"
ON caixas FOR SELECT
USING (true);

CREATE POLICY "caixas_insert"
ON caixas FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "caixas_update"
ON caixas FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- RETIRADAS - Todos autenticados
CREATE POLICY "retiradas_select"
ON retiradas FOR SELECT
USING (true);

CREATE POLICY "retiradas_insert"
ON retiradas FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- 3. VERIFICAR SUCESSO
-- ============================================

SELECT 'Sistema restaurado! Tente fazer login agora.' as status;

-- Listar políticas criadas
SELECT tablename, COUNT(*) as total_policies
FROM pg_policies
WHERE tablename IN ('usuarios', 'produtos', 'feriados', 'auditoria', 'vendas', 'caixas', 'retiradas')
GROUP BY tablename
ORDER BY tablename;
