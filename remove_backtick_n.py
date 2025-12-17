#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Remover `n do dashboard.html
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\dashboard.html'

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Contar quantos `n existem
count_before = content.count('`n')
print(f'Encontrados {count_before} ocorrências de `n')

# Remover todos os `n
content = content.replace('`n', '')

# Contar depois
count_after = content.count('`n')

# Salvar
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'✅ Removidos {count_before - count_after} ocorrências de `n')
print('✅ Dashboard.html corrigido!')
