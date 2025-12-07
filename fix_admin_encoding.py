import codecs
import sys

# Ler o arquivo com encoding atual (provavelmente ISO-8859-1 ou Windows-1252)
with open('admin.html', 'r', encoding='iso-8859-1', errors='replace') as f:
    content = f.read()

# Salvar com UTF-8 sem BOM
with open('admin.html', 'w', encoding='utf-8', errors='replace') as f:
    f.write(content)

print("Arquivo admin.html convertido para UTF-8 com sucesso!")
