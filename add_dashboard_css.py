#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adicionar CSS específico para dashboard mobile
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\css\mobile-responsive.css'

# CSS para adicionar
dashboard_css = """
    
    /* ===== DASHBOARD - Reduzir espaço dos cards ===== */
    .metric-card {
        padding: 0.75rem !important;
    }
    
    /* Grid de stats em 2 colunas */
    .grid-cols-4 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.5rem !important;
    }
"""

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Procurar pelo fechamento do media query
# Adicionar antes do }
lines = content.split('\n')
new_lines = []
added = False

for i, line in enumerate(lines):
    # Procurar pela linha que fecha o primeiro @media
    if not added and line.strip() == '}' and i > 60 and i < 70:
        # Adicionar CSS antes do }
        for css_line in dashboard_css.split('\n'):
            new_lines.append(css_line)
        added = True
    new_lines.append(line)

if added:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print('✅ CSS do dashboard adicionado com sucesso!')
else:
    print('⚠️  Não foi possível adicionar automaticamente')
