import re

# Ler o arquivo com encoding correto (latin-1 porque foi corrompido)
with open('caixa.html', 'r', encoding='latin-1') as f:
    content = f.read()

# Atualizar a versão do JS
content = re.sub(r'caixa\.js\?v=[\d.]+', 'caixa.js?v=5.0', content)

# Salvar com encoding UTF-8 para corrigir
with open('caixa.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Versão atualizada para v=5.0 e encoding corrigido para UTF-8")
