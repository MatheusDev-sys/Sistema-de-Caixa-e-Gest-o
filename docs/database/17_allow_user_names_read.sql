-- =====================================================
-- PERMITIR LEITURA DE NOMES DE USUÁRIOS
-- Para exibir "quem abriu" e "quem fechou" no histórico
-- =====================================================

-- Remover política restritiva de SELECT se existir
DROP POLICY IF EXISTS "usuarios_select_policy" ON usuarios;

-- Criar nova política: usuários autenticados podem VER nomes de todos
CREATE POLICY "usuarios_select_names_policy" 
ON usuarios
FOR SELECT
TO authenticated
USING (true);  -- Permite ver todos os usuários

-- Nota: Isso permite apenas SELECT (leitura)
-- UPDATE, INSERT, DELETE continuam protegidos por outras políticas
