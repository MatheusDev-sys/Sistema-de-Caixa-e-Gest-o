import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/caixa', label: 'Caixa', icon: 'point_of_sale' },
    { path: '/produtos', label: 'Produtos', icon: 'potted_plant' },
    { path: '/historico', label: 'Histórico', icon: 'history' },
    { path: '/feriados', label: 'Feriados', icon: 'event_busy' },
    { path: '/usuarios', label: 'Usuários', icon: 'group' },
    { path: '/auditoria', label: 'Auditoria', icon: 'manage_history' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex-shrink-0 p-4 h-full
      `}>
        <div className="flex h-full flex-col justify-between rounded-xl glassmorphism p-4 shadow-glass">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <img src="logo_flora.png" alt="Mande Flores" className="h-10 w-auto object-contain" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white font-display">Mande Flores</h1>
            </div>

            <div className="flex flex-col gap-4">
              {/* User Profile Snippet */}
              <div className="flex items-center gap-3 px-3 py-2 bg-white/30 dark:bg-black/20 rounded-lg">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxHsF7MfNUUjlBDNZlCAle_h_pbZgt3bQQtD4jXAFMyn2cxhIThVMUanF1UaWRyh1zBkx94I5BWSNWNvuxcvq_VS3BT1ovWEB4bNcF1o-J__dEyBT93fMf4vKA3p-SmV-xaeSWo3yDom2GdVVS54vSblXN_fXQKMq1PM19vRboBcNiKI8x9rzs2ins_Jb0hvuM-zquQaoss49LUp-T136OV-HC_dZFSyy15KRRMqkrI2oyf6n4rSgDSPUGfcosi2p8mVvgXbmBGHQ")' }}
                />
                <div className="flex flex-col overflow-hidden">
                  <h1 className="text-gray-900 dark:text-gray-100 text-sm font-bold truncate">Mande Flores</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-xs truncate">Painel do Gerente</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-250px)]">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary/20 text-primary dark:bg-primary/30 font-semibold shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:pl-4'
                    }`}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>
                      {item.icon}
                    </span>
                    <p className="text-sm leading-normal">{item.label}</p>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-gray-200/20">
            <Link 
              to="/login" 
              className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <p className="text-sm font-medium leading-normal">Sair</p>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;