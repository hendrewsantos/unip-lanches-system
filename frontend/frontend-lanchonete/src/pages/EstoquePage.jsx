import { useState } from 'react'
import { Package, AlertTriangle, PackageX, DollarSign, ArrowDownCircle, ArrowUpCircle, Search } from 'lucide-react'
import { produtos as init, fmt } from '../data/mockData'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { Input, Select } from '../components/ui/Input'
import { useToast } from '../contexts/ToastContext'

function getStatus(e, m) { if (e === 0) return { l: 'Zerado', v: 'error' }; if (e <= m * 0.5) return { l: 'Crítico', v: 'error' }; if (e <= m) return { l: 'Baixo', v: 'warning' }; return { l: 'Normal', v: 'success' } }

export default function EstoquePage() {
  const { showToast } = useToast()
  const [products, setProducts] = useState(init)
  const [search, setSearch] = useState('')
  const [showMov, setShowMov] = useState(false)
  const [movProduto, setMovProduto] = useState('')
  const [movTipo, setMovTipo] = useState('entrada')
  const [movQty, setMovQty] = useState('')

  const totalItens = products.reduce((s, p) => s + p.estoque, 0)
  const abaixoMin = products.filter(p => p.estoque <= p.estoqueMin && p.estoque > 0).length
  const zerados = products.filter(p => p.estoque === 0).length
  const valorEstoque = products.reduce((s, p) => s + p.precoCusto * p.estoque, 0)

  const summary = [
    { l: 'Total de Itens', v: totalItens.toLocaleString('pt-BR'), i: Package, bg: 'bg-blue-600' },
    { l: 'Abaixo do Mínimo', v: abaixoMin, i: AlertTriangle, bg: 'bg-orange-500' },
    { l: 'Itens Zerados', v: zerados, i: PackageX, bg: 'bg-red-500' },
    { l: 'Valor em Estoque', v: fmt(valorEstoque), i: DollarSign, bg: 'bg-emerald-500' },
  ]

  const filtered = products.filter(p => !search || p.nome.toLowerCase().includes(search.toLowerCase()))

  const handleMov = () => {
    const qty = parseInt(movQty)
    if (!movProduto || !qty || qty <= 0) { showToast('Preencha todos os campos', 'error'); return }
    setProducts(ps => ps.map(p => { if (String(p.id) !== movProduto) return p; return { ...p, estoque: movTipo === 'entrada' ? p.estoque + qty : Math.max(0, p.estoque - qty) } }))
    showToast(`${movTipo === 'entrada' ? 'Entrada' : 'Saída'} registrada!`, 'success')
    setShowMov(false); setMovProduto(''); setMovQty('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3"><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Estoque</h2><p className="text-sm text-gray-500">Controle de estoque</p></div><Button icon={ArrowDownCircle} onClick={() => setShowMov(true)}>Movimentação</Button></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map(s => { const I = s.i; return (
          <Card key={s.l} hover padding="p-5"><div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.bg} text-white shadow-lg mb-3`}><I size={20} /></div><p className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">{s.v}</p><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{s.l}</p></Card>
        )})}
      </div>

      <div className="relative max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="w-full h-10 pl-10 pr-4 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" /></div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800/50"><tr>{['Produto', 'Categoria', 'Estoque Atual', 'Mínimo', 'Status', 'Valor'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map(p => { const st = getStatus(p.estoque, p.estoqueMin); const pct = p.estoqueMin > 0 ? Math.min(100, (p.estoque / (p.estoqueMin * 3)) * 100) : 100; return (
            <tr key={p.id} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/5 transition-colors">
              <td className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{p.nome}</td>
              <td className="px-4 py-3"><Badge variant="neutral">{p.categoria}</Badge></td>
              <td className="px-4 py-3"><div className="flex items-center gap-3"><span className="text-sm font-mono font-bold text-gray-900 dark:text-white w-8">{p.estoque}</span><div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${st.v === 'error' ? 'bg-red-500' : st.v === 'warning' ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} /></div></div></td>
              <td className="px-4 py-3 text-sm font-mono text-gray-500">{p.estoqueMin}</td>
              <td className="px-4 py-3"><Badge variant={st.v} dot>{st.l}</Badge></td>
              <td className="px-4 py-3 text-sm font-mono font-bold text-gray-700 dark:text-gray-300">{fmt(p.precoCusto * p.estoque)}</td>
            </tr>
          )})}
        </tbody>
      </table></div></div>

      <Modal open={showMov} onClose={() => setShowMov(false)} title="Movimentação" size="sm">
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Tipo</label><div className="flex gap-2">
            {[{ v: 'entrada', l: 'Entrada', i: ArrowDownCircle, c: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' }, { v: 'saida', l: 'Saída', i: ArrowUpCircle, c: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400' }].map(t => (
              <button key={t.v} onClick={() => setMovTipo(t.v)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-semibold transition-all ${movTipo === t.v ? t.c : 'border-gray-200 dark:border-gray-700 text-gray-400'}`}><t.i size={16} />{t.l}</button>
            ))}
          </div></div>
          <Select label="Produto" value={movProduto} onChange={e => setMovProduto(e.target.value)}><option value="">Selecionar...</option>{products.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.estoque})</option>)}</Select>
          <Input label="Quantidade" type="number" min="1" value={movQty} onChange={e => setMovQty(e.target.value)} placeholder="Quantidade" />
          <div className="flex gap-3 pt-2"><Button variant="outline" className="flex-1" onClick={() => setShowMov(false)}>Cancelar</Button><Button className="flex-1" onClick={handleMov}>Registrar</Button></div>
        </div>
      </Modal>
    </div>
  )
}
