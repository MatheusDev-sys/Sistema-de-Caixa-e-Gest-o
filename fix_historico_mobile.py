#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adicionar mobile-menu.js ao caixas-anteriores.html
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\caixas-anteriores.html'

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'mobile-menu.js' in content:
    print('✓ mobile-menu.js já existe')
else:
    # Adicionar antes do caixas-pdf.js
    content = content.replace(
        '<script src="js/caixas-pdf.js?v=1.0"></script>',
        '<script src="js/mobile-menu.js"></script>\n    <script src="js/caixas-pdf.js?v=1.0"></script>'
    )
    
    # Salvar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('✅ mobile-menu.js adicionado ao histórico!')
