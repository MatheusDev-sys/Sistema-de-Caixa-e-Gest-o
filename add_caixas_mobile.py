#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adicionar responsividade ao caixas-anteriores.html
"""

import os
import re

BASE_DIR = r'c:\Users\Matheus\Downloads\mande-flores'
filepath = os.path.join(BASE_DIR, 'caixas-anteriores.html')

def add_mobile_css():
    """Adiciona CSS mobile"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'mobile-responsive.css' in content:
        print("✓ CSS já existe")
        return
    
    pattern = r'(<script src="https://cdn\.jsdelivr\.net/npm/@supabase/supabase-js@2"></script>)'
    replacement = r'\1\n    <link rel="stylesheet" href="css/mobile-responsive.css">'
    
    new_content = re.sub(pattern, replacement, content, count=1)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("✅ CSS adicionado")

def add_mobile_js():
    """Adiciona JS mobile"""
    with open(filepath, 'r', encoding='utf-8') as f:
    print("✅ JS adicionado")

print("📱 Adicionando responsividade ao caixas-anteriores.html\n")
add_mobile_css()
add_mobile_js()
print("\n✅ Concluído!")
