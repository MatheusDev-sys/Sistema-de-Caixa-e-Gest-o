import React from 'react';

const Holidays: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Feriados</h1>
           <p className="text-gray-500">Sincronize feriados da API ou adicione manualmente.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* List */}
            <div className="lg:col-span-3 rounded-xl glassmorphism p-6 shadow-soft">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Feriados da API</h2>
                    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-base">sync</span>
                        Sincronizar API
                    </button>
                </div>
                
                <div className="overflow-hidden rounded-lg border border-gray-200/50 dark:border-white/10">
                    <table className="w-full text-left">
                        <thead className="bg-black/5 dark:bg-white/5">
                            <tr>
                                <th className="p-4 text-sm font-medium text-gray-900 dark:text-white">Nome do Feriado</th>
                                <th className="p-4 text-sm font-medium text-gray-900 dark:text-white">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                            {[
                                { name: 'Confraternização Universal', date: '01/01/2024' },
                                { name: 'Carnaval', date: '13/02/2024' },
                                { name: 'Sexta-feira Santa', date: '29/03/2024' },
                                { name: 'Tiradentes', date: '21/04/2024' },
                                { name: 'Dia do Trabalho', date: '01/05/2024' },
                            ].map((h, i) => (
                                <tr key={i}>
                                    <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{h.name}</td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{h.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Form */}
            <div className="lg:col-span-2 rounded-xl glassmorphism p-6 shadow-soft sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Adicionar Feriado Manual</h2>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Nome do Feriado</label>
                        <input placeholder="Ex: Aniversário da Cidade" className="form-input rounded-lg bg-white/50 dark:bg-black/20 border-gray-300 dark:border-white/10 focus:ring-primary/50" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Data</label>
                        <input type="date" className="form-input rounded-lg bg-white/50 dark:bg-black/20 border-gray-300 dark:border-white/10 focus:ring-primary/50" />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Status</span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 uppercase font-bold">Inativo</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                            <span className="text-xs text-primary uppercase font-bold">Ativo</span>
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors mt-2 shadow-lg shadow-primary/25">
                         <span className="material-symbols-outlined text-lg">add_circle</span>
                         Adicionar Feriado
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Holidays;