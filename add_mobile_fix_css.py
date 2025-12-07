#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adicionar mobile-fix.css ao caixas-anteriores.html
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\caixas-anteriores.html'

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'mobile-fix.css' in content:
    print('✓ mobile-fix.css já existe')
else:
    # Adicionar depois do mobile-responsive.css
    content = content.replace(
        '<link rel="stylesheet" href="css/mobile-responsive.css">',
        '<link rel="stylesheet" href="css/mobile-responsive.css">\n    <link rel="stylesheet" href="css/mobile-fix.css">'
    )
    
    # Salvar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('✅ mobile-fix.css adicionado ao histórico!')
