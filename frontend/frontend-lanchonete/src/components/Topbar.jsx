import { useState, useRef, useEffect } from 'react'
import { Bell, Search, Menu, Sun, Moon, X, ClipboardList, Package, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { ROLE_PERMISSIONS } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { produtos, pedidos, clientes } from '../data/mockData'

const TITLES = {
  '/': 'Dashboard', '/vendas': 'PDV / Caixa', '/pedidos': 'Pedidos',
  '/produtos': 'Produtos', '/categorias': 'Categorias', '/clientes': 'Clientes',
  '/estoque': 'Estoque', '/relatorios': 'Relatórios', '/configuracoes': 'Configurações',
}

const NOTIF_ICON = { pedido: ClipboardList, estoque: Package }

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth()
  const { dark, toggleTheme } = useTheme()
  const { notifs, unreadCount, markRead, markAllRead } = useNotifications()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const title = TITLES[pathname] ?? 'Unip Lanches'
  const initials = user?.nome?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() ?? 'U'

  // Search
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)

  // Notifications
  const [showNotifs, setShowNotifs] = useState(false)
  const notifRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Search results
  const results = query.length >= 2 ? [
    ...produtos.filter(p => p.nome.toLowerCase().includes(query.toLowerCase())).slice(0, 4).map(p => ({ label: p.nome, sub: `Produto · R$ ${p.preco.toFixed(2)}`, route: '/produtos' })),
    ...pedidos.filter(p => String(p.id).includes(query) || p.cliente.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(p => ({ label: `Pedido #${p.id} — ${p.cliente}`, sub: `${p.status} · R$ ${p.total.toFixed(2)}`, route: '/pedidos' })),
    ...clientes.filter(c => c.nome.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(c => ({ label: c.nome, sub: `Cliente · ${c.telefone}`, route: '/clientes' })),
  ] : []

  const goTo = (route) => { navigate(route); setQuery(''); setShowResults(false) }

  return (
    <header className="h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center px-4 md:px-6 shrink-0 gap-4 transition-colors">
      <button onClick={onMenuClick} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><Menu size={20} /></button>

      <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>

      {/* Search */}
      <div ref={searchRef} className="hidden md:block flex-1 max-w-md mx-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
        <input
          type="text" value={query} placeholder="Buscar produtos, pedidos, clientes..."
          onChange={e => { setQuery(e.target.value); setShowResults(true) }}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="w-full h-9 pl-9 pr-4 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
        />
        {query && <button onClick={() => { setQuery(''); setShowResults(false) }} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}

        {showResults && query.length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">Nenhum resultado para "{query}"</div>
            ) : (
              results.map((r, i) => (
                <button key={i} onClick={() => goTo(r.route)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 dark:hover:bg-orange-500/5 border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors">
                  <Search size={14} className="text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{r.label}</p>
                    <p className="text-xs text-gray-400">{r.sub}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title={dark ? 'Modo claro' : 'Modo escuro'}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => setShowNotifs(!showNotifs)} className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 ring-2 ring-white dark:ring-gray-900">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notificações</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs font-semibold text-orange-500 hover:text-orange-600">Marcar todas como lidas</button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifs.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">Sem notificações</div>
                ) : notifs.map(n => {
                  const Icon = NOTIF_ICON[n.type] || AlertTriangle
                  return (
                    <button key={n.id} onClick={() => { markRead(n.id); navigate('/pedidos'); setShowNotifs(false) }}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors hover:bg-orange-50/50 dark:hover:bg-orange-500/5 ${!n.read ? 'bg-orange-50/30 dark:bg-orange-500/5' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${!n.read ? 'bg-orange-100 dark:bg-orange-500/10 text-orange-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm leading-tight ${!n.read ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-500'}`}>{n.msg}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 bg-orange-500 rounded-full shrink-0 mt-2" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{user?.nome ?? 'Usuário'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{ROLE_PERMISSIONS[user?.role]?.label ?? user?.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-orange-500/25">{initials}</div>
        </div>
      </div>
    </header>
  )
}
