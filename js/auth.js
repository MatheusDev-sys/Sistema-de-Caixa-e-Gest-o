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
    // Se a data está no formato YYYY-MM-DD (sem horário), adicionar T00:00:00 para forçar interpretação local
    // Isso evita problemas de timezone que fazem a data aparecer como dia anterior
    if (typeof data === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data)) {
        data = data + 'T00:00:00';
    }
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

// Mostrar notificação - Usa o sistema estilizado de notificacoes.js
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Se o sistema de notificações estilizado estiver disponível, usar ele
    if (typeof Notificacao !== 'undefined' && Notificacao.mostrar) {
        Notificacao.mostrar(mensagem, tipo);
    } else {
        // Fallback: criar notificação simples mas com estilo
        const container = document.getElementById('notificacao-container') || criarContainerNotificacoes();

        const cores = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        const bg = cores[tipo] || cores.info;

        const notificacao = document.createElement('div');
        notificacao.style.cssText = `
            background: ${bg};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 300px;
        `;
        notificacao.textContent = mensagem;

        container.appendChild(notificacao);

        // Animar entrada se anime.js estiver disponível
        if (typeof anime !== 'undefined') {
            anime({
                targets: notificacao,
                translateX: [300, 0],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }

        // Remover ao clicar
        notificacao.onclick = () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: notificacao,
                    translateX: [0, 300],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: () => notificacao.remove()
                });
            } else {
                notificacao.remove();
            }
        };

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notificacao.parentNode) {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: notificacao,
                        translateX: [0, 300],
                        opacity: [1, 0],
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: () => notificacao.remove()
                    });
                } else {
                    notificacao.remove();
                }
            }
        }, 5000);
    }
}

// Criar container de notificações
function criarContainerNotificacoes() {
    const container = document.createElement('div');
    container.id = 'notificacao-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
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
