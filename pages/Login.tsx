import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating successful login for prototype purposes
    // In a real application, you would validate credentials against a backend here
    if (user && password) {
        navigate('/dashboard');
    } else {
        setError(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/70 to-transparent dark:from-background-dark dark:via-background-dark/70 z-10" />
             <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9ixNreopkRC1SUINRAN--W91dyItCGA_GY9jEwSLcPexiEe8yB5E6Gdv2oG0TNh3b2qbzoQNcnktY3FJhdHUeDfQwL6q2Qo0Ysaual1RnSn9LUhqxuD4KOlSqKEZnhyGuf8SxqxFjW-cl8Dh8SrSFWvtZC5YvD8olwmBPqbnJwQZK2n3D3veRMZQn53oHNnh6Ja2SjWig8sWzxDClxa_aoSzuEECLR1j35QhjMnuA2mGPhGn9ozosNzl-sITDC_czFruC5VLELHY" 
                className="h-full w-full object-cover opacity-30 dark:opacity-20"
                alt="Background flowers"
             />
        </div>

        {/* Decorative Corners */}
        <svg className="absolute top-4 left-4 size-[100px] opacity-20 z-0" viewBox="0 0 100 100" fill="none">
             <path d="M50 0C50 0 50 25 25 25C0 25 0 50 0 50" stroke="#B447EB" strokeWidth="1.5"></path>
             <path d="M50 0C50 0 25 0 25 25C25 50 0 50 0 50" stroke="#B447EB" strokeWidth="1.5" transform="rotate(90 25 25)"></path>
        </svg>
        <svg className="absolute bottom-4 right-4 size-[100px] opacity-20 z-0 rotate-180" viewBox="0 0 100 100" fill="none">
             <path d="M50 0C50 0 50 25 25 25C0 25 0 50 0 50" stroke="#B447EB" strokeWidth="1.5"></path>
             <path d="M50 0C50 0 25 0 25 25C25 50 0 50 0 50" stroke="#B447EB" strokeWidth="1.5" transform="rotate(90 25 25)"></path>
        </svg>

        <main className="relative z-20 w-full max-w-md rounded-2xl glassmorphism shadow-2xl p-8 md:p-10 border-t border-white/40">
            <div className="flex flex-col items-center text-center mb-8">
                <img 
                    src="logo_flora.png" 
                    className="h-20 w-auto mb-3 object-contain"
                    alt="Logo Flora Shop"
                />
                <h2 className="text-xl text-gray-800 dark:text-gray-100 mt-2">Bem-vindo(a) de volta!</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email ou Usuário</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">person</span>
                        <input 
                            type="text" 
                            placeholder="Seu email ou usuário" 
                            className="form-input w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-black/20 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-white"
                            required
                            value={user}
                            onChange={(e) => {
                              setUser(e.target.value);
                              if(error) setError(false);
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                        <input 
                            type="password" 
                            placeholder="••••" 
                            className="form-input w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/50 dark:bg-black/20 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-white"
                            required
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if(error) setError(false);
                            }}
                        />
                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                    </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 dark:bg-red-500/20 p-3 text-sm text-red-600 dark:text-red-400">
                    <span className="material-symbols-outlined text-base">error</span>
                    <p>Por favor, preencha todos os campos.</p>
                  </div>
                )}

                <div className="flex justify-end">
                    <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary">Esqueci minha senha</a>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
                >
                    Entrar
                </button>
            </form>
        </main>
    </div>
  );
};

export default Login;