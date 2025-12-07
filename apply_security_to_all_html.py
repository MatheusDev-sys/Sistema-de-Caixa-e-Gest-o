#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para aplicar correções de segurança em todos os arquivos HTML
Adiciona CSP e security.js
"""

import os
import re

# Diretório base
BASE_DIR = r'c:\Users\Matheus\Downloads\mande-flores'

# CSP Header
CSP_META = '''<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://brasilapi.com.br; frame-src 'none';">'''

# Arquivos HTML principais para processar
HTML_FILES = [
    'admin.html',
    'dashboard.html',
    'caixas-anteriores.html',
    'index.html'
]

def add_csp_to_html(filepath):
    """Adiciona CSP ao HTML se ainda não tiver"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se já tem CSP
        if 'Content-Security-Policy' in content:
            print(f"  ✓ {os.path.basename(filepath)} - CSP já existe")
            return False
        
        # Adicionar CSP após o charset
        pattern = r'(<meta\s+charset=["\'][^"\']+["\'][^>]*>)'
        replacement = r'\1\n    ' + CSP_META
        
        new_content = re.sub(pattern, replacement, content, count=1)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✓ {os.path.basename(filepath)} - CSP adicionado")
            return True
        else:
            print(f"  ✗ {os.path.basename(filepath)} - Padrão não encontrado")
            return False
            
    except Exception as e:
        print(f"  ✗ {os.path.basename(filepath)} - Erro: {e}")
        return False

def add_security_js_to_html(filepath):
    """Adiciona security.js aos scripts se ainda não tiver"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se já tem security.js
        if 'security.js' in content:
            print(f"  ✓ {os.path.basename(filepath)} - security.js já existe")
            return False
        
        # Adicionar security.js após config.js
        pattern = r'(<script\s+src=["\']js/config\.js["\'][^>]*></script>)'
        replacement = r'\1\n    <script src="js/security.js"></script>'
        
        new_content = re.sub(pattern, replacement, content, count=1)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✓ {os.path.basename(filepath)} - security.js adicionado")
            return True
        else:
            print(f"  ✗ {os.path.basename(filepath)} - Padrão não encontrado")
            return False
            
    except Exception as e:
        print(f"  ✗ {os.path.basename(filepath)} - Erro: {e}")
        return False

def main():
    print("🔒 Aplicando Correções de Segurança em Todos os HTMLs\n")
    
    total_csp = 0
    total_js = 0
    
    for html_file in HTML_FILES:
        filepath = os.path.join(BASE_DIR, html_file)
        
        if not os.path.exists(filepath):
            print(f"⚠️  {html_file} não encontrado")
            continue
        
        print(f"\n📄 Processando {html_file}:")
        
        # Adicionar CSP
        if add_csp_to_html(filepath):
            total_csp += 1
        
        # Adicionar security.js
        if add_security_js_to_html(filepath):
            total_js += 1
    
    print(f"\n\n✅ Concluído!")
    print(f"   CSP adicionado em: {total_csp} arquivos")
    print(f"   security.js adicionado em: {total_js} arquivos")

if __name__ == '__main__':
    main()
