# -*- coding: utf-8 -*-
import re

# Ler arquivo preservando encoding
with open('caixa.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Código do botão a ser inserido
botao_adicao = '''
                                <!-- Adicionar Saldo -->
                                <button onclick="document.getElementById('modalAdicao').classList.remove('hidden')"
                                    class="flex flex-col rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-black/30 shadow-lg p-6 justify-center items-center text-center hover:bg-white/70 dark:hover:bg-black/30 transition-colors">
                                    <span class="material-symbols-outlined text-4xl text-green-600 mb-2">add_circle</span>
                                    <p
                                        class="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-2">
                                        Adicionar Saldo</p>
                                    <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
                                        Adicionar dinheiro ao caixa</p>
                                </button>
'''

# Procurar pelo padrão exato e inserir o botão ANTES de "<!-- Fechamento -->"
# Usar regex para encontrar o fechamento do botão de retirada seguido pelo comentário de fechamento
pattern = r'(</button>\r?\n\r?\n                                <!-- Fechamento -->)'
replacement = r'</button>' + botao_adicao + r'\n                                <!-- Fechamento -->'

# Fazer a substituição
new_content = re.sub(pattern, replacement, content, count=1)

# Verificar se a substituição foi feita
if new_content != content:
    # Salvar com UTF-8
    with open('caixa.html', 'w', encoding='utf-8', newline='') as f:
        f.write(new_content)
    print("✅ Botão adicionado com sucesso!")
    print("✅ Encoding UTF-8 preservado")
else:
    print("❌ Padrão não encontrado. Tentando abordagem alternativa...")
    # Tentar encontrar apenas o comentário
    if '<!-- Fechamento -->' in content:
        content = content.replace(
            '                                <!-- Fechamento -->',
            botao_adicao + '\n                                <!-- Fechamento -->',
            1
        )
        with open('caixa.html', 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print("✅ Botão adicionado (método alternativo)!")
    else:
        print("❌ Não foi possível encontrar o local para inserir o botão")
