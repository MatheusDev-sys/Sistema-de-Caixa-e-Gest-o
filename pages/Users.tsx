import React from 'react';

const Users: React.FC = () => {
  const users = [
    { initials: 'AR', name: 'Ana Rosa', email: 'ana.rosa@mandeflores.com', role: 'Administrador', bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-600 dark:text-pink-300' },
    { initials: 'BV', name: 'Bruno Vilar', email: 'bruno.vilar@mandeflores.com', role: 'Funcionário', bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-600 dark:text-blue-300' },
    { initials: 'CS', name: 'Carla Souza', email: 'carla.souza@mandeflores.com', role: 'Funcionário', bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-600 dark:text-orange-300' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
       <div className="rounded-xl glassmorphism p-8 shadow-soft">
           <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
               <div>
                   <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Usuários</h1>
                   <p className="text-gray-500 mt-1">Adicione, edite ou remova usuários do sistema.</p>
               </div>
               <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined">add</span>
                    Criar novo usuário
               </button>
           </div>

           <div className="overflow-x-auto">
               <table className="w-full text-left">
                   <thead className="border-b border-gray-200/50 dark:border-white/10">
                       <tr>
                           <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Nome</th>
                           <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                           <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Cargo</th>
                           <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Ações</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                       {users.map((user, i) => (
                           <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                               <td className="p-4 whitespace-nowrap">
                                   <div className="flex items-center gap-3">
                                       <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm ${user.bg} ${user.text}`}>
                                           {user.initials}
                                       </div>
                                       <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                                   </div>
                               </td>
                               <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                               <td className="p-4">
                                   <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Administrador' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                                       {user.role}
                                   </span>
                               </td>
                               <td className="p-4 text-right">
                                   <div className="flex justify-end gap-2">
                                       <button className="size-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary transition-colors">
                                           <span className="material-symbols-outlined text-lg">edit</span>
                                       </button>
                                       <button className="size-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-white/10 hover:text-red-600 transition-colors">
                                           <span className="material-symbols-outlined text-lg">delete</span>
                                       </button>
                                   </div>
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

export default Users;