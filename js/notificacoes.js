// ============================================
// SISTEMA DE NOTIFICAÇÕES ESTILIZADO
// ============================================

const Notificacao = {
    container: null,

    init() {
        // Criar container de notificações se não existir
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notificacao-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(this.container);
        }
    },

    mostrar(mensagem, tipo = 'info') {
        this.init();

        const cores = {
            success: { bg: '#10b981', icon: '✓' },
            error: { bg: '#ef4444', icon: '✕' },
            warning: { bg: '#f59e0b', icon: '⚠' },
            info: { bg: '#3b82f6', icon: 'ℹ' }
        };

        const config = cores[tipo] || cores.info;

        const notif = document.createElement('div');
        notif.style.cssText = `
            background: ${config.bg};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
            cursor: pointer;
            min-width: 300px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        `;

        // Efeito hover
        notif.onmouseenter = () => {
            notif.style.transform = 'translateY(-2px)';
            notif.style.boxShadow = '0 12px 30px rgba(0,0,0,0.35), 0 8px 15px rgba(0,0,0,0.25)';
        };
        notif.onmouseleave = () => {
            notif.style.transform = 'translateY(0)';
            notif.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.2)';
        };

        notif.innerHTML = `
            <span style="font-size: 20px; font-weight: bold;">${config.icon}</span>
            <span style="flex: 1;">${mensagem}</span>
            <span style="opacity: 0.7; font-size: 18px;">×</span>
        `;

        // Adicionar animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        if (!document.getElementById('notif-styles')) {
            style.id = 'notif-styles';
            document.head.appendChild(style);
        }

        this.container.appendChild(notif);

        // Remover ao clicar
        notif.onclick = () => this.remover(notif);

        // Auto-remover após 5 segundos
        setTimeout(() => this.remover(notif), 5000);
    },

    remover(notif) {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }, 300);
    }
};

// Substituir a função utils.mostrarNotificacao
if (typeof utils !== 'undefined') {
    utils.mostrarNotificacao = (mensagem, tipo) => {
        Notificacao.mostrar(mensagem, tipo);
    };
}

// Exportar para uso global
window.Notificacao = Notificacao;
