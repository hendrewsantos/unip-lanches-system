import api from './api'

export const authService = {
  login: async ({ email, senha }) => {
    const { data } = await api.post('/auth/login', { email, senha })
    const user = {
      id: data.id,
      nome: data.nome,
      email: data.email ?? email,
      role: data.role,
    }
    return { token: data.token, user }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}
