import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UtensilsCrossed, Mail, KeyRound, LogIn } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const schema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(4, 'Mínimo 4 caracteres'),
})

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', senha: '' },
  })

  const onSubmit = async (values) => {
    setServerError('')
    try {
      const user = await login(values)
      navigate(user.role === 'OPERADOR' ? '/vendas' : '/', { replace: true })
    } catch {
      setServerError('Credenciais inválidas. Use email dos usuários cadastrados e senha "123456".')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30">
            <UtensilsCrossed size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Unip Lanches</h1>
            <p className="text-sm text-orange-300/80">Sistema de Ponto de Venda</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Bem-vindo de volta</h2>
          <p className="text-sm text-gray-500 mb-6">Acesse sua conta para continuar</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="login-email"
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="voce@lanchonete.com"
                  className="w-full h-12 pl-11 pr-4 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="login-senha" className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="login-senha"
                  {...register('senha')}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  className="w-full h-12 pl-11 pr-4 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>
              {errors.senha && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.senha.message}</p>}
            </div>

            {serverError && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-medium">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97] shadow-lg shadow-orange-500/30 mt-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3 font-semibold uppercase tracking-wide">Contas de demonstração</p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="font-bold text-gray-700">Admin:</span><span className="text-gray-500">admin@lanchonete.com</span></div>
              <div className="flex justify-between"><span className="font-bold text-gray-700">Caixa:</span><span className="text-gray-500">caixa@lanchonete.com</span></div>
              <div className="flex justify-between"><span className="font-bold text-gray-700">Cozinha:</span><span className="text-gray-500">cozinha@lanchonete.com</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span className="font-bold text-gray-700">Senha:</span><span className="font-mono font-bold text-orange-600">123456</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
