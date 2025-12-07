import re

# Ler o arquivo
with open('js/caixa.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Substituir forma_pagamento por pagamento no filtro
content = content.replace(
    ".filter(v => v.forma_pagamento === 'dinheiro')",
    ".filter(v => v.pagamento === 'dinheiro')"
)

# Salvar
with open('js/caixa.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Correção aplicada: forma_pagamento → pagamento")
