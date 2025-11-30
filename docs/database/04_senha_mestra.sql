-- ============================================
-- SENHA MESTRA PARA RETIRADAS
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Criar tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS configuracoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chave TEXT UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Inserir senha mestra (hash bcrypt)
-- IMPORTANTE: Você deve alterar esta senha no Table Editor depois!
-- Senha padrão: "mestre123" (ALTERE ISSO!)
INSERT INTO configuracoes (chave, valor, descricao)
VALUES (
    'senha_mestra_retiradas',
    crypt('mestre123', gen_salt('bf')),
    'Senha mestra para autorizar retiradas que não sejam passagem'
)
ON CONFLICT (chave) DO NOTHING;

-- 3. RLS para configurações (apenas admins podem ver/editar)
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

-- Apenas admins podem ver configurações
CREATE POLICY "Apenas admins podem ver configurações"
ON configuracoes FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.cargo = 'admin'
    )
);

-- Apenas admins podem atualizar configurações
CREATE POLICY "Apenas admins podem atualizar configurações"
ON configuracoes FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM usuarios
        WHERE usuarios.id = auth.uid()
        AND usuarios.cargo = 'admin'
    )
);

-- 4. Função para validar senha mestra
CREATE OR REPLACE FUNCTION validar_senha_mestra(senha_informada TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    senha_hash TEXT;
BEGIN
    -- Buscar hash da senha mestra
    SELECT valor INTO senha_hash
    FROM configuracoes
    WHERE chave = 'senha_mestra_retiradas';
    
    -- Validar senha
    RETURN senha_hash = crypt(senha_informada, senha_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Comentários
COMMENT ON TABLE configuracoes IS 'Configurações gerais do sistema';
COMMENT ON COLUMN configuracoes.chave IS 'Chave única da configuração';
COMMENT ON COLUMN configuracoes.valor IS 'Valor da configuração (pode ser hash de senha)';
COMMENT ON FUNCTION validar_senha_mestra IS 'Valida senha mestra para retiradas';

-- ============================================
-- COMO USAR
-- ============================================

-- Para ALTERAR a senha mestra:
-- 1. Vá no Table Editor do Supabase
-- 2. Abra a tabela "configuracoes"
-- 3. Encontre a linha com chave "senha_mestra_retiradas"
-- 4. Clique em editar
-- 5. No campo "valor", execute no SQL Editor:
--    SELECT crypt('SUA_NOVA_SENHA_AQUI', gen_salt('bf'));
-- 6. Copie o resultado e cole no campo "valor"

-- Para TESTAR a senha:
-- SELECT validar_senha_mestra('mestre123'); -- Deve retornar true

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se a tabela foi criada
SELECT * FROM configuracoes WHERE chave = 'senha_mestra_retiradas';

-- Testar função
SELECT validar_senha_mestra('mestre123'); -- Deve retornar true
SELECT validar_senha_mestra('senha_errada'); -- Deve retornar false
