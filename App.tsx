import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Products from './pages/Products';
import Holidays from './pages/Holidays';
import Users from './pages/Users';
import History from './pages/History';
import Audit from './pages/Audit';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-0">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  // In a real app, check auth state here
  const isAuthenticated = true; 
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/caixa" element={
          <ProtectedRoute>
            <POS />
          </ProtectedRoute>
        } />
        
        <Route path="/produtos" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        
        <Route path="/feriados" element={
          <ProtectedRoute>
            <Holidays />
          </ProtectedRoute>
        } />
        
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
        
        <Route path="/historico" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />
        
        <Route path="/auditoria" element={
          <ProtectedRoute>
            <Audit />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;