import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Label } from 'recharts';

const salesData = [
  { name: 'Jan', value: 30000 },
  { name: 'Fev', value: 45000 },
  { name: 'Mar', value: 35000 },
  { name: 'Abr', value: 60000 },
  { name: 'Mai', value: 84590 },
  { name: 'Jun', value: 50000 },
];

const paymentData = [
  { name: 'Crédito', value: 45, color: '#b447eb' },
  { name: 'Débito', value: 25, color: '#a78bfa' },
  { name: 'PIX', value: 20, color: '#7dd3fc' },
  { name: 'Dinheiro', value: 10, color: '#fcd34d' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total vendido no mês', value: 'R$ 12.450,70', change: '+5.2%', isPositive: true },
          { label: 'Produto mais vendido', value: 'Buquê de Rosas...', change: '+12%', isPositive: true },
          { label: 'Dia mais lucrativo', value: 'Sexta-feira', change: '-', isPositive: null },
          { label: 'Total da semana', value: 'R$ 3.120,00', change: '-1.8%', isPositive: false },
        ].map((stat, index) => (
          <div key={index} className="flex flex-col gap-2 rounded-xl glassmorphism p-6 shadow-soft transition-transform hover:-translate-y-1">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{stat.label}</p>
            <p className="text-gray-900 dark:text-white tracking-tight text-2xl xl:text-3xl font-bold leading-tight truncate">{stat.value}</p>
            {stat.isPositive !== null && (
              <p className={`text-sm font-bold ${stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 rounded-xl glassmorphism p-6 shadow-soft flex flex-col min-h-[400px]">
          <div className="flex flex-col gap-1 mb-6">
             <p className="text-gray-800 dark:text-gray-200 text-lg font-bold">Vendas por Mês</p>
             <div className="flex gap-2 items-baseline">
                <p className="text-gray-900 dark:text-white text-3xl font-bold">R$ 84.590</p>
                <p className="text-green-600 dark:text-green-400 text-sm font-bold">+15.3%</p>
             </div>
             <p className="text-gray-500 text-sm">Últimos 6 meses</p>
          </div>
          
          <div className="flex-1 w-full h-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    dy={10}
                />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#b447eb' : '#d8b4fe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Chart */}
        <div className="rounded-xl glassmorphism p-6 shadow-soft flex flex-col min-h-[400px]">
          <div className="flex flex-col gap-1 mb-4">
             <p className="text-gray-800 dark:text-gray-200 text-lg font-bold">Formas de Pagamento</p>
             <div className="flex gap-2 items-baseline">
                <p className="text-gray-900 dark:text-white text-3xl font-bold">1.234</p>
                <p className="text-gray-500 text-lg">transações</p>
             </div>
             <p className="text-gray-500 text-sm">Este Mês</p>
          </div>

          <div className="flex-1 relative flex items-center justify-center">
             <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                        value="100%"
                        position="center"
                        className="text-2xl font-bold fill-gray-900 dark:fill-white"
                    />
                     <Label
                        value="Total"
                        position="center"
                        dy={-20}
                        className="text-sm fill-gray-500"
                    />
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
            {paymentData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="size-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name} ({item.value}%)</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;