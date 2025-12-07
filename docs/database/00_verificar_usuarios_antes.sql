-- ============================================
-- SCRIPT DE VERIFICAÇÃO - Usuários e Cargos
-- ============================================
-- Execute este script ANTES de aplicar as correções de segurança
-- para verificar quais usuários você tem e seus cargos

-- ============================================
-- 1. LISTAR TODOS OS USUÁRIOS
-- ============================================

SELECT 
    nome,
    email,
    cargo,
    ativo,
    criado_em
FROM usuarios
ORDER BY cargo, nome;

-- ============================================
-- 2. CONTAR USUÁRIOS POR CARGO
-- ============================================

SELECT 
    cargo,
    COUNT(*) as quantidade,
    COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
    COUNT(CASE WHEN ativo = false THEN 1 END) as inativos
FROM usuarios
GROUP BY cargo
ORDER BY cargo;

-- ============================================
-- 3. VERIFICAR QUEM TERÁ ACESSO ADMIN
-- ============================================

-- Estes usuários terão acesso total após aplicar a correção:
SELECT 
    nome,
    email,
    cargo,
    ativo,
    CASE 
        WHEN cargo = 'admin' THEN '✅ Acesso TOTAL (incluindo excluir usuários)'
        WHEN cargo = 'gerente' THEN '✅ Acesso ADMIN (exceto excluir usuários)'
        ELSE '❌ SEM acesso admin'
    END as nivel_acesso
FROM usuarios
WHERE cargo IN ('admin', 'gerente') AND ativo = true
ORDER BY cargo, nome;

-- ============================================
-- 4. VERIFICAR POLÍTICAS RLS ATUAIS
-- ============================================

-- Ver políticas atuais de produtos
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'produtos'
ORDER BY cmd, policyname;

-- Ver políticas atuais de feriados
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'feriados'
ORDER BY cmd, policyname;

-- ============================================
-- 5. TESTAR SE POLÍTICAS ATUAIS SÃO SEGURAS
-- ============================================

-- Se este retornar políticas SEM verificação de cargo, está INSEGURO:
SELECT 
    tablename,
    policyname,
    cmd,
    CASE 
        WHEN qual LIKE '%cargo%' OR with_check LIKE '%cargo%' THEN '✅ SEGURO (verifica cargo)'
        WHEN qual = 'true' OR with_check = 'true' THEN '❌ INSEGURO (permite todos)'
        WHEN qual LIKE '%auth.uid()%' AND qual NOT LIKE '%cargo%' THEN '⚠️ PARCIAL (só verifica login)'
        ELSE '❓ VERIFICAR MANUALMENTE'
    END as status_seguranca
FROM pg_policies
WHERE tablename IN ('produtos', 'feriados', 'auditoria')
ORDER BY tablename, cmd;

-- ============================================
-- 6. RESUMO FINAL
-- ============================================

-- Resumo do que vai mudar:
SELECT 
    '📊 RESUMO DA CORREÇÃO' as info,
    (SELECT COUNT(*) FROM usuarios WHERE cargo IN ('admin', 'gerente') AND ativo = true) as usuarios_com_acesso_admin,
    (SELECT COUNT(*) FROM usuarios WHERE cargo NOT IN ('admin', 'gerente') AND ativo = true) as usuarios_sem_acesso_admin,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'produtos' AND cmd = 'INSERT') as politicas_insert_produtos_atuais;
