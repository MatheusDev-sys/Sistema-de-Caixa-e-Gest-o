// ============================================
// MÓDULO DE AUTENTICAÇÃO E FUNÇÕES AUXILIARES
// ============================================

// Verificar se o usuário está autenticado
async function verificarAutenticacao() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        window.location.href = 'index.html';
        return null;
    }

    return session;
}

// Obter dados do usuário atual
async function obterUsuarioAtual() {
    const session = await verificarAutenticacao();
    if (!session) return null;

    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        return null;
    }
}

// Verificar permissão por cargo
async function verificarPermissao(cargosPermitidos) {
    const usuario = await obterUsuarioAtual();

    if (!usuario) {
        window.location.href = 'index.html';
        return false;
    }

    if (!cargosPermitidos.includes(usuario.cargo)) {
        alert('Você não tem permissão para acessar esta página.');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

// Logout
async function fazerLogout() {
    try {
        await supabase.auth.signOut();
        sessionStorage.clear();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

// Formatar moeda brasileira
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Formatar data brasileira
function formatarData(data) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
}

// Formatar data e hora brasileira
function formatarDataHora(data) {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(new Date(data));
}

// Obter dia da semana
function obterDiaSemana(data = new Date()) {
    const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    return dias[data.getDay()];
}

// Obter saudação personalizada
function obterSaudacao() {
    const hora = new Date().getHours();

    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
}

// Mostrar notificação
function mostrarNotificacao(mensagem, tipo = 'info') {
    const container = document.getElementById('notificacoes') || criarContainerNotificacoes();

    const notificacao = document.createElement('div');
    notificacao.className = `alert alert-${tipo}`;
    notificacao.textContent = mensagem;

    container.appendChild(notificacao);

    // Animar entrada
    anime({
        targets: notificacao,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });

    // Remover após 5 segundos
    setTimeout(() => {
        anime({
            targets: notificacao,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => notificacao.remove()
        });
    }, 5000);
}

// Criar container de notificações
function criarContainerNotificacoes() {
    const container = document.createElement('div');
    container.id = 'notificacoes';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
}

// Mostrar loading overlay
function mostrarLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
}

// Esconder loading overlay
function esconderLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Confirmar ação
function confirmarAcao(mensagem) {
    return confirm(mensagem);
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar valor monetário
function validarValor(valor) {
    const numero = parseFloat(valor);
    return !isNaN(numero) && numero > 0;
}

// Registrar auditoria
async function registrarAuditoria(acao, tabela, detalhes) {
    try {
        const usuario = await obterUsuarioAtual();
        if (!usuario) return;

        await supabase
            .from('auditoria')
            .insert({
                usuario_id: usuario.id,
                acao: acao,
                tabela: tabela,
                detalhes: detalhes
            });
    } catch (error) {
        console.error('Erro ao registrar auditoria:', error);
    }
}

// Exportar funções para uso global
window.auth = {
    verificarAutenticacao,
    obterUsuarioAtual,
    verificarPermissao,
    fazerLogout
};

window.utils = {
    formatarMoeda,
    formatarData,
    formatarDataHora,
    obterDiaSemana,
    obterSaudacao,
    mostrarNotificacao,
    mostrarLoading,
    esconderLoading,
    confirmarAcao,
    validarEmail,
    validarValor,
    registrarAuditoria
};
