with open('caixa.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

new_lines = []
modal_adicionado = False
grid_alterado = False
botao_adicionado = False

for i, line in enumerate(lines):
    # 1. Alterar grid de 2 para 3 colunas
    if 'md:grid-cols-2 gap-4' in line and not grid_alterado:
        line = line.replace('md:grid-cols-2 gap-4', 'md:grid-cols-3 gap-4')
        grid_alterado = True
        print(f"✅ Grid alterado para 3 colunas na linha {i+1}")
    
    new_lines.append(line)
    
    # 2. Adicionar botão "Adicionar Saldo" antes do botão "Fechamento"
    if '<!-- Fechamento -->' in line and not botao_adicionado:
        indent = '                                '
        botao = f'''{indent}<!-- Adicionar Saldo -->
{indent}<button onclick="document.getElementById('modalAdicao').classList.remove('hidden')"
{indent}    class="flex flex-col rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-black/30 shadow-lg p-6 justify-center items-center text-center hover:bg-white/70 dark:hover:bg-black/30 transition-colors">
{indent}    <span class="material-symbols-outlined text-4xl text-green-600 mb-2">add_circle</span>
{indent}    <p
{indent}        class="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-2">
{indent}        Adicionar Saldo</p>
{indent}    <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">
{indent}        Adicionar dinheiro ao caixa</p>
{indent}</button>

'''
        new_lines.insert(-1, botao)
        botao_adicionado = True
        print(f"✅ Botão 'Adicionar Saldo' adicionado na linha {i+1}")
    
    # 3. Adicionar modal antes dos Scripts
    if '<!-- Scripts -->' in line and not modal_adicionado:
        modal = '''    <!-- Modal Adição Manual -->
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
        new_lines.insert(-1, modal)
        modal_adicionado = True
        print(f"✅ Modal de adição adicionado na linha {i+1}")

with open('caixa.html', 'w', encoding='utf-8', errors='ignore') as f:
    f.writelines(new_lines)

print("\n🎉 Todas as mudanças foram aplicadas com sucesso!")
print(f"   - Grid: {'✅' if grid_alterado else '❌'}")
print(f"   - Botão: {'✅' if botao_adicionado else '❌'}")
print(f"   - Modal: {'✅' if modal_adicionado else '❌'}")
