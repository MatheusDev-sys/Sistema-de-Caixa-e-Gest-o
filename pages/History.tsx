import React from 'react';

const History: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Caixas Anteriores</h1>
           <p className="text-gray-500">Consulte o histórico de todos os caixas fechados.</p>
        </div>

        <div className="rounded-xl glassmorphism p-0 overflow-hidden shadow-soft">
             {/* Search */}
            <div className="p-6 border-b border-gray-200/50 dark:border-white/10">
                <div className="max-w-md relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input 
                        placeholder="Buscar por data ou funcionário..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-black/5 dark:bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Data</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Período</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Total</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Quem abriu</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Quem fechou</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                        {[
                            { date: '15/07/2024', period: 'Manhã', total: 'R$ 1.250,75', opener: 'Ana Silva', closer: 'Ana Silva' },
                            { date: '14/07/2024', period: 'Tarde', total: 'R$ 980,50', opener: 'João Costa', closer: 'João Costa' },
                            { date: '14/07/2024', period: 'Manhã', total: 'R$ 1.120,00', opener: 'Sofia Lima', closer: 'Sofia Lima' },
                            { date: '13/07/2024', period: 'Integral', total: 'R$ 2.345,90', opener: 'Carlos Pereira', closer: 'Carlos Pereira' },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{row.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{row.period}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{row.total}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{row.opener}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{row.closer}</td>
                                <td className="px-6 py-4">
                                    <button className="text-primary font-bold text-sm hover:underline">Ver Detalhes / PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default History;