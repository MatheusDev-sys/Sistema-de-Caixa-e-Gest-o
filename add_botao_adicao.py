import re

# Ler o arquivo
with open('caixa.html', 'r', encoding='latin-1') as f:
    content = f.read()

# 1. Mudar grid de 2 para 3 colunas
content = content.replace('md:grid-cols-2 gap-4', 'md:grid-cols-3 gap-4', 1)

# 2. Adicionar botão "Adicionar Saldo" antes do botão "Fechamento"
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

pattern_botao = r'(</button>\s+<!-- Fechamento -->)'
content = re.sub(pattern_botao, botao_adicao + r'\1', content, count=1)

# 3. Adicionar modal antes dos scripts
modal_adicao = '''
    <!-- Modal Adição Manual -->
    <div id="modalAdicao"
        class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Adicionar Saldo ao Caixa</h3>
            <form id="adicaoForm" class="space-y-4">
                <label class="flex flex-col">
                    <p class="text-gray-900 dark:text-white text-sm font-medium pb-2">Descrição</p>
                    <input type="text" id="descricaoAdicao"
                        class="form-input rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-12 p-3"
                        placeholder="Ex: Troco adicionado" required />
                </label>

                <label class="flex flex-col">
                    <p class="text-gray-900 dark:text-white text-sm font-medium pb-2">Valor</p>
                    <input type="number" id="valorAdicao" step="0.01" min="0"
                        class="form-input rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-12 p-3"
                        placeholder="R$ 0,00" required />
                </label>

                <label class="flex flex-col">
                    <p class="text-gray-900 dark:text-white text-sm font-medium pb-2">Senha Mestra</p>
                    <input type="password" id="senhaMestraAdicao"
                        class="form-input rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-12 p-3"
                        placeholder="Digite a senha mestra" required />
                </label>

                <div class="flex gap-3 pt-4">
                    <button type="submit"
                        class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Adicionar</button>
                    <button type="button" onclick="document.getElementById('modalAdicao').classList.add('hidden')"
                        class="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

'''

pattern_scripts = r'(\s+<!-- Scripts -->)'
content = re.sub(pattern_scripts, modal_adicao + r'\1', content, count=1)

# Salvar o arquivo
with open('caixa.html', 'w', encoding='latin-1') as f:
    f.write(content)

print("✅ Botão e modal de adição de saldo adicionados com sucesso!")
print("✅ Grid alterado para 3 colunas")
