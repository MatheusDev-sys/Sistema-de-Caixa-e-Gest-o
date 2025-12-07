#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para adicionar responsividade mobile aos arquivos HTML
Adiciona CSS e JS de forma segura
"""

import os
import re

BASE_DIR = r'c:\Users\Matheus\Downloads\mande-flores'

# Arquivos HTML para processar
HTML_FILES = ['admin.html', 'dashboard.html']

def add_mobile_css(filepath):
    """Adiciona link do CSS mobile após o Supabase script"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se já tem o CSS
        if 'mobile-responsive.css' in content:
            print(f"  ✓ {os.path.basename(filepath)} - CSS já existe")
            return False
        
        # Adicionar CSS após o script do Supabase
        pattern = r'(<script src="https://cdn\.jsdelivr\.net/npm/@supabase/supabase-js@2"></script>)'
        replacement = r'\1\n    <link rel="stylesheet" href="css/mobile-responsive.css">'
        
        new_content = re.sub(pattern, replacement, content, count=1)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✅ {os.path.basename(filepath)} - CSS adicionado")
            return True
        else:
            print(f"  ⚠️  {os.path.basename(filepath)} - Padrão não encontrado")
            return False
            
    except Exception as e:
        print(f"  ❌ {os.path.basename(filepath)} - Erro: {e}")
        return False

def add_mobile_js(filepath):
    """Adiciona script mobile-menu.js antes do admin.js ou dashboard.js"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se já tem o JS
        if 'mobile-menu.js' in content:
            print(f"  ✓ {os.path.basename(filepath)} - JS já existe")
            return False
        
        # Determinar qual script procurar
        if 'admin.html' in filepath:
            target_script = 'admin.js'
        elif 'dashboard.html' in filepath:
            target_script = 'dashboard.js'
        else:
            target_script = None
        
        if not target_script:
            print(f"  ⚠️  {os.path.basename(filepath)} - Script alvo não identificado")
            return False
        
        # Adicionar mobile-menu.js antes do script específico
        pattern = f'(<script src="js/{target_script}"></script>)'
        replacement = f'<script src="js/mobile-menu.js"></script>\n    \\1'
        
        new_content = re.sub(pattern, replacement, content, count=1)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✅ {os.path.basename(filepath)} - JS adicionado")
            return True
        else:
            print(f"  ⚠️  {os.path.basename(filepath)} - Padrão não encontrado")
            return False
            
    except Exception as e:
        print(f"  ❌ {os.path.basename(filepath)} - Erro: {e}")
        return False

def main():
    print("📱 Adicionando Responsividade Mobile\n")
    
    total_css = 0
    total_js = 0
    
    for html_file in HTML_FILES:
        filepath = os.path.join(BASE_DIR, html_file)
        
        if not os.path.exists(filepath):
            print(f"⚠️  {html_file} não encontrado")
            continue
        
        print(f"\n📄 Processando {html_file}:")
        
        # Adicionar CSS
        if add_mobile_css(filepath):
            total_css += 1
        
        # Adicionar JS
        if add_mobile_js(filepath):
            total_js += 1
    
    print(f"\n\n✅ Concluído!")
    print(f"   CSS adicionado em: {total_css} arquivos")
    print(f"   JS adicionado em: {total_js} arquivos")
    print(f"\n📱 Responsividade mobile ativada!")

if __name__ == '__main__':
    main()
