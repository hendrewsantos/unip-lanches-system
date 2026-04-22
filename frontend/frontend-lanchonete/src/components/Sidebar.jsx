import { NavLink, useNavigate } from 'react-router-dom'
import {
  UtensilsCrossed, LayoutDashboard, ShoppingCart, ClipboardList, Package,
  Tags, UsersRound, Warehouse, BarChart3, Settings, LogOut, X, Menu
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { ROLE_PERMISSIONS } from '../contexts/AuthContext'

const NAV = [
  { to: '/',              icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/vendas',        icon: ShoppingCart,     label: 'PDV / Caixa' },
  { to: '/pedidos',       icon: ClipboardList,    label: 'Pedidos' },
  { to: '/produtos',      icon: Package,          label: 'Produtos' },
  { to: '/categorias',    icon: Tags,             label: 'Categorias' },
  { to: '/clientes',      icon: UsersRound,       label: 'Clientes' },
  { to: '/estoque',       icon: Warehouse,        label: 'Estoque' },
  { to: '/relatorios',    icon: BarChart3,        label: 'Relatórios' },
  { to: '/configuracoes', icon: Settings,         label: 'Configurações' },
]

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user, logout, hasAccess } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const initials = user?.nome?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() ?? 'U'

  const linkCls = ({ isActive }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150
    ${isActive
      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
      : 'text-gray-400 hover:bg-white/10 hover:text-white'}
  `

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3 border-b border-white/10 mb-2">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/25">
          <UtensilsCrossed size={20} className="text-white" />
        </div>
        <div>
          <span className="text-lg font-extrabold text-white tracking-tight block leading-tight">Unip Lanches</span>
          <span className="text-[10px] text-gray-500 font-medium">Sistema PDV</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-thin">
        {NAV.filter(({ to }) => hasAccess(to)).map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={linkCls}
            onClick={() => setMobileOpen?.(false)}
          >
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 mt-auto">
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.nome ?? 'Usuário'}</p>
              <p className="text-xs text-gray-500 truncate">{ROLE_PERMISSIONS[user?.role]?.label ?? user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:bg-white/10 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-gray-900 flex flex-col animate-slide-up z-10">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
