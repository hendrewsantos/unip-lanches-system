import { useState } from 'react'
import { UsersRound, UserPlus, Search, Edit2, Trash2, Phone, MapPin } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { clientes as init, fmt } from '../data/mockData'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { useToast } from '../contexts/ToastContext'

const schema = z.object({ nome: z.string().min(2), telefone: z.string().min(8), email: z.string().email().or(z.literal('')).optional(), endereco: z.string().optional() })

export default function ClientesPage() {
  const { showToast } = useToast()
  const [clients, setClients] = useState(init)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const openNew = () => { setEditing(null); reset({ nome: '', telefone: '', email: '', endereco: '' }); setShowModal(true) }
  const openEdit = (c) => { setEditing(c); reset(c); setShowModal(true) }
  const onSubmit = (v) => { if (editing) { setClients(cs => cs.map(c => c.id === editing.id ? { ...c, ...v } : c)); showToast('Atualizado!', 'success') } else { setClients(cs => [...cs, { id: Date.now(), ...v, totalPedidos: 0, totalGasto: 0, desde: new Date().toISOString().split('T')[0] }]); showToast('Cadastrado!', 'success') }; setShowModal(false) }
  const handleDelete = () => { if (!deleteTarget) return; setClients(cs => cs.filter(c => c.id !== deleteTarget.id)); showToast('Removido', 'warning'); setDeleteTarget(null) }

  const filtered = clients.filter(c => !search || c.nome.toLowerCase().includes(search.toLowerCase()) || c.telefone.includes(search))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3"><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Clientes</h2><p className="text-sm text-gray-500">{clients.length} clientes</p></div><Button icon={UserPlus} onClick={openNew}>Novo Cliente</Button></div>
      <div className="relative max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="w-full h-10 pl-10 pr-4 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" /></div>

      {filtered.length === 0 ? <EmptyState icon={UsersRound} title="Nenhum cliente" action="Novo Cliente" onAction={openNew} /> : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50"><tr>{['Cliente', 'Telefone', 'Email', 'Pedidos', 'Total Gasto', 'Desde', 'Ações'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/5 transition-colors">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-xs">{c.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}</div><div><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{c.nome}</p>{c.endereco && <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} />{c.endereco}</p>}</div></div></td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{c.telefone}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.email || '—'}</td>
                <td className="px-4 py-3 text-sm font-mono font-bold text-gray-700 dark:text-gray-300">{c.totalPedidos}</td>
                <td className="px-4 py-3 text-sm font-mono font-bold text-emerald-600">{fmt(c.totalGasto)}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(c.desde).toLocaleDateString('pt-BR')}</td>
                <td className="px-4 py-3"><div className="flex gap-1.5"><button onClick={() => openEdit(c)} className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-all"><Edit2 size={13} /></button><button onClick={() => setDeleteTarget(c)} className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={13} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table></div></div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar' : 'Novo Cliente'} size="sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nome" icon={UsersRound} {...register('nome')} error={errors.nome?.message} placeholder="Nome completo" />
          <Input label="Telefone" icon={Phone} {...register('telefone')} error={errors.telefone?.message} placeholder="(11) 99999-9999" />
          <Input label="Email" {...register('email')} error={errors.email?.message} placeholder="email@exemplo.com" type="email" />
          <Input label="Endereço" icon={MapPin} {...register('endereco')} placeholder="Rua, número" />
          <div className="flex gap-3 pt-2"><Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancelar</Button><Button type="submit" className="flex-1">Salvar</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Excluir" message={`Excluir "${deleteTarget?.nome}"?`} confirmText="Excluir" />
    </div>
  )
}
