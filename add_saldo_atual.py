# -*- coding: utf-8 -*-

# Ler arquivo
with open('caixa.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Encontrar a linha com caixaTotalVendas e adicionar Saldo Atual depois
new_lines = []
for i, line in enumerate(lines):
    new_lines.append(line)
    # Procurar pela linha que fecha o parágrafo de Total Vendas
    if 'id="caixaTotalVendas"' in line and '</span></p>' in line:
        # Adicionar a linha do Saldo Atual
        new_lines.append('                                <p class="text-green-600 dark:text-green-400 font-bold"><strong>Saldo Atual:</strong> <span id="caixaSaldoAtual">R$ 0,00</span></p>\n')

# Salvar
with open('caixa.html', 'w', encoding='utf-8', newline='') as f:
    f.writelines(new_lines)

print("✅ Saldo Atual adicionado!")
