import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Redireciona para a rota padrão do role do usuário.
 * Se não autenticado, vai para /login.
 */
export default function DefaultRedirect() {
  const { isAuthenticated, getDefaultRoute } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={getDefaultRoute()} replace />
}
