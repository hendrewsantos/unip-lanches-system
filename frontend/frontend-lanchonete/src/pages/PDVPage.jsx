import { useState } from 'react'
import { Search, ShoppingBag, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, CheckCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'
import { useOrders } from '../contexts/OrderContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useAuth } from '../contexts/AuthContext'
import { produtos, fmt, formasPagamentoList } from '../data/mockData'
import Button from '../components/ui/Button'

const CAT_COLORS = {
  Todos: 'from-gray-600 to-gray-500', Lanches: 'from-amber-500 to-orange-500', Porções: 'from-orange-500 to-red-500',
  Bebidas: 'from-blue-500 to-cyan-500', Sobremesas: 'from-pink-500 to-purple-500', Combos: 'from-emerald-500 to-teal-500',
}
const PAG_ICONS = { Dinheiro: Banknote, 'Cartão Débito': CreditCard, 'Cartão Crédito': CreditCard, Pix: QrCode }

function ProductCard({ produto, inCart, onAdd }) {
  return (
    <div onClick={() => onAdd(produto)}
      className={`relative bg-white dark:bg-gray-900 border rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.97]
        ${inCart ? 'border-orange-400 ring-2 ring-orange-200 dark:ring-orange-500/20 shadow-md' : 'border-gray-200 dark:border-gray-800 hover:border-orange-300'}`}
    >
      <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${CAT_COLORS[produto.categoria] ?? CAT_COLORS.Todos}`}>{produto.nome[0]}</div>
      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 text-center leading-tight mb-1 line-clamp-2">{produto.nome}</p>
      <p className="text-sm font-mono font-bold text-orange-500 text-center">{fmt(produto.preco)}</p>
      {inCart && <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"><CheckCircle size={12} className="text-white" /></div>}
    </div>
  )
}

export default function PDVPage() {
  const { entries, items, totalQty, subtotal, totalPrice, desconto, formaPagamento, addItem, decItem, removeItem, clearCart, setDesconto, setPagamento } = useCart()
  const { showToast } = useToast()
  const { createOrder } = useOrders()
  const { addNotification } = useNotifications()
  const { user } = useAuth()
  const [activeCat, setActiveCat] = useState('Todos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [clienteNome, setClienteNome] = useState('')
  const [mesaInfo, setMesaInfo] = useState('')

  const categories = ['Todos', ...new Set(produtos.map(p => p.categoria))]
  const filtered = produtos.filter(p => p.ativo && (activeCat === 'Todos' || p.categoria === activeCat) && (!search || p.nome.toLowerCase().includes(search.toLowerCase())))

  const handleAdd = (p) => { addItem(p); showToast(`${p.nome} adicionado`, 'success') }

  const handleCheckout = async () => {
    if (!entries.length) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    // Monta os itens do pedido
    const itensFormatados = entries.map(e => ({
      produtoId: e.produto.id,
      nome: e.produto.nome,
      qty: e.qty,
      preco: e.produto.preco,
    }))

    // Cria o pedido no contexto global
    const newOrder = createOrder({
      itens: itensFormatados,
      total: totalPrice,
      formaPagamento,
      cliente: clienteNome || 'Cliente Balcão',
      mesa: mesaInfo || 'Balcão',
    })

    // Notificação
    addNotification(`Novo pedido #${newOrder.id} — ${newOrder.cliente} · ${fmt(newOrder.total)}`, 'pedido')

    // Limpa tudo
    clearCart()
    setClienteNome('')
    setMesaInfo('')
    showToast(`Pedido #${newOrder.id} criado com sucesso!`, 'success')
    setLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4 -mx-2">
      <div className="flex-1 flex flex-col min-w-0 px-2">
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produto..."
            className="w-full h-10 pl-10 pr-4 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" />
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all active:scale-95 ${activeCat === cat ? 'bg-orange-500 text-white border-orange-600 shadow-md' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-orange-300 hover:text-orange-600'}`}
            >{cat}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map(p => <ProductCard key={p.id} produto={p} inCart={!!items[p.id]} onAdd={handleAdd} />)}
          </div>
        </div>
      </div>

      <div className="w-80 xl:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col shadow-sm shrink-0">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center"><ShoppingBag size={18} className="text-orange-600" /></div>
          <div><span className="text-sm font-bold text-gray-900 dark:text-white">Pedido Atual</span><p className="text-xs text-gray-400">{totalQty} {totalQty === 1 ? 'item' : 'itens'}</p></div>
        </div>

        {/* Cliente e Mesa */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 space-y-2">
          <input value={clienteNome} onChange={e => setClienteNome(e.target.value)} placeholder="Nome do cliente (opcional)"
            className="w-full h-8 px-3 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all" />
          <input value={mesaInfo} onChange={e => setMesaInfo(e.target.value)} placeholder="Mesa / Local (ex: Mesa 3, Balcão)"
            className="w-full h-8 px-3 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all" />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12"><ShoppingBag size={40} className="text-gray-300 dark:text-gray-600 mb-3" /><p className="text-sm text-gray-400 text-center">Selecione produtos<br/>para adicionar</p></div>
          ) : entries.map(entry => (
            <div key={entry.produto.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 bg-gradient-to-br ${CAT_COLORS[entry.produto.categoria] ?? CAT_COLORS.Todos}`}>{entry.produto.nome[0]}</div>
                <div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{entry.produto.nome}</p><p className="text-[11px] text-gray-400 font-mono">{fmt(entry.produto.preco)}</p></div>
                <button onClick={() => removeItem(entry.produto.id)} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-300 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={12} /></button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <button onClick={() => decItem(entry.produto.id)} className="w-7 h-7 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:text-orange-600 transition-all active:scale-95"><Minus size={12} /></button>
                  <span className="text-sm font-mono font-bold text-gray-900 dark:text-white w-6 text-center">{entry.qty}</span>
                  <button onClick={() => handleAdd(entry.produto)} className="w-7 h-7 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:text-orange-600 transition-all active:scale-95"><Plus size={12} /></button>
                </div>
                <span className="text-sm font-mono font-bold text-orange-500">{fmt(entry.produto.preco * entry.qty)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
          <div><p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pagamento</p>
            <div className="grid grid-cols-2 gap-1.5">
              {formasPagamentoList.map(fp => { const Icon = PAG_ICONS[fp]; return (
                <button key={fp} onClick={() => setPagamento(fp)}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${formaPagamento === fp ? 'bg-orange-500 text-white shadow-sm' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                ><Icon size={13} />{fp.replace('Cartão ', '')}</button>
              )})}
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-500"><span>Subtotal</span><span className="font-mono">{fmt(subtotal)}</span></div>
            <div className="flex items-center justify-between text-xs text-gray-500 gap-2"><span>Desconto</span>
              <input type="number" min="0" step="0.01" value={desconto || ''} onChange={(e) => setDesconto(Number(e.target.value) || 0)} placeholder="0,00"
                className="w-20 h-7 text-right text-xs font-mono border border-gray-200 dark:border-gray-700 rounded-md px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-orange-500" />
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-500 uppercase">Total</span>
              <span className="text-2xl font-mono font-extrabold text-gray-900 dark:text-white">{fmt(totalPrice)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="danger-outline" size="md" className="shrink-0" onClick={clearCart} disabled={!entries.length}><Trash2 size={14} /></Button>
            <Button variant="success" size="md" className="flex-1" onClick={handleCheckout} disabled={!entries.length} loading={loading} icon={CheckCircle}>Finalizar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
