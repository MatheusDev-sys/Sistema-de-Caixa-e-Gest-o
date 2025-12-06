// ============================================
// MÓDULO DE ADMINISTRAÇÃO
// ============================================

// Utilitários
const utils = {
    formatarMoeda: (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor),
    formatarData: (data) => {
        if (!data) return '-';
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    },
    formatarDataHora: (dataHora) => {
        if (!dataHora) return '-';
        return new Date(dataHora).toLocaleString('pt-BR');
    },
    mostrarLoading: () => {
        document.body.style.cursor = 'wait';
    },
    esconderLoading: () => {
        document.body.style.cursor = 'default';
    },
    mostrarNotificacao: (mensagem, tipo) => {
        alert(mensagem);
    },
    confirmarAcao: (mensagem) => {
        return confirm(mensagem);
    },
    obterCorCategoria: (categoria) => {
        if (!categoria) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        const hash = categoria.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
        const cores = [
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
            'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
        ];
        return cores[hash % cores.length];
    }
};

let usuarioAtualId = null;

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    const session = await auth.verificarAutenticacao();
    if (!session) return;

    const usuario = await auth.obterUsuarioAtual();
    if (usuario.cargo !== 'admin' && usuario.cargo !== 'gerente') {
        alert('Acesso não autorizado');
        window.location.href = 'dashboard.html';
        return;
    }

    usuarioAtualId = usuario.id;

    await carregarProdutos();
    await carregarFeriados();
    await carregarUsuarios();
    await carregarAuditoria();

    const produtoForm = document.getElementById('produtoForm');
    if (produtoForm) produtoForm.addEventListener('submit', salvarProduto);

    const feriadoForm = document.getElementById('feriadoForm');
    if (feriadoForm) feriadoForm.addEventListener('submit', salvarFeriado);

    const usuarioForm = document.getElementById('usuarioForm');
    if (usuarioForm) usuarioForm.addEventListener('submit', salvarUsuario);
});

// ============================================
// GESTÃO DE PRODUTOS
// ============================================

async function carregarProdutos() {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .order('nome');

        if (error) throw error;

        const tbody = document.getElementById('produtosTableBody');

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-gray-500 dark:text-gray-400">Nenhum produto cadastrado. Clique em "Adicionar Produto".</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(produto => `
            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                <td class="p-4 text-gray-900 dark:text-white font-medium">${security.sanitizeHTML(produto.nome)}</td>
                <td class="p-4 text-gray-600 dark:text-gray-300">${produto.preco_sugerido ? utils.formatarMoeda(produto.preco_sugerido) : '-'}</td>
                <td class="p-4">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${utils.obterCorCategoria(produto.categoria)}">
                        ${security.sanitizeHTML(produto.categoria || 'Sem Categoria')}
                    </span>
                </td>
                <td class="p-4">
                    ${produto.ativo
                ? '<span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Ativo</span>'
                : '<span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Inativo</span>'}
                </td>
                <td class="p-4 text-right">
                    <button onclick='editarProduto(${JSON.stringify(produto)})' class="text-primary hover:text-primary/80 font-medium mr-3 transition-colors">Editar</button>
                    <button onclick="excluirProduto('${security.sanitizeAttribute(produto.id)}')" class="text-red-500 hover:text-red-600 font-medium transition-colors">Excluir</button>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        document.getElementById('produtosTableBody').innerHTML = '<tr><td colspan="5" class="p-4 text-center text-red-500">Erro ao carregar produtos</td></tr>';
    }
}

function abrirModalProduto() {
    document.getElementById('modalProdutoTitulo').textContent = 'Novo Produto';
    document.getElementById('produtoForm').reset();
    document.getElementById('produtoId').value = '';
    document.getElementById('produtoAtivo').checked = true;
    document.getElementById('modalProduto').classList.remove('hidden');

    setTimeout(() => {
        const content = document.querySelector('#modalProduto .modal-content');
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function fecharModalProduto() {
    const content = document.querySelector('#modalProduto .modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        document.getElementById('modalProduto').classList.add('hidden');
    }, 300);
}

function editarProduto(produto) {
    document.getElementById('modalProdutoTitulo').textContent = 'Editar Produto';
    document.getElementById('produtoId').value = produto.id;
    document.getElementById('produtoNome').value = produto.nome;
    document.getElementById('produtoPreco').value = produto.preco_sugerido || '';
    document.getElementById('produtoCategoria').value = produto.categoria || '';
    document.getElementById('produtoAtivo').checked = produto.ativo;

    document.getElementById('modalProduto').classList.remove('hidden');
    setTimeout(() => {
        const content = document.querySelector('#modalProduto .modal-content');
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

async function salvarProduto(e) {
    e.preventDefault();
    utils.mostrarLoading();

    try {
        const id = document.getElementById('produtoId').value;

        // Validar e sanitizar entrada
        const nomeInput = document.getElementById('produtoNome').value;
        const precoInput = document.getElementById('produtoPreco').value;
        const categoriaInput = document.getElementById('produtoCategoria').value;

        const dados = {
            nome: security.validarNomeProduto(nomeInput),
            preco_sugerido: precoInput ? security.validarPreco(precoInput) : null,
            categoria: categoriaInput ? categoriaInput.trim() : null,
            ativo: document.getElementById('produtoAtivo').checked
        };

        let error;

        if (id) {
            ({ error } = await supabase.from('produtos').update(dados).eq('id', id));
        } else {
            ({ error } = await supabase.from('produtos').insert(dados));
        }

        if (error) throw error;

        fecharModalProduto();
        await carregarProdutos();
        utils.mostrarNotificacao('Produto salvo com sucesso!', 'success');

    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        utils.mostrarNotificacao('Erro ao salvar: ' + error.message, 'error');
    } finally {
        utils.esconderLoading();
    }
}

async function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
        const { error } = await supabase.from('produtos').delete().eq('id', id);
        if (error) throw error;
        await carregarProdutos();
        utils.mostrarNotificacao('Produto excluído!', 'success');
    } catch (error) {
        console.error('Erro:', error);
        utils.mostrarNotificacao('Erro ao excluir', 'error');
    }
}

// ============================================
// GESTÃO DE FERIADOS
// ============================================

async function carregarFeriados() {
    try {
        const { data, error } = await supabase.from('feriados').select('*').order('data');
        if (error) throw error;

        const tbody = document.getElementById('feriadosTableBody');

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500 dark:text-gray-400">Nenhum feriado cadastrado.</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(feriado => `
            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                <td class="p-4 text-gray-900 dark:text-white">${utils.formatarData(feriado.data)}</td>
                <td class="p-4 text-gray-900 dark:text-white font-medium">${security.sanitizeHTML(feriado.nome)}</td>
                <td class="p-4">
                    ${feriado.origem === 'api'
                ? '<span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">API</span>'
                : '<span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Manual</span>'}
                </td>
                <td class="p-4 text-right">
                    <button onclick="excluirFeriado('${security.sanitizeAttribute(feriado.id)}')" class="text-red-500 hover:text-red-600 font-medium transition-colors">Excluir</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar feriados:', error);
    }
}

function abrirModalFeriado() {
    document.getElementById('modalFeriadoTitulo').textContent = 'Novo Feriado';
    document.getElementById('feriadoForm').reset();
    document.getElementById('feriadoId').value = '';
    document.getElementById('feriadoAtivo').checked = true;
    document.getElementById('modalFeriado').classList.remove('hidden');

    setTimeout(() => {
        const content = document.querySelector('#modalFeriado .modal-content');
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function fecharModalFeriado() {
    const content = document.querySelector('#modalFeriado .modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        document.getElementById('modalFeriado').classList.add('hidden');
    }, 300);
}

async function salvarFeriado(e) {
    e.preventDefault();
    utils.mostrarLoading();

    try {
        const id = document.getElementById('feriadoId').value;
        const dados = {
            data: document.getElementById('feriadoData').value,
            nome: document.getElementById('feriadoNome').value,
            origem: 'manual',
            ativo: document.getElementById('feriadoAtivo').checked
        };

        let error;
        if (id) {
            ({ error } = await supabase.from('feriados').update(dados).eq('id', id));
        } else {
            ({ error } = await supabase.from('feriados').insert(dados));
        }

        if (error) throw error;

        fecharModalFeriado();
        await carregarFeriados();
        utils.mostrarNotificacao('Feriado salvo!', 'success');

    } catch (error) {
        console.error(error);
        utils.mostrarNotificacao('Erro ao salvar feriado', 'error');
    } finally {
        utils.esconderLoading();
    }
}

async function excluirFeriado(id) {
    if (!confirm('Excluir feriado?')) return;
    await supabase.from('feriados').delete().eq('id', id);
    await carregarFeriados();
}

// ============================================
// GESTÃO DE USUÁRIOS
// ============================================

async function carregarUsuarios() {
    try {
        const { data, error } = await supabase.from('usuarios').select('*').order('nome');
        if (error) throw error;

        const tbody = document.getElementById('usuariosTableBody');
        if (!tbody) return;

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500 dark:text-gray-400">Nenhum usuário cadastrado.</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(usuario => `
            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                <td class="p-4 text-gray-900 dark:text-white font-medium">${security.sanitizeHTML(usuario.nome)}</td>
                <td class="p-4 text-gray-600 dark:text-gray-300">${security.sanitizeHTML(usuario.email)}</td>
                <td class="p-4">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${usuario.cargo === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : usuario.cargo === 'gerente' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'}">
                        ${security.sanitizeHTML(usuario.cargo)}
                    </span>
                </td>
                <td class="p-4 text-right">
                    <button onclick="excluirUsuario('${security.sanitizeAttribute(usuario.id)}')" class="text-red-500 hover:text-red-600 font-medium transition-colors">Excluir</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

async function salvarUsuario(e) {
    e.preventDefault();
    alert('Criação de usuários desabilitada. Use o Supabase Auth.');
}

async function excluirUsuario(id) {
    if (!confirm('Excluir usuário?')) return;
    await supabase.from('usuarios').delete().eq('id', id);
    await carregarUsuarios();
}

// ============================================
// AUDITORIA
// ============================================

async function carregarAuditoria() {
    try {
        const { data, error } = await supabase
            .from('auditoria')
            .select('*, usuarios(nome)')
            .order('criado_em', { ascending: false })
            .limit(50);

        if (error) throw error;

        const tbody = document.getElementById('auditoriaTableBody');
        if (!tbody) return;

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500 dark:text-gray-400">Nenhum registro de auditoria.</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(log => `
            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                <td class="p-4 text-gray-600 dark:text-gray-300">${utils.formatarDataHora(log.criado_em)}</td>
                <td class="p-4 text-gray-900 dark:text-white">${log.usuarios?.nome || 'Sistema'}</td>
                <td class="p-4 text-gray-900 dark:text-white font-medium">${log.acao}</td>
                <td class="p-4 text-gray-600 dark:text-gray-300">${log.tabela}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar auditoria:', error);
    }
}

// Sincronizar feriados com BrasilAPI
async function sincronizarFeriados() {
    try {
        const anoAtual = new Date().getFullYear();

        // Mostrar loading
        const btn = event.target.closest('button');
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Sincronizando...';

        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${anoAtual}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar feriados da API');
        }

        const feriadosAPI = await response.json();

        let novos = 0;
        let existentes = 0;

        for (const feriado of feriadosAPI) {
            // Verificar se já existe
            const { data: feriadoExistente } = await supabase
                .from('feriados')
                .select('id')
                .eq('data', feriado.date)
                .single();

            if (!feriadoExistente) {
                const { error } = await supabase
                    .from('feriados')
                    .insert({
                        data: feriado.date,
                        nome: feriado.name,
                        tipo: 'nacional',
                        ativo: true
                    });

                if (!error) novos++;
            } else {
                existentes++;
            }
        }

        // Restaurar botão
        btn.disabled = false;
        btn.innerHTML = originalHTML;

        alert(`✅ Sincronização concluída!\n\n${novos} feriados novos adicionados\n${existentes} feriados já existiam`);
        await carregarFeriados();

    } catch (error) {
        console.error('Erro ao sincronizar feriados:', error);

        // Restaurar botão em caso de erro
        if (event && event.target) {
            const btn = event.target.closest('button');
            btn.disabled = false;
            btn.innerHTML = '<span class="material-symbols-outlined">sync</span> Sincronizar com API';
        }

        alert('❌ Erro ao sincronizar feriados: ' + error.message);
    }
}
