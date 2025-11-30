import React from 'react';

const Products: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Produtos</h1>
           <p className="text-gray-500">Adicione, edite ou remova produtos do seu catálogo.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
           <span className="material-symbols-outlined text-xl">add</span>
           Adicionar Produto
        </button>
      </div>

      <div className="rounded-xl glassmorphism p-6 shadow-soft">
         {/* Search */}
         <div className="mb-6">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                    placeholder="Buscar por nome ou categoria..." 
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white"
                />
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200/50 dark:border-white/10">
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nome do Produto</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Preço Sugerido</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Categoria</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                    {[
                        { name: 'Buquê de Rosas Vermelhas', price: 'R$ 129,90', cat: 'Buquês', color: 'bg-primary/10 text-primary' },
                        { name: 'Arranjo de Lírios Brancos', price: 'R$ 89,90', cat: 'Arranjos', color: 'bg-green-100 text-green-700' },
                        { name: 'Cesta de Café da Manhã', price: 'R$ 199,90', cat: 'Cestas', color: 'bg-yellow-100 text-yellow-700' },
                        { name: 'Orquídea Phalaenopsis', price: 'R$ 159,90', cat: 'Plantas', color: 'bg-blue-100 text-blue-700' },
                    ].map((item, i) => (
                        <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{item.name}</td>
                            <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{item.price}</td>
                            <td className="p-4">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${item.color}`}>
                                    {item.cat}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                     <button className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="flex justify-center mt-6">
            <div className="flex gap-2">
                <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                     <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md">1</button>
                <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 text-sm transition-colors">2</button>
                <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 text-sm transition-colors">3</button>
                 <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                     <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Products;