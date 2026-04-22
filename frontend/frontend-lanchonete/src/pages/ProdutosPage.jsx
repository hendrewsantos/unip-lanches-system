import { useState } from 'react'
import { Package, Plus, Search, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { produtos as init, categorias, fmt } from '../data/mockData'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { Input, Select } from '../components/ui/Input'
import { useToast } from '../contexts/ToastContext'

const schema = z.object({ nome: z.string().min(2), descricao: z.string().optional(), categoria: z.string().min(1), preco: z.coerce.number().positive(), precoCusto: z.coerce.number().min(0), estoque: z.coerce.number().int().min(0), estoqueMin: z.coerce.number().int().min(0), ativo: z.boolean().optional() })

export default function ProdutosPage() {
  const { showToast } = useToast()
  const [products, setProducts] = useState(init)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const openNew = () => { setEditing(null); reset({ nome: '', descricao: '', categoria: '', preco: '', precoCusto: '', estoque: '', estoqueMin: 5, ativo: true }); setShowModal(true) }
  const openEdit = (p) => { setEditing(p); reset(p); setShowModal(true) }
  const onSubmit = (v) => { if (editing) { setProducts(ps => ps.map(p => p.id === editing.id ? { ...p, ...v } : p)); showToast('Atualizado!', 'success') } else { setProducts(ps => [...ps, { id: Date.now(), ...v, ativo: true }]); showToast('Criado!', 'success') }; setShowModal(false) }
  const handleDelete = () => { if (!deleteTarget) return; setProducts(ps => ps.filter(p => p.id !== deleteTarget.id)); showToast('Removido', 'warning'); setDeleteTarget(null) }
  const toggleAtivo = (id) => { setProducts(ps => ps.map(p => p.id === id ? { ...p, ativo: !p.ativo } : p)); showToast('Status atualizado', 'info') }

  const filtered = products.filter(p => (!search || p.nome.toLowerCase().includes(search.toLowerCase())) && (!catFilter || p.categoria === catFilter))
  const cats = [...new Set(products.map(p => p.categoria))]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Produtos</h2><p className="text-sm text-gray-500">{products.length} produtos</p></div>
        <Button icon={Plus} onClick={openNew}>Novo Produto</Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
            className="w-full h-10 pl-10 pr-4 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="h-10 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all">
          <option value="">Todas categorias</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? <EmptyState icon={Package} title="Nenhum produto" action="Novo Produto" onAction={openNew} /> : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50"><tr>{['Produto', 'Categoria', 'Preço', 'Estoque', 'Status', 'Ações'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/5 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-xs shrink-0">{p.nome[0]}</div><div><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{p.nome}</p>{p.descricao && <p className="text-xs text-gray-400 truncate max-w-[200px]">{p.descricao}</p>}</div></div></td>
                  <td className="px-4 py-3"><Badge variant="neutral">{p.categoria}</Badge></td>
                  <td className="px-4 py-3 text-sm font-mono font-bold text-gray-900 dark:text-white">{fmt(p.preco)}</td>
                  <td className="px-4 py-3"><span className={`text-sm font-mono font-bold ${p.estoque <= p.estoqueMin ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>{p.estoque}</span>{p.estoque <= p.estoqueMin && <span className="text-[10px] text-red-500 font-bold ml-1">Baixo</span>}</td>
                  <td className="px-4 py-3"><button onClick={() => toggleAtivo(p.id)} className="flex items-center gap-1.5">{p.ativo ? <><CheckCircle size={14} className="text-emerald-500" /><span className="text-xs font-semibold text-emerald-600">Ativo</span></> : <><XCircle size={14} className="text-gray-300" /><span className="text-xs font-semibold text-gray-400">Inativo</span></>}</button></td>
                  <td className="px-4 py-3"><div className="flex gap-1.5"><button onClick={() => openEdit(p)} className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-all"><Edit2 size={13} /></button><button onClick={() => setDeleteTarget(p)} className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={13} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Produto' : 'Novo Produto'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nome" {...register('nome')} error={errors.nome?.message} placeholder="Nome do produto" />
          <Input label="Descrição" {...register('descricao')} placeholder="Descrição" />
          <div className="grid grid-cols-2 gap-3"><Input label="Preço Venda (R$)" {...register('preco')} type="number" step="0.01" error={errors.preco?.message} /><Input label="Preço Custo (R$)" {...register('precoCusto')} type="number" step="0.01" error={errors.precoCusto?.message} /></div>
          <Select label="Categoria" {...register('categoria')} error={errors.categoria?.message}><option value="">Selecionar...</option>{categorias.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}</Select>
          <div className="grid grid-cols-2 gap-3"><Input label="Estoque" {...register('estoque')} type="number" /><Input label="Estoque mín." {...register('estoqueMin')} type="number" /></div>
          <div className="flex gap-3 pt-2"><Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancelar</Button><Button type="submit" className="flex-1">Salvar</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Excluir produto" message={`Excluir "${deleteTarget?.nome}"?`} confirmText="Excluir" />
    </div>
  )
}
