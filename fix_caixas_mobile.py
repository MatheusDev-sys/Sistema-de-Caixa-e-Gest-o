#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adicionar mobile-menu.js ao caixas-anteriores.html
"""

filepath = r'c:\Users\Matheus\Downloads\mande-flores\caixas-anteriores.html'

# Ler arquivo
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Verificar se já tem
if 'mobile-menu.js' in content:
    print('✓ mobile-menu.js já existe no arquivo')
else:
    # Adicionar script antes do caixas-pdf.js
    old_text = '    <!-- PDF externo com melhorias -->\r\n    <script src="js/caixas-pdf.js?v=1.0"></script>'
    new_text = '    <script src="js/mobile-menu.js"></script>\r\n    <!-- PDF externo com melhorias -->\r\n    <script src="js/caixas-pdf.js?v=1.0"></script>'
    
    new_content = content.replace(old_text, new_text)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('✅ mobile-menu.js adicionado com sucesso!')
    else:
        print('⚠️  Padrão não encontrado, tentando sem \\r\\n')
        # Tentar sem \r\n
        old_text = '    <!-- PDF externo com melhorias -->\n    <script src="js/caixas-pdf.js?v=1.0"></script>'
        new_text = '    <script src="js/mobile-menu.js"></script>\n    <!-- PDF externo com melhorias -->\n    <script src="js/caixas-pdf.js?v=1.0"></script>'
        
        new_content = content.replace(old_text, new_text)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('✅ mobile-menu.js adicionado com sucesso!')
        else:
            print('❌ Não foi possível adicionar automaticamente')
            print('Por favor, adicione manualmente a linha:')
            print('    <script src="js/mobile-menu.js"></script>')
            print('Antes da linha:')
            print('    <script src="js/caixas-pdf.js?v=1.0"></script>')
