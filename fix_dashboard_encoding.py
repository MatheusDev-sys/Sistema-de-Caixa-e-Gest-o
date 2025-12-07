#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrigir encoding do dashboard.html
Converter de ISO-8859-1 para UTF-8
"""

import codecs

filepath = r'c:\Users\Matheus\Downloads\mande-flores\dashboard.html'

# Tentar ler como ISO-8859-1 e converter para UTF-8
try:
    with codecs.open(filepath, 'r', encoding='iso-8859-1') as f:
        content = f.read()
    
    # Salvar como UTF-8
    with codecs.open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('✅ Dashboard.html convertido para UTF-8!')
    print('   mÃªs → mês')
    print('   Ãšltimos → Últimos')
    
except Exception as e:
    print(f'❌ Erro: {e}')
    print('Tentando ler como UTF-8 e verificar...')
    
    try:
        with codecs.open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se tem caracteres bugados
        if 'mÃªs' in content or 'Ãšltimos' in content:
            print('⚠️  Arquivo já é UTF-8 mas tem caracteres bugados no HTML')
            print('   Isso significa que o texto está escrito errado no código')
        else:
            print('✅ Arquivo já está em UTF-8 e sem problemas')
    except Exception as e2:
        print(f'❌ Erro ao ler UTF-8: {e2}')
