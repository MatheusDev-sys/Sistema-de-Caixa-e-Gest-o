with open('caixa.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# Encontrar a linha que contém "caixaTotalVendas" e adicionar a nova linha depois
new_lines = []
for i, line in enumerate(lines):
    new_lines.append(line)
    if 'id="caixaTotalVendas"' in line and '</span></p>' in line:
        # Adicionar a linha do Saldo Atual
        indent = '                                '
        new_line = f'{indent}<p class="text-green-600 dark:text-green-400 font-bold"><strong>Saldo Atual:</strong> <span id="caixaSaldoAtual">R$ 0,00</span></p>\r\n'
        new_lines.append(new_line)
        print(f"✅ Linha adicionada após linha {i+1}")

# Salvar o arquivo
with open('caixa.html', 'w', encoding='utf-8', errors='ignore') as f:
    f.writelines(new_lines)

print("✅ Arquivo salvo com sucesso!")
