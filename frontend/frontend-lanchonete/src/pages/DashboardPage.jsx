import { TrendingUp, ShoppingCart, DollarSign, UsersRound, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Card, { CardTitle } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { dashboardData, pedidos, fmt } from '../data/mockData'

const kpiCards = [
  { label: 'Vendas Hoje',   value: fmt(dashboardData.kpis.vendasHoje),   icon: TrendingUp,   bg: 'bg-emerald-500', delta: '+12.5%', up: true },
  { label: 'Pedidos Hoje',  value: dashboardData.kpis.pedidosHoje,       icon: ShoppingCart,  bg: 'bg-blue-600',    delta: '+8',     up: true },
  { label: 'Ticket Médio',  value: fmt(dashboardData.kpis.ticketMedio),  icon: DollarSign,    bg: 'bg-orange-500',  delta: '-3.2%',  up: false },
  { label: 'Clientes Hoje', value: dashboardData.kpis.clientesHoje,      icon: UsersRound,    bg: 'bg-violet-600',  delta: '+5',     up: true },
]

const statusBadge = {
  'Pendente':   'pending',
  'Em preparo': 'preparo',
  'Pronto':     'pronto',
  'Entregue':   'entregue',
  'Cancelado':  'cancelado',
}

const maxVenda = Math.max(...dashboardData.vendasSemana.map(v => v.valor))
const maxProd = dashboardData.produtosMaisVendidos[0]?.vendas ?? 1

export default function DashboardPage() {
  const recentPedidos = pedidos.slice(0, 8)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} hover padding="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.bg} text-white shadow-lg`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.delta}
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">{kpi.value}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{kpi.label}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" padding="p-0">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <CardTitle>Vendas da Semana</CardTitle>
          </div>
          <div className="px-5 py-6">
            <div className="flex items-end gap-4 h-52">
              {dashboardData.vendasSemana.map((d) => {
                const h = Math.max(12, (d.valor / maxVenda) * 160)
                return (
                  <div key={d.dia} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-500 font-mono">{(d.valor / 1000).toFixed(1)}k</span>
                    <div
                      className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-all cursor-pointer shadow-sm"
                      style={{ height: `${h}px` }}
                    />
                    <span className="text-xs font-bold text-gray-500">{d.dia}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <Card padding="p-0">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <CardTitle>Mais Vendidos</CardTitle>
          </div>
          <div className="px-5 py-4 space-y-4">
            {dashboardData.produtosMaisVendidos.map((prod, i) => (
              <div key={prod.nome}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-orange-500 w-6">#{i + 1}</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{prod.nome}</span>
                  </div>
                  <span className="text-xs font-extrabold text-gray-600 dark:text-gray-400 font-mono">{prod.vendas}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" style={{ width: `${(prod.vendas / maxProd) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="p-0">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <CardTitle>Últimos Pedidos</CardTitle>
          <a href="/pedidos" className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">Ver todos →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['#ID', 'Cliente', 'Itens', 'Total', 'Status', 'Horário'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {recentPedidos.map((p) => (
                <tr key={p.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-500/5 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-bold text-gray-700 dark:text-gray-300">#{p.id}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800 dark:text-gray-200">{p.cliente}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{p.itens.map(i => `${i.qty}x ${i.nome}`).join(', ')}</td>
                  <td className="px-4 py-3 text-sm font-mono font-bold text-gray-900 dark:text-white">{fmt(p.total)}</td>
                  <td className="px-4 py-3"><Badge variant={statusBadge[p.status]} dot>{p.status}</Badge></td>
                  <td className="px-4 py-3 text-sm text-gray-500 font-mono">{p.data.split(' ')[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
