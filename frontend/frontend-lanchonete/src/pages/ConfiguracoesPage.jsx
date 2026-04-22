import { useState } from 'react'
import { Store, Printer, Users, Cog, Plug, Edit2, Trash2, UserPlus, Shield, Monitor, Briefcase, Sun, Moon } from 'lucide-react'
import { usuarios as initUsers } from '../data/mockData'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { Input, Select } from '../components/ui/Input'
import { useToast } from '../contexts/ToastContext'
import { useTheme } from '../contexts/ThemeContext'

const TABS = [
  { key: 'estabelecimento', label: 'Estabelecimento', icon: Store },
  { key: 'impressora', label: 'Impressora', icon: Printer },
  { key: 'usuarios', label: 'Usuários', icon: Users },
  { key: 'sistema', label: 'Sistema', icon: Cog },
  { key: 'integracoes', label: 'Integrações', icon: Plug },
]
const ROLE_STYLE = { ADMIN: 'info', GERENTE: 'warning', OPERADOR: 'success' }
const ROLE_ICONS = { ADMIN: Shield, GERENTE: Briefcase, OPERADOR: Monitor }

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</p>{desc && <p className="text-xs text-gray-400">{desc}</p>}</div>
      <button onClick={() => onChange(!checked)} className={`w-11 h-6 rounded-full transition-all duration-200 ${checked ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

export default function ConfiguracoesPage() {
  const { showToast } = useToast()
  const { dark, toggleTheme } = useTheme()
  const [tab, setTab] = useState('estabelecimento')
  const [users, setUsers] = useState(initUsers)
  const [showUserModal, setShowUserModal] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [userForm, setUserForm] = useState({ nome: '', email: '', role: 'OPERADOR', senha: '' })
  const [toggles, setToggles] = useState({ som: true, impressao: true, estoque: true, notif: true, backup: false })
  const [estab, setEstab] = useState({ nome: 'Unip Lanches', cnpj: '12.345.678/0001-90', endereco: 'Rua das Flores, 123 - Centro', telefone: '(11) 3456-7890', email: 'contato@uniplanches.com', horario: '08:00 - 22:00' })

  const openNewUser = () => { setEditUser(null); setUserForm({ nome: '', email: '', role: 'OPERADOR', senha: '' }); setShowUserModal(true) }
  const openEditUser = (u) => { setEditUser(u); setUserForm({ nome: u.nome, email: u.email, role: u.role, senha: '' }); setShowUserModal(true) }
  const saveUser = () => { if (!userForm.nome || !userForm.email) { showToast('Preencha todos os campos', 'error'); return }; if (editUser) { setUsers(us => us.map(u => u.id === editUser.id ? { ...u, ...userForm } : u)); showToast('Atualizado!', 'success') } else { setUsers(us => [...us, { id: Date.now(), ...userForm, ativo: true, lastLogin: '—' }]); showToast('Criado!', 'success') }; setShowUserModal(false) }
  const deleteUser = (id) => { setUsers(us => us.filter(u => u.id !== id)); showToast('Removido', 'warning') }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configurações</h2>

      <div className="flex gap-1.5 bg-gray-200 dark:bg-gray-800 rounded-xl p-1.5 overflow-x-auto">
        {TABS.map(t => <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' : 'text-gray-500'}`}><t.icon size={14} />{t.label}</button>)}
      </div>

      {tab === 'estabelecimento' && (
        <Card padding="p-6"><h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Dados do Estabelecimento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Object.entries({ nome: 'Nome', cnpj: 'CNPJ', endereco: 'Endereço', telefone: 'Telefone', email: 'Email', horario: 'Horário' }).map(([k, l]) => <Input key={k} label={l} value={estab[k]} onChange={e => setEstab(s => ({ ...s, [k]: e.target.value }))} />)}</div>
          <div className="flex justify-end mt-4"><Button onClick={() => showToast('Salvo!', 'success')}>Salvar</Button></div>
        </Card>
      )}

      {tab === 'impressora' && (
        <Card padding="p-6"><h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Impressora</h3>
          <div className="space-y-3">
            <Select label="Impressora Padrão"><option>Impressora Térmica USB (COM3)</option><option>PDF Virtual</option></Select>
            <Select label="Tamanho do Papel"><option>80mm (Padrão)</option><option>58mm</option></Select>
            <Toggle label="Imprimir automaticamente" desc="Ao finalizar venda" checked={toggles.impressao} onChange={v => setToggles(t => ({ ...t, impressao: v }))} />
            <div className="flex justify-end mt-4"><Button variant="outline" onClick={() => showToast('Teste enviado!', 'info')}>Imprimir Teste</Button></div>
          </div>
        </Card>
      )}

      {tab === 'usuarios' && (
        <div className="space-y-4">
          <div className="flex justify-end"><Button icon={UserPlus} onClick={openNewUser}>Novo Usuário</Button></div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"><table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50"><tr>{['Usuário', 'Perfil', 'Status', 'Último acesso', 'Ações'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map(u => { const RI = ROLE_ICONS[u.role]; return (
                <tr key={u.id} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/5 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">{u.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}</div><div><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{u.nome}</p><p className="text-xs text-gray-400">{u.email}</p></div></div></td>
                  <td className="px-4 py-3"><Badge variant={ROLE_STYLE[u.role]}><RI size={12} />{u.role}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={u.ativo ? 'success' : 'neutral'} dot>{u.ativo ? 'Ativo' : 'Inativo'}</Badge></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{u.lastLogin}</td>
                  <td className="px-4 py-3"><div className="flex gap-1.5"><button onClick={() => openEditUser(u)} className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-all"><Edit2 size={13} /></button><button onClick={() => deleteUser(u.id)} className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={13} /></button></div></td>
                </tr>
              )})}
            </tbody>
          </table></div>
          <Modal open={showUserModal} onClose={() => setShowUserModal(false)} title={editUser ? 'Editar Usuário' : 'Novo Usuário'} size="sm">
            <div className="space-y-4">
              <Input label="Nome" value={userForm.nome} onChange={e => setUserForm(f => ({ ...f, nome: e.target.value }))} />
              <Input label="Email" value={userForm.email} onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))} type="email" />
              <Select label="Perfil" value={userForm.role} onChange={e => setUserForm(f => ({ ...f, role: e.target.value }))}><option value="OPERADOR">Operador</option><option value="GERENTE">Gerente</option><option value="ADMIN">Admin</option></Select>
              <Input label={editUser ? 'Nova Senha (opcional)' : 'Senha'} value={userForm.senha} onChange={e => setUserForm(f => ({ ...f, senha: e.target.value }))} type="password" />
              <div className="flex gap-3 pt-2"><Button variant="outline" className="flex-1" onClick={() => setShowUserModal(false)}>Cancelar</Button><Button className="flex-1" onClick={saveUser}>Salvar</Button></div>
            </div>
          </Modal>
        </div>
      )}

      {tab === 'sistema' && (
        <Card padding="p-6"><h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Preferências</h3>
          {/* Dark mode toggle with special styling */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 mb-1">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${dark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-orange-100 text-orange-500'}`}>
                {dark ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Modo Escuro</p><p className="text-xs text-gray-400">Alternar entre tema claro e escuro</p></div>
            </div>
            <button onClick={toggleTheme} className={`w-11 h-6 rounded-full transition-all duration-200 ${dark ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${dark ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <Toggle label="Sons de notificação" desc="Reproduzir som ao receber pedido" checked={toggles.som} onChange={v => setToggles(t => ({ ...t, som: v }))} />
          <Toggle label="Alerta de estoque" desc="Notificar quando estoque baixo" checked={toggles.estoque} onChange={v => setToggles(t => ({ ...t, estoque: v }))} />
          <Toggle label="Notificações push" desc="Receber notificações no navegador" checked={toggles.notif} onChange={v => setToggles(t => ({ ...t, notif: v }))} />
          <Toggle label="Backup automático" desc="Backup diário dos dados" checked={toggles.backup} onChange={v => setToggles(t => ({ ...t, backup: v }))} />
        </Card>
      )}

      {tab === 'integracoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{ nome: 'iFood', desc: 'Receba pedidos do iFood', status: false }, { nome: 'Mercado Pago', desc: 'Pagamentos via Mercado Pago', status: true }, { nome: 'WhatsApp', desc: 'Enviar recibos pelo WhatsApp', status: false }, { nome: 'Nota Fiscal', desc: 'Emissão automática de NF-e', status: false }].map(int => (
            <Card key={int.nome} padding="p-5">
              <div className="flex items-start justify-between"><div><h4 className="text-sm font-bold text-gray-900 dark:text-white">{int.nome}</h4><p className="text-xs text-gray-500 mt-0.5">{int.desc}</p></div><Badge variant={int.status ? 'success' : 'neutral'} dot>{int.status ? 'Ativo' : 'Inativo'}</Badge></div>
              <div className="mt-4"><Button variant={int.status ? 'outline' : 'primary'} size="sm" className="w-full">{int.status ? 'Configurar' : 'Ativar'}</Button></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
