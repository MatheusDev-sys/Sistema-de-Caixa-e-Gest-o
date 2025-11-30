import React, { useState } from 'react';

const POS: React.FC = () => {
  const [balance, setBalance] = useState('');
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Intro */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Gerenciamento de Caixa</h1>
        <p className="text-gray-500 dark:text-gray-400">Tela para funcionários gerenciarem o caixa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Operations */}
        <div className="flex flex-col gap-8">
            
            {/* Opening */}
            <div className="rounded-xl glassmorphism p-6 shadow-soft flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Abertura do Caixa</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Insira o saldo inicial para começar o dia.</p>
                    </div>
                </div>
                
                <div className="p-3 bg-primary/10 rounded-lg text-sm text-primary font-medium border border-primary/20">
                     Hoje é um feriado. O sistema irá registrar esta abertura de forma especial.
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                         <label className="text-sm font-medium text-gray-900 dark:text-white">Data</label>
                         <input disabled value="15/08/2024" className="form-input rounded-lg bg-black/5 dark:bg-white/10 border-none text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                         <label className="text-sm font-medium text-gray-900 dark:text-white">Período</label>
                         <input disabled value="Manhã" className="form-input rounded-lg bg-black/5 dark:bg-white/10 border-none text-gray-500" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Saldo Inicial</label>
                    <input 
                        type="text" 
                        placeholder="R$ 0,00" 
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="form-input rounded-lg bg-black/5 dark:bg-white/10 border-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white placeholder:text-gray-500" 
                    />
                </div>

                <button className="w-full sm:w-auto self-end bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-primary/25">
                    Abrir Caixa
                </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl glassmorphism p-6 shadow-soft flex flex-col items-center justify-center text-center gap-3 py-8">
                     <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                        <span className="material-symbols-outlined text-3xl">move_up</span>
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white">Registrar Retirada</h3>
                     <p className="text-sm text-gray-500">Saídas de dinheiro para despesas.</p>
                     <button className="mt-2 text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        Fazer Retirada
                     </button>
                </div>

                <div className="rounded-xl glassmorphism p-6 shadow-soft flex flex-col items-center justify-center text-center gap-3 py-8">
                     <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                        <span className="material-symbols-outlined text-3xl">receipt_long</span>
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white">Fechamento</h3>
                     <p className="text-sm text-gray-500">Finalize o turno e gere o relatório.</p>
                     <button className="mt-2 bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/25">
                        Fechar Caixa
                     </button>
                </div>
            </div>
        </div>

        {/* Right Column: Register Sale */}
        <div className="rounded-xl glassmorphism p-6 shadow-soft h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Registrar Venda</h3>
            
            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white">Produto</label>
                        <input placeholder="Ex: Buquê de Rosas" className="form-input rounded-lg bg-black/5 dark:bg-white/10 border-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                    </div>
                     <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-20">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Qtd.</label>
                            <input type="number" defaultValue="1" className="form-input rounded-lg bg-black/5 dark:bg-white/10 border-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                            <input placeholder="R$ 0,00" className="form-input rounded-lg bg-black/5 dark:bg-white/10 border-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Forma de Pagamento</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary/20 text-primary border border-primary/30 font-medium text-sm transition-all">
                            <span className="material-symbols-outlined text-lg">credit_card</span> Cartão
                        </button>
                         <button className="flex items-center justify-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20 font-medium text-sm transition-all">
                            <span className="material-symbols-outlined text-lg">payments</span> Dinheiro
                        </button>
                         <button className="flex items-center justify-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20 font-medium text-sm transition-all">
                            <span className="material-symbols-outlined text-lg">qr_code</span> Pix
                        </button>
                    </div>
                </div>

                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-primary/25 mt-2">
                    Registrar Venda
                </button>
            </div>

            <div className="flex-1 flex flex-col min-h-0 border-t border-gray-200/20 pt-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Vendas do Dia</h4>
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {[
                        { name: 'Buquê de Girassóis', desc: '1x • Cartão', val: 'R$ 120,00' },
                        { name: 'Orquídea Phalaenopsis', desc: '1x • Dinheiro', val: 'R$ 85,50' },
                        { name: 'Arranjo de Lírios', desc: '2x • Pix', val: 'R$ 150,00' },
                        { name: 'Cesta Café', desc: '1x • Cartão', val: 'R$ 210,00' },
                        { name: 'Rosas Vermelhas', desc: '12x • Dinheiro', val: 'R$ 180,00' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-xl">local_florist</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-sm">{item.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default POS;