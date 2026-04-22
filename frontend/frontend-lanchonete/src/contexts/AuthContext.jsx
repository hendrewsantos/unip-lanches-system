import { createContext, useContext, useState, useCallback } from 'react'
import { usuarios } from '../data/mockData'

const AuthContext = createContext(null)

// ─── Permissões por Role ────────────────────────────────
// Define quais rotas cada role pode acessar
const ROLE_PERMISSIONS = {
  ADMIN: {
    routes: ['/', '/vendas', '/pedidos', '/produtos', '/categorias', '/clientes', '/estoque', '/relatorios', '/configuracoes'],
    defaultRoute: '/',
    label: 'Administrador',
  },
  GERENTE: {
    routes: ['/', '/pedidos', '/produtos', '/categorias', '/estoque'],
    defaultRoute: '/',
    label: 'Gerente',
  },
  OPERADOR: {
    routes: ['/vendas', '/pedidos', '/clientes'],
    defaultRoute: '/vendas',
    label: 'Operador',
  },
}

export { ROLE_PERMISSIONS }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('snappdv_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async ({ email, senha }) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))

    const found = usuarios.find(u => u.email === email)
    if (!found || senha !== '123456') {
      setLoading(false)
      throw new Error('Credenciais inválidas')
    }

    const userData = { id: found.id, nome: found.nome, email: found.email, role: found.role }
    localStorage.setItem('snappdv_user', JSON.stringify(userData))
    setUser(userData)
    setLoading(false)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('snappdv_user')
    setUser(null)
  }, [])

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'ADMIN'
  const isGerente = user?.role === 'GERENTE' || isAdmin

  // Verifica se o usuário tem acesso a uma rota específica
  const hasAccess = useCallback((route) => {
    if (!user?.role) return false
    const perms = ROLE_PERMISSIONS[user.role]
    if (!perms) return false
    return perms.routes.includes(route)
  }, [user?.role])

  // Retorna a rota padrão para o role do usuário
  const getDefaultRoute = useCallback(() => {
    if (!user?.role) return '/login'
    return ROLE_PERMISSIONS[user.role]?.defaultRoute ?? '/'
  }, [user?.role])

  // Retorna as rotas permitidas para o role do usuário
  const getAllowedRoutes = useCallback(() => {
    if (!user?.role) return []
    return ROLE_PERMISSIONS[user.role]?.routes ?? []
  }, [user?.role])

  return (
    <AuthContext.Provider value={{
      user, loading, isAuthenticated, isAdmin, isGerente,
      hasAccess, getDefaultRoute, getAllowedRoutes,
      login, logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
