#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrigir textos com encoding errado no dashboard.html
Substituir por HTML entities
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\dashboard.html'

# Ler arquivo como está
with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Substituições
replacements = {
    'UsuÃ¡rio': 'Usuário',
    'mÃªs': 'mês',
    'Ãšltimos': 'Últimos',
}

modified = False
for old, new in replacements.items():
    if old in content:
        content = content.replace(old, new)
        modified = True
        print(f'✅ {old} → {new}')

if modified:
    # Salvar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('\n✅ Dashboard.html corrigido!')
else:
    print('⚠️  Nenhum texto com encoding errado encontrado')
