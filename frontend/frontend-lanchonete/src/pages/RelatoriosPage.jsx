import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Download, Calendar } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { dashboardData, pedidos, fmt } from '../data/mockData'

const TABS = ['Vendas', 'Produtos', 'Clientes', 'Financeiro']
const PERIODS = ['Hoje', 'Essa semana', 'Esse mês']
const statusV = { 'Pendente': 'pending', 'Em preparo': 'preparo', 'Pronto': 'pronto', 'Entregue': 'entregue', 'Cancelado': 'cancelado' }
const pagC = { Dinheiro: '#10B981', 'Cartão Débito': '#3B82F6', 'Cartão Crédito': '#8B5CF6', Pix: '#F59E0B' }

function calcPag() { const d = {}; pedidos.forEach(p => { d[p.formaPagamento] = (d[p.formaPagamento] || 0) + p.total }); return d }
function calcTop() { const c = {}; pedidos.forEach(p => p.itens.forEach(i => { c[i.nome] = (c[i.nome] || 0) + i.qty })); return Object.entries(c).map(([n, q]) => ({ n, q })).sort((a, b) => b.q - a.q).slice(0, 10) }
function calcCli() { const d = {}; pedidos.forEach(p => { if (!d[p.cliente]) d[p.cliente] = { nome: p.cliente, ped: 0, tot: 0 }; d[p.cliente].ped++; d[p.cliente].tot += p.total }); return Object.values(d).sort((a, b) => b.tot - a.tot).slice(0, 8) }

export default function RelatoriosPage() {
  const [tab, setTab] = useState('Vendas')
  const [period, setPeriod] = useState('Esse mês')
  const pag = calcPag(); const totalG = Object.values(pag).reduce((s, v) => s + v, 0)
  const top = calcTop(); const maxQ = top[0]?.q ?? 1; const cli = calcCli()
  const maxBar = Math.max(...dashboardData.vendasSemana.map(v => v.valor))
  const totalIt = pedidos.reduce((s, p) => s + p.itens.reduce((ss, i) => ss + i.qty, 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3"><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Relatórios</h2><p className="text-sm text-gray-500">Análise do seu negócio</p></div>
        <div className="flex gap-2"><Button variant="outline" size="sm" icon={Download}>PDF</Button><Button variant="outline" size="sm" icon={Download}>Excel</Button></div>
      </div>

      <div className="flex gap-1.5 bg-gray-200 dark:bg-gray-800 rounded-xl p-1.5">
        {TABS.map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === t ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>{t}</button>)}
      </div>

      <div className="flex gap-2 items-center"><Calendar size={14} className="text-gray-400" />{PERIODS.map(p => <button key={p} onClick={() => setPeriod(p)} className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${period === p ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}`}>{p}</button>)}</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: 'Faturamento', v: fmt(totalG), i: DollarSign, bg: 'bg-emerald-500' }, { l: 'Vendas', v: pedidos.length, i: ShoppingCart, bg: 'bg-blue-600' }, { l: 'Ticket Médio', v: fmt(totalG / pedidos.length), i: TrendingUp, bg: 'bg-orange-500' }, { l: 'Itens Vendidos', v: totalIt, i: BarChart3, bg: 'bg-violet-600' }].map(k => { const I = k.i; return (
          <Card key={k.l} hover padding="p-5"><div className={`w-11 h-11 rounded-xl flex items-center justify-center ${k.bg} text-white shadow-lg mb-3`}><I size={20} /></div><p className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">{k.v}</p><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{k.l}</p></Card>
        )})}
      </div>

      {tab === 'Vendas' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="p-0"><div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Vendas por Dia</h3></div>
          <div className="px-5 py-6"><div className="flex items-end gap-4 h-48">{dashboardData.vendasSemana.map(d => <div key={d.dia} className="flex-1 flex flex-col items-center gap-2"><span className="text-[10px] font-bold text-gray-500 font-mono">{(d.valor/1000).toFixed(1)}k</span><div className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-all cursor-pointer shadow-sm" style={{ height: `${Math.max(8,(d.valor/maxBar)*140)}px` }} /><span className="text-xs font-bold text-gray-500">{d.dia}</span></div>)}</div></div>
        </Card>
        <Card padding="p-0"><div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Por Pagamento</h3></div>
          <div className="px-5 py-6 space-y-4">{Object.entries(pag).map(([k, v]) => { const pct = ((v/totalG)*100).toFixed(0); return <div key={k}><div className="flex items-center justify-between mb-1.5"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: pagC[k] }} /><span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{k}</span></div><div className="flex items-center gap-2"><span className="text-sm font-mono font-bold text-gray-900 dark:text-white">{fmt(v)}</span><span className="text-xs text-gray-400 font-mono">({pct}%)</span></div></div><div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pagC[k] }} /></div></div> })}</div>
        </Card>
      </div>}

      {tab === 'Produtos' && <Card padding="p-0"><div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Top 10 Produtos</h3></div>
        <div className="px-5 py-4 space-y-3">{top.map((p, i) => <div key={p.n} className="flex items-center gap-4"><span className="text-xs font-extrabold text-orange-500 w-6 text-right">#{i+1}</span><span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-48 truncate">{p.n}</span><div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full" style={{ width: `${(p.q/maxQ)*100}%` }} /></div><span className="text-sm font-mono font-bold text-gray-700 dark:text-gray-300 w-10 text-right">{p.q}</span></div>)}</div>
      </Card>}

      {tab === 'Clientes' && <Card padding="p-0"><div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Top Clientes</h3></div>
        <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 dark:bg-gray-800/50"><tr>{['#', 'Cliente', 'Pedidos', 'Total'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{cli.map((c, i) => <tr key={c.nome} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/5 transition-colors"><td className="px-4 py-3 text-sm font-extrabold text-orange-500">#{i+1}</td><td className="px-4 py-3 text-sm font-bold text-gray-800 dark:text-gray-200">{c.nome}</td><td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{c.ped}</td><td className="px-4 py-3 text-sm font-mono font-bold text-emerald-600">{fmt(c.tot)}</td></tr>)}</tbody>
        </table></div>
      </Card>}

      {tab === 'Financeiro' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="p-0"><div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Resumo Financeiro</h3></div>
          <div className="px-5 py-4 space-y-3">{[{ l: 'Receita Bruta', v: fmt(totalG), c: 'text-emerald-600' }, { l: 'Custo Estimado', v: fmt(totalG*0.4), c: 'text-red-500' }, { l: 'Lucro Estimado', v: fmt(totalG*0.6), c: 'text-emerald-700 dark:text-emerald-400' }, { l: 'Cancelados', v: pedidos.filter(p => p.status === 'Cancelado').length, c: 'text-red-500' }, { l: 'Valor Cancelado', v: fmt(pedidos.filter(p => p.status === 'Cancelado').reduce((s, p) => s + p.total, 0)), c: 'text-red-500' }].map(i => <div key={i.l} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0"><span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{i.l}</span><span className={`text-sm font-mono font-bold ${i.c}`}>{i.v}</span></div>)}</div>
        </Card>
        <Card padding="p-0"><div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Por Status</h3></div>
          <div className="px-5 py-4 space-y-3">{['Entregue', 'Pronto', 'Em preparo', 'Pendente', 'Cancelado'].map(st => { const cnt = pedidos.filter(p => p.status === st).length; const val = pedidos.filter(p => p.status === st).reduce((s, p) => s + p.total, 0); const pct = ((cnt / pedidos.length) * 100).toFixed(0); return <div key={st}><div className="flex items-center justify-between mb-1"><Badge variant={statusV[st]} dot>{st}</Badge><span className="text-xs font-mono text-gray-500">{cnt} · {fmt(val)}</span></div><div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-gray-400 rounded-full" style={{ width: `${pct}%` }} /></div></div> })}</div>
        </Card>
      </div>}
    </div>
  )
}
