-- ============================================
-- CRIAR NOVO USUÁRIO ADMIN EMERGENCIAL
-- ============================================

-- IMPORTANTE: Este script apenas cria o registro na tabela usuarios
-- Você AINDA precisa criar o usuário no Supabase Auth primeiro!

-- PASSO 1: Criar usuário no Supabase Auth
-- 1. Vá em Authentication > Users
-- 2. Clique em "Add User"
-- 3. Preencha email e senha
-- 4. Copie o UUID gerado

-- PASSO 2: Depois de criar no Auth, execute isto:
-- SUBSTITUA os valores abaixo:

INSERT INTO usuarios (
    id,           -- UUID do Supabase Auth (copie de lá)
    nome,
    email,
    cargo,
    ativo
) VALUES (
    'COLE-O-UUID-AQUI',  -- UUID do usuário criado no Auth
    'Novo Admin',         -- Nome do admin
    'admin@exemplo.com',  -- Email (mesmo do Auth)
    'admin',              -- Cargo
    true                  -- Ativo
);

-- ============================================
-- OU: Tornar um usuário existente em admin
-- ============================================

-- Se você já tem um usuário criado no Auth mas sem acesso:
UPDATE usuarios
SET 
    cargo = 'admin',
    ativo = true
WHERE email = 'email-do-usuario@exemplo.com';

-- ============================================
-- VERIFICAR USUÁRIOS NO AUTH vs TABELA
-- ============================================

-- Ver todos os usuários na tabela usuarios
SELECT id, nome, email, cargo, ativo
FROM usuarios
ORDER BY criado_em DESC;
