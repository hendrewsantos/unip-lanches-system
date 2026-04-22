import { createContext, useContext, useState, useCallback } from 'react'
import { usuarios } from '../data/mockData'

const AuthContext = createContext(null)

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

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, isAdmin, isGerente, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
