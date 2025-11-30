import React from 'react';

const Audit: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <div className="rounded-xl glassmorphism p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-4xl text-primary">manage_history</span>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Logs de Auditoria</h1>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">calendar_today</span>
                        <input type="date" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:ring-primary/50 text-gray-900 dark:text-white" />
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined">filter_alt</span>
                        Filtrar
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b-2 border-primary/20">
                        <tr>
                            <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Ação</th>
                            <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Usuário</th>
                            <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Data e Hora</th>
                            <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 text-center">Detalhes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                        {[
                            { action: 'Login de Usuário', user: 'ana.silva@email.com', date: '27/10/2023 09:15:32' },
                            { action: 'Atualização de Produto', user: 'carlos.adm@email.com', date: '27/10/2023 10:02:11' },
                            { action: 'Exclusão de Venda', user: 'carlos.adm@email.com', date: '27/10/2023 11:45:05' },
                            { action: 'Cadastro de Cliente', user: 'beatriz.vendas@email.com', date: '27/10/2023 14:20:50' },
                            { action: 'Fechamento de Caixa', user: 'ana.silva@email.com', date: '27/10/2023 18:05:00' },
                        ].map((log, i) => (
                            <tr key={i} className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                                <td className="p-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{log.action}</td>
                                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{log.user}</td>
                                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{log.date}</td>
                                <td className="p-4 text-center">
                                    <button className="text-primary hover:text-primary/80 transition-colors p-1">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                <p>Exibindo 5 de 123 resultados</p>
                <div className="flex gap-2">
                     <button className="size-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-50">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                     </button>
                     <button className="size-8 flex items-center justify-center rounded-full bg-primary/20 text-primary font-bold">1</button>
                     <button className="size-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">2</button>
                     <button className="size-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                     </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Audit;