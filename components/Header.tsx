import React from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  
  const getTitle = () => {
    switch(location.pathname) {
      case '/dashboard': return 'Dashboard Geral';
      case '/caixa': return 'Gerenciamento de Caixa';
      case '/produtos': return 'Gerenciar Produtos';
      case '/feriados': return 'Gerenciar Feriados';
      case '/usuarios': return 'Gerenciar Usuários';
      case '/historico': return 'Caixas Anteriores';
      case '/auditoria': return 'Logs de Auditoria';
      default: return 'Mande Flores';
    }
  };

  return (
    <header className="flex-shrink-0 px-6 py-4">
      <div className="flex items-center justify-between whitespace-nowrap rounded-xl glassmorphism px-6 py-3 shadow-glass">
        <div className="flex items-center gap-4 text-gray-800 dark:text-white">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-lg md:text-xl font-bold leading-tight truncate">{getTitle()}</h2>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="hidden sm:flex items-center justify-center rounded-full size-10 bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-black/30 transition-colors">
            <span className="material-symbols-outlined">toggle_on</span>
          </button>
          <button className="flex items-center justify-center rounded-full size-10 bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-black/30 transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
          </button>
           <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white/50 dark:border-white/10" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCX9Q-I0YvwdTTtCJUzyXbi5kAaO9N6LRNFEWPTF411c28vi_emaeKznNtuA6wJFRgj5rjJA7kvsH38taKIF8WSM5Ot5YLZ6R5oBfjBVEOcmiyAecB3lDiFoF4eccEPGHN-CqbiwxQYMaJabhaP0Oe0P16BWhZrvuofnElN_FQ7PmOWm3GzH9slOCtJ8Iv_TVo3OYVV_9jVpXlxCWguYfcO77dR-JG37xQVupLX-Ln8gK24_AHOfuToy5BkMG29qQW36igF0IR184I")' }}
            />
        </div>
      </div>
    </header>
  );
};

export default Header;