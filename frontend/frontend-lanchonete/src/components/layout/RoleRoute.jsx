import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Protege rotas baseado no role do usuário.
 * Se o usuário não tem permissão, redireciona para sua rota padrão.
 */
export default function RoleRoute({ route, children }) {
  const { hasAccess, getDefaultRoute } = useAuth()

  if (!hasAccess(route)) {
    return <Navigate to={getDefaultRoute()} replace />
  }

  return children
}
