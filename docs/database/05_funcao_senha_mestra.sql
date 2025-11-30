-- ============================================
-- FUNÇÃO PARA VALIDAR SENHA MESTRA (SEGURA COM BCRYPT)
-- ============================================

-- Habilitar extensão pgcrypto para bcrypt
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criar função para validar senha mestra com hash bcrypt
CREATE OR REPLACE FUNCTION validar_senha_mestra(senha_informada TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    hash_senha TEXT;
BEGIN
    -- Buscar o hash da senha mestra da tabela configuracoes
    SELECT valor INTO hash_senha
    FROM configuracoes
    WHERE chave = 'senha_mestra_hash'
    LIMIT 1;
    
    -- Se não encontrou, retornar false
    IF hash_senha IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Comparar senha informada com o hash usando bcrypt
    RETURN (hash_senha = crypt(senha_informada, hash_senha));
END;
$$;

-- Gerar hash bcrypt da senha 'Mv3498' e inserir
-- O bcrypt gera um salt automático e é muito mais seguro
INSERT INTO configuracoes (chave, valor, descricao)
VALUES (
    'senha_mestra_hash', 
    crypt('Mv3498', gen_salt('bf')), 
    'Hash bcrypt da senha mestra para retiradas'
)
ON CONFLICT (chave) 
DO UPDATE SET valor = crypt('Mv3498', gen_salt('bf'));

-- IMPORTANTE: A senha nunca é armazenada em texto puro!
-- Apenas o hash bcrypt é salvo no banco.
