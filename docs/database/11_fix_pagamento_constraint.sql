-- ============================================
-- CORREÇÃO: Adicionar 'cartao' ao constraint de pagamento
-- ============================================
-- Este script atualiza o constraint da tabela vendas para aceitar
-- a nova opção 'cartao' (unificação de débito e crédito)

-- Remover o constraint antigo
ALTER TABLE vendas DROP CONSTRAINT IF EXISTS vendas_pagamento_check;

-- Adicionar novo constraint com 'cartao' incluído
ALTER TABLE vendas ADD CONSTRAINT vendas_pagamento_check 
CHECK (pagamento IN ('dinheiro', 'pix_whatsapp', 'pix_maquininha', 'debito', 'credito', 'cartao', 'link_pagamento'));

-- Verificar se o constraint foi criado corretamente
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'vendas_pagamento_check';
