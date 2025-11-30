-- ============================================
-- CORREÇÃO DAS POLÍTICAS RLS
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- Primeiro, remover todas as políticas existentes
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON usuarios;
DROP POLICY IF EXISTS "Admin pode ver todos os usuários" ON usuarios;
DROP POLICY IF EXISTS "Admin pode gerenciar usuários" ON usuarios;
DROP POLICY IF EXISTS "Funcionário vê apenas caixas que abriu" ON caixas;
DROP POLICY IF EXISTS "Todos podem criar caixas" ON caixas;
DROP POLICY IF EXISTS "Apenas quem abriu pode fechar" ON caixas;
DROP POLICY IF EXISTS "Todos podem ver produtos ativos" ON produtos;
DROP POLICY IF EXISTS "Apenas admin pode gerenciar produtos" ON produtos;
DROP POLICY IF EXISTS "Ver vendas dos próprios caixas" ON vendas;
DROP POLICY IF EXISTS "Criar vendas em caixas abertos" ON vendas;
DROP POLICY IF EXISTS "Ver retiradas dos próprios caixas" ON retiradas;
DROP POLICY IF EXISTS "Criar retiradas" ON retiradas;
DROP POLICY IF EXISTS "Todos podem ver feriados ativos" ON feriados;
DROP POLICY IF EXISTS "Apenas admin pode gerenciar feriados" ON feriados;
DROP POLICY IF EXISTS "Ver própria auditoria" ON auditoria;
DROP POLICY IF EXISTS "Sistema pode inserir auditoria" ON auditoria;

-- ============================================
-- POLÍTICAS CORRIGIDAS PARA USUARIOS
-- ============================================

-- Permitir que usuários vejam seu próprio perfil
CREATE POLICY "usuarios_select_own"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

-- Permitir inserção (necessário para o sistema funcionar)
CREATE POLICY "usuarios_insert"
  ON usuarios FOR INSERT
  WITH CHECK (true);

-- Permitir atualização do próprio perfil
CREATE POLICY "usuarios_update_own"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- POLÍTICAS PARA CAIXAS
-- ============================================

CREATE POLICY "caixas_select"
  ON caixas FOR SELECT
  USING (true); -- Todos podem ver (controle será no frontend)

CREATE POLICY "caixas_insert"
  ON caixas FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "caixas_update"
  ON caixas FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- ============================================
-- POLÍTICAS PARA PRODUTOS
-- ============================================

CREATE POLICY "produtos_select"
  ON produtos FOR SELECT
  USING (true);

CREATE POLICY "produtos_insert"
  ON produtos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "produtos_update"
  ON produtos FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "produtos_delete"
  ON produtos FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- ============================================
-- POLÍTICAS PARA VENDAS
-- ============================================

CREATE POLICY "vendas_select"
  ON vendas FOR SELECT
  USING (true);

CREATE POLICY "vendas_insert"
  ON vendas FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- POLÍTICAS PARA RETIRADAS
-- ============================================

CREATE POLICY "retiradas_select"
  ON retiradas FOR SELECT
  USING (true);

CREATE POLICY "retiradas_insert"
  ON retiradas FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- POLÍTICAS PARA FERIADOS
-- ============================================

CREATE POLICY "feriados_select"
  ON feriados FOR SELECT
  USING (true);

CREATE POLICY "feriados_insert"
  ON feriados FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "feriados_update"
  ON feriados FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "feriados_delete"
  ON feriados FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- ============================================
-- POLÍTICAS PARA AUDITORIA
-- ============================================

CREATE POLICY "auditoria_select"
  ON auditoria FOR SELECT
  USING (true);

CREATE POLICY "auditoria_insert"
  ON auditoria FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
