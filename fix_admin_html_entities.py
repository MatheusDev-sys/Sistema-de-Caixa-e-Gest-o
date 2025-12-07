import re

# Ler o arquivo original
with open('admin.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Substituir caracteres problemáticos por entidades HTML
replacements = {
    'Histórico': 'Hist&oacute;rico',
    'histórico': 'hist&oacute;rico',
    'Usuários': 'Usu&aacute;rios',
    'usuários': 'usu&aacute;rios',
    'Preço': 'Pre&ccedil;o',
    'preço': 'pre&ccedil;o',
    'Ações': 'A&ccedil;&otilde;es',
    'ações': 'a&ccedil;&otilde;es',
    'Auditoria': 'Auditoria',
    'Feriados': 'Feriados',
    'Descrição': 'Descri&ccedil;&atilde;o',
    'descrição': 'descri&ccedil;&atilde;o',
    'Categoria': 'Categoria',
    'Ativo': 'Ativo',
    'Inativo': 'Inativo',
    'Edição': 'Edi&ccedil;&atilde;o',
    'edição': 'edi&ccedil;&atilde;o'
}

for original, replacement in replacements.items():
    content = content.replace(original, replacement)

# Salvar com UTF-8
with open('admin.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Caracteres especiais convertidos para entidades HTML!")
