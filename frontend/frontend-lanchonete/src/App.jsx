import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import AppLayout from './components/layout/AppLayout'
import PrivateRoute from './components/layout/PrivateRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PDVPage from './pages/PDVPage'
import PedidosPage from './pages/PedidosPage'
import ProdutosPage from './pages/ProdutosPage'
import CategoriasPage from './pages/CategoriasPage'
import ClientesPage from './pages/ClientesPage'
import EstoquePage from './pages/EstoquePage'
import RelatoriosPage from './pages/RelatoriosPage'
import ConfiguracoesPage from './pages/ConfiguracoesPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <NotificationProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/"              element={<DashboardPage />} />
                  <Route path="/vendas"        element={<PDVPage />} />
                  <Route path="/pedidos"       element={<PedidosPage />} />
                  <Route path="/produtos"      element={<ProdutosPage />} />
                  <Route path="/categorias"    element={<CategoriasPage />} />
                  <Route path="/clientes"      element={<ClientesPage />} />
                  <Route path="/estoque"       element={<EstoquePage />} />
                  <Route path="/relatorios"    element={<RelatoriosPage />} />
                  <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </NotificationProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}