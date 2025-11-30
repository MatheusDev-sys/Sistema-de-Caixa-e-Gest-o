// Gerar Sidebar
function gerarSidebar(paginaAtual) {
    const cargo = sessionStorage.getItem('userCargo');
    const userName = sessionStorage.getItem('userName') || 'Usuário';
    const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const menuItems = {
        funcionario: [
            { icon: 'point_of_sale', label: 'Caixa', href: 'caixa.html', page: 'caixa' }
        ],
        gerente: [
            { icon: 'dashboard', label: 'Dashboard', href: 'dashboard.html', page: 'dashboard' },
            { icon: 'point_of_sale', label: 'Caixa Atual', href: 'caixa.html', page: 'caixa' },
            { icon: 'history', label: 'Caixas Anteriores', href: 'caixas-anteriores.html', page: 'caixas-anteriores' },
            { icon: 'local_florist', label: 'Produtos', href: 'admin.html?tab=produtos', page: 'admin' }
        ],
        admin: [
            { icon: 'dashboard', label: 'Dashboard', href: 'dashboard.html', page: 'dashboard' },
            { icon: 'point_of_sale', label: 'Caixa Atual', href: 'caixa.html', page: 'caixa' },
            { icon: 'history', label: 'Caixas Anteriores', href: 'caixas-anteriores.html', page: 'caixas-anteriores' },
            { icon: 'local_florist', label: 'Produtos', href: 'admin.html?tab=produtos', page: 'admin' },
            { icon: 'event_busy', label: 'Feriados', href: 'admin.html?tab=feriados', page: 'admin' },
            { icon: 'group', label: 'Usuários', href: 'admin.html?tab=usuarios', page: 'admin' },
            { icon: 'manage_history', label: 'Auditoria', href: 'admin.html?tab=auditoria', page: 'admin' }
        ]
    };

    const items = menuItems[cargo] || menuItems.funcionario;

    return `
        <aside class="w-64 flex-shrink-0 p-4">
            <div class="flex h-full flex-col justify-between rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-black/30 shadow-lg p-4">
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-3 px-2">
                        <div class="w-10 h-10">
                            <img src="assets/images/logo.png" alt="Logo" class="w-full h-full object-contain" onerror="this.style.display='none'"/>
                        </div>
                        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Mande Flores</h1>
                    </div>
                    <div class="flex items-center gap-3 px-3 py-2">
                        <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center text-primary font-semibold">
                            ${initials}
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-gray-900 dark:text-gray-100 text-base font-medium">${userName}</h1>
                            <p class="text-gray-500 dark:text-gray-400 text-sm capitalize">${cargo}</p>
                        </div>
                    </div>
                    <nav class="flex flex-col gap-2">
                        ${items.map(item => `
                            <a class="flex items-center gap-3 px-3 py-2 rounded-lg ${paginaAtual === item.page ? 'bg-primary/20 text-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-primary/10'} transition-colors" href="${item.href}">
                                <span class="material-symbols-outlined">${item.icon}</span>
                                <p class="text-sm font-medium">${item.label}</p>
                            </a>
                        `).join('')}
                    </nav>
                </div>
                <div class="flex flex-col gap-1">
                    <a class="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 rounded-lg transition-colors" href="#" onclick="abrirConfiguracoes(); return false;">
                        <span class="material-symbols-outlined">settings</span>
                        <p class="text-sm font-medium">Configurações</p>
                    </a>
                    <a class="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 rounded-lg transition-colors" href="#" onclick="auth.fazerLogout(); return false;">
                        <span class="material-symbols-outlined">logout</span>
                        <p class="text-sm font-medium">Sair</p>
                    </a>
                </div>
            </div>
        </aside>
    `;
}

function inserirSidebar(paginaAtual) {
    const sidebarExistente = document.querySelector('aside');
    if (sidebarExistente) sidebarExistente.remove();
    const container = document.getElementById('app-container');
    if (container) container.insertAdjacentHTML('afterbegin', gerarSidebar(paginaAtual));
}

function abrirConfiguracoes() {
    alert('Modal de configurações - implementar upload de avatar');
}
