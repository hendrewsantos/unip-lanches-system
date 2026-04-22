import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { OrderProvider } from './contexts/OrderContext'
import AppLayout from './components/layout/AppLayout'
import PrivateRoute from './components/layout/PrivateRoute'
import RoleRoute from './components/layout/RoleRoute'
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
import DefaultRedirect from './components/layout/DefaultRedirect'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <NotificationProvider>
            <OrderProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/"              element={<RoleRoute route="/"><DashboardPage /></RoleRoute>} />
                  <Route path="/vendas"        element={<RoleRoute route="/vendas"><PDVPage /></RoleRoute>} />
                  <Route path="/pedidos"       element={<RoleRoute route="/pedidos"><PedidosPage /></RoleRoute>} />
                  <Route path="/produtos"      element={<RoleRoute route="/produtos"><ProdutosPage /></RoleRoute>} />
                  <Route path="/categorias"    element={<RoleRoute route="/categorias"><CategoriasPage /></RoleRoute>} />
                  <Route path="/clientes"      element={<RoleRoute route="/clientes"><ClientesPage /></RoleRoute>} />
                  <Route path="/estoque"       element={<RoleRoute route="/estoque"><EstoquePage /></RoleRoute>} />
                  <Route path="/relatorios"    element={<RoleRoute route="/relatorios"><RelatoriosPage /></RoleRoute>} />
                  <Route path="/configuracoes" element={<RoleRoute route="/configuracoes"><ConfiguracoesPage /></RoleRoute>} />
                </Route>
              </Route>

              <Route path="*" element={<DefaultRedirect />} />
            </Routes>
            </OrderProvider>
            </NotificationProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}