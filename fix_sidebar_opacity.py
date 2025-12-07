#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrigir sidebar transparente no dashboard
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\css\mobile-responsive.css'

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Procurar e substituir
old_text = """    aside.mobile-open {
        left: 0 !important;
        box-shadow: 2px 0 10px rgba(0,0,0,0.3) !important;
    }"""

new_text = """    aside.mobile-open {
        left: 0 !important;
        box-shadow: 2px 0 10px rgba(0,0,0,0.3) !important;
        background: white !important;  /* Fundo sólido quando aberto */
    }
    
    /* Sidebar aberto em dark mode */
    .dark aside.mobile-open {
        background: #1c1121 !important;
    }"""

new_content = content.replace(old_text, new_text)

if new_content != content:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('✅ Sidebar opaco adicionado!')
else:
    print('⚠️  Padrão não encontrado')
    print('Tentando com \\r\\n...')
    
    # Tentar com \r\n
    old_text = old_text.replace('\n', '\r\n')
    new_text = new_text.replace('\n', '\r\n')
    
    new_content = content.replace(old_text, new_text)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('✅ Sidebar opaco adicionado!')
    else:
        print('❌ Não foi possível adicionar')
