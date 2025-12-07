-- ============================================
-- VERIFICAR E CORRIGIR ACESSO DE ADMIN
-- ============================================

-- 1. Ver todos os usuários e seus cargos
SELECT 
    id,
    nome,
    email,
    cargo,
    ativo,
    criado_em
FROM usuarios
ORDER BY criado_em DESC;

-- 2. Ver qual usuário está logado agora
SELECT 
    auth.uid() as meu_user_id,
    u.nome,
    u.email,
    u.cargo,
    u.ativo
FROM usuarios u
WHERE u.id = auth.uid();

-- 3. Se você souber seu email, execute isto para restaurar seu acesso:
-- SUBSTITUA 'seu-email@exemplo.com' pelo seu email real
/*
UPDATE usuarios
SET cargo = 'admin', ativo = true
WHERE email = 'seu-email@exemplo.com';
*/

-- 4. Verificar se há algum usuário sem cargo definido
SELECT 
    nome,
    email,
    cargo,
    ativo
FROM usuarios
WHERE cargo IS NULL OR cargo = '';
