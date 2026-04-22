import { useState } from 'react'
import { Tags, Plus, Edit2, Trash2, Sandwich, UtensilsCrossed, CupSoda, IceCreamBowl, Layers, Percent } from 'lucide-react'
import { categorias as init, produtos } from '../data/mockData'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import { Input, Select } from '../components/ui/Input'
import { useToast } from '../contexts/ToastContext'

const ICON_MAP = { Sandwich, UtensilsCrossed, CupSoda, IceCreamBowl, Layers, Percent }
const COLORS = [{ v: '#F59E0B', l: 'Âmbar' }, { v: '#F97316', l: 'Laranja' }, { v: '#3B82F6', l: 'Azul' }, { v: '#EC4899', l: 'Rosa' }, { v: '#10B981', l: 'Verde' }, { v: '#EF4444', l: 'Vermelho' }, { v: '#8B5CF6', l: 'Roxo' }]

export default function CategoriasPage() {
  const { showToast } = useToast()
  const [cats, setCats] = useState(init)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ nome: '', icone: 'Sandwich', cor: '#F59E0B' })

  const openNew = () => { setEditing(null); setForm({ nome: '', icone: 'Sandwich', cor: '#F59E0B' }); setShowModal(true) }
  const openEdit = (c) => { setEditing(c); setForm({ nome: c.nome, icone: c.icone, cor: c.cor }); setShowModal(true) }
  const handleSave = () => { if (!form.nome.trim()) { showToast('Nome obrigatório', 'error'); return }; if (editing) { setCats(cs => cs.map(c => c.id === editing.id ? { ...c, ...form } : c)); showToast('Atualizada!', 'success') } else { setCats(cs => [...cs, { id: Date.now(), ...form, qtdProdutos: 0 }]); showToast('Criada!', 'success') }; setShowModal(false) }
  const handleDelete = () => { if (!deleteTarget) return; setCats(cs => cs.filter(c => c.id !== deleteTarget.id)); showToast('Removida', 'warning'); setDeleteTarget(null) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Categorias</h2><p className="text-sm text-gray-500">{cats.length} categorias</p></div><Button icon={Plus} onClick={openNew}>Nova Categoria</Button></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map(cat => { const Icon = ICON_MAP[cat.icone] ?? Tags; const pc = produtos.filter(p => p.categoria === cat.nome).length; return (
          <Card key={cat.id} hover padding="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.cor + '20', color: cat.cor }}><Icon size={24} /></div>
              <div className="flex gap-1"><button onClick={() => openEdit(cat)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"><Edit2 size={13} /></button><button onClick={() => setDeleteTarget(cat)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={13} /></button></div>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{cat.nome}</h3>
            <p className="text-sm text-gray-500">{pc} produto{pc !== 1 ? 's' : ''}</p>
            <div className="mt-3 w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${Math.min(100, (pc / 10) * 100)}%`, backgroundColor: cat.cor }} /></div>
          </Card>
        )})}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Categoria' : 'Nova Categoria'} size="sm">
        <div className="space-y-4">
          <Input label="Nome" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Nome" />
          <Select label="Ícone" value={form.icone} onChange={e => setForm(f => ({ ...f, icone: e.target.value }))}>{Object.keys(ICON_MAP).map(ic => <option key={ic} value={ic}>{ic}</option>)}</Select>
          <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Cor</label><div className="flex gap-2">{COLORS.map(c => (<button key={c.v} onClick={() => setForm(f => ({ ...f, cor: c.v }))} className={`w-8 h-8 rounded-full transition-all ${form.cor === c.v ? 'ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-gray-400 scale-110' : 'hover:scale-105'}`} style={{ backgroundColor: c.v }} title={c.l} />))}</div></div>
          <div className="flex gap-3 pt-2"><Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancelar</Button><Button className="flex-1" onClick={handleSave}>Salvar</Button></div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Excluir" message={`Excluir "${deleteTarget?.nome}"?`} confirmText="Excluir" />
    </div>
  )
}
