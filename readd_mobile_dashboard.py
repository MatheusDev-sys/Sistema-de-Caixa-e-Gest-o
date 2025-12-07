#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Readicionar TODAS as mudanças mobile ao dashboard.html
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\dashboard.html'

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print('📱 Adicionando responsividade mobile ao dashboard.html\n')

# 1. Adicionar mobile-responsive.css e mobile-fix.css
if 'mobile-responsive.css' not in content:
    content = content.replace(
        '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>',
        '<link rel="stylesheet" href="css/mobile-responsive.css">\n    <link rel="stylesheet" href="css/mobile-fix.css">\n    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>'
    )
    print('✅ CSS mobile adicionado')
else:
    print('✓ CSS mobile já existe')

# 2. Adicionar anime.js
if 'animejs' not in content:
    content = content.replace(
        '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>',
        '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>\n    <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>'
    )
    print('✅ Anime.js adicionado')
else:
    print('✓ Anime.js já existe')

# 3. Adicionar mobile-menu.js
if 'mobile-menu.js' not in content:
    # Procurar pelo dashboard.js e adicionar antes
    content = content.replace(
        '<script src="js/dashboard.js"></script>',
        '<script src="js/mobile-menu.js"></script>\n    <script src="js/dashboard.js"></script>'
    )
    print('✅ Mobile-menu.js adicionado')
else:
    print('✓ Mobile-menu.js já existe')

# Salvar
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n✅ Dashboard.html atualizado com responsividade mobile!')
print('   - CSS mobile')
print('   - Anime.js')
print('   - Mobile-menu.js')
