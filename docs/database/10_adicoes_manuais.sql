-- ============================================
-- SCRIPT: Criar Tabela de Adições Manuais
-- ============================================
-- Este script cria a tabela para registrar adições manuais de saldo ao caixa
-- (ex: quando precisa adicionar dinheiro para troco durante o dia)

-- 1. Criar tabela adicoes_manuais
CREATE TABLE IF NOT EXISTS adicoes_manuais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    caixa_id UUID NOT NULL REFERENCES caixas(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL CHECK (valor > 0),
    autorizado_por UUID NOT NULL REFERENCES usuarios(id),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT adicoes_manuais_caixa_fk FOREIGN KEY (caixa_id) REFERENCES caixas(id),
    CONSTRAINT adicoes_manuais_usuario_fk FOREIGN KEY (autorizado_por) REFERENCES usuarios(id)
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_adicoes_manuais_caixa_id ON adicoes_manuais(caixa_id);
CREATE INDEX IF NOT EXISTS idx_adicoes_manuais_criado_em ON adicoes_manuais(criado_em);

-- 3. Adicionar comentários
COMMENT ON TABLE adicoes_manuais IS 'Registra adições manuais de saldo ao caixa (ex: troco)';
COMMENT ON COLUMN adicoes_manuais.id IS 'Identificador único da adição';
COMMENT ON COLUMN adicoes_manuais.caixa_id IS 'Referência ao caixa onde foi feita a adição';
COMMENT ON COLUMN adicoes_manuais.descricao IS 'Descrição da adição (ex: Troco adicionado)';
COMMENT ON COLUMN adicoes_manuais.valor IS 'Valor adicionado ao caixa';
COMMENT ON COLUMN adicoes_manuais.autorizado_por IS 'Usuário que autorizou a adição';
COMMENT ON COLUMN adicoes_manuais.criado_em IS 'Data e hora da adição';

-- 4. Habilitar RLS (Row Level Security)
ALTER TABLE adicoes_manuais ENABLE ROW LEVEL SECURITY;

-- 5. Remover políticas antigas se existirem
DROP POLICY IF EXISTS "adicoes_manuais_select" ON adicoes_manuais;
DROP POLICY IF EXISTS "adicoes_manuais_insert" ON adicoes_manuais;

-- 6. Criar políticas de acesso
-- Política de SELECT: Ver adições dos próprios caixas ou todos se for admin/gerente
CREATE POLICY "adicoes_manuais_select"
  ON adicoes_manuais FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM caixas c
      INNER JOIN usuarios u ON u.id = auth.uid()
      WHERE c.id = adicoes_manuais.caixa_id
      AND (
        c.aberto_por = auth.uid() OR
        u.cargo IN ('admin', 'gerente')
      )
    )
  );

-- Política de INSERT: Qualquer usuário autenticado pode criar adições
CREATE POLICY "adicoes_manuais_insert"
  ON adicoes_manuais FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    autorizado_por = auth.uid()
  );

-- 7. Conceder permissões
GRANT SELECT, INSERT ON adicoes_manuais TO authenticated;

-- ============================================
-- INSTRUÇÕES DE USO
-- ============================================
-- 1. Copie todo este script
-- 2. Vá para o Supabase Dashboard > SQL Editor
-- 3. Cole o script e clique em "Run"
-- 4. Verifique se a tabela foi criada com sucesso

-- Para verificar:
-- SELECT * FROM adicoes_manuais;
