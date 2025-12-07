// ========================================
// MOBILE MENU - Botão Hamburger
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Criar botão hamburger
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = `
        <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    document.body.appendChild(menuBtn);

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Pegar sidebar
    const sidebar = document.querySelector('aside');

    // Toggle menu
    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Fechar ao clicar no overlay
    overlay.addEventListener('click', function () {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        menuBtn.classList.remove('active');
    });

    // Adicionar classe table-responsive nas tabelas
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
});
