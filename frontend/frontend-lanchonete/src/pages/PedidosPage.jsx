import { useState } from 'react'
import { ClipboardList, Eye, Printer, ChevronRight, X as XIcon } from 'lucide-react'
import { pedidos as initialPedidos, fmt } from '../data/mockData'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../contexts/ToastContext'
import { useNotifications } from '../contexts/NotificationContext'

const TABS = ['Todos', 'Pendente', 'Em preparo', 'Pronto', 'Entregue', 'Cancelado']
const statusVariant = { 'Pendente': 'pending', 'Em preparo': 'preparo', 'Pronto': 'pronto', 'Entregue': 'entregue', 'Cancelado': 'cancelado' }
const STATUS_FLOW = ['Pendente', 'Em preparo', 'Pronto', 'Entregue']

function printReceipt(pedido) {
  const win = window.open('', '_blank', 'width=380,height=600')
  if (!win) return
  const itensHtml = pedido.itens.map(i =>
    `<tr><td style="padding:4px 0">${i.qty}x ${i.nome}</td><td style="text-align:right;padding:4px 0">R$ ${(i.preco * i.qty).toFixed(2).replace('.', ',')}</td></tr>`
  ).join('')
  win.document.write(`<!DOCTYPE html><html><head><title>Pedido #${pedido.id}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Courier New',monospace;width:300px;margin:0 auto;padding:16px;font-size:13px;color:#111}.center{text-align:center}.bold{font-weight:bold}.line{border-top:1px dashed #999;margin:10px 0}table{width:100%;border-collapse:collapse}h2{font-size:16px;margin:4px 0}.total{font-size:18px;font-weight:bold}.small{font-size:11px;color:#666}@media print{body{width:100%}button{display:none!important}}</style></head><body>
<div class="center"><h2>🍔 UNIP LANCHES</h2><p class="small">CNPJ: 12.345.678/0001-90</p><p class="small">Rua das Flores, 123 - Centro</p></div><div class="line"></div>
<p class="bold">PEDIDO #${pedido.id}</p><p>Data: ${pedido.data}</p><p>Cliente: ${pedido.cliente}</p><p>Mesa: ${pedido.mesa}</p><div class="line"></div>
<table>${itensHtml}</table><div class="line"></div>
<table><tr><td class="total">TOTAL</td><td style="text-align:right" class="total">R$ ${pedido.total.toFixed(2).replace('.', ',')}</td></tr></table>
<p style="margin-top:6px">Pagamento: ${pedido.formaPagamento}</p><div class="line"></div>
<p class="center small" style="margin-top:8px">Obrigado pela preferência!</p><p class="center small">Unip Lanches - Sabor que une!</p>
<div class="center" style="margin-top:16px"><button onclick="window.print()" style="padding:8px 24px;font-size:14px;cursor:pointer;background:#f97316;color:white;border:none;border-radius:8px;font-weight:bold">🖨️ Imprimir</button></div>
</body></html>`)
  win.document.close()
}

export default function PedidosPage() {
  const { showToast } = useToast()
  const { addNotification } = useNotifications()
  const [activeTab, setActiveTab] = useState('Todos')
  const [allPedidos, setAllPedidos] = useState(initialPedidos)
  const [selectedPedido, setSelectedPedido] = useState(null)
  const [statusModal, setStatusModal] = useState(null)

  const filtered = activeTab === 'Todos' ? allPedidos : allPedidos.filter(p => p.status === activeTab)

  const handleUpdateStatus = (pedidoId, newStatus) => {
    const pedido = allPedidos.find(p => p.id === pedidoId)
    setAllPedidos(prev => prev.map(p => p.id === pedidoId ? { ...p, status: newStatus } : p))
    showToast(`Status alterado para "${newStatus}"`, 'success')
    addNotification(`Pedido #${pedidoId} — ${pedido?.cliente} → ${newStatus}`, 'pedido')
    setStatusModal(null)
  }

  const handleCancel = (pedidoId) => {
    const pedido = allPedidos.find(p => p.id === pedidoId)
    setAllPedidos(prev => prev.map(p => p.id === pedidoId ? { ...p, status: 'Cancelado' } : p))
    showToast('Pedido cancelado', 'warning')
    addNotification(`Pedido #${pedidoId} — ${pedido?.cliente} foi CANCELADO`, 'pedido')
    setStatusModal(null)
  }

  const tabCounts = TABS.reduce((acc, tab) => {
    acc[tab] = tab === 'Todos' ? allPedidos.length : allPedidos.filter(p => p.status === tab).length
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Pedidos</h2><p className="text-sm text-gray-500">{allPedidos.length} pedidos registrados</p></div>

      <div className="flex gap-1.5 bg-gray-200 dark:bg-gray-800 rounded-xl p-1.5 overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {tab}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>{tabCounts[tab]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Nenhum pedido" description={`Não há pedidos com status "${activeTab}"`} />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr>{['#ID', 'Cliente / Mesa', 'Itens', 'Total', 'Pagamento', 'Status', 'Horário', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/5 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-bold text-gray-800 dark:text-gray-300">#{p.id}</td>
                    <td className="px-4 py-3"><p className="text-sm font-bold text-gray-800 dark:text-gray-200">{p.cliente}</p><p className="text-xs text-gray-400">{p.mesa}</p></td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-[180px] truncate">{p.itens.map(i => `${i.qty}x ${i.nome}`).join(', ')}</td>
                    <td className="px-4 py-3 text-sm font-mono font-bold text-gray-900 dark:text-white">{fmt(p.total)}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-500">{p.formaPagamento}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[p.status]} dot>{p.status}</Badge></td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{p.data.split(' ')[1]}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => setSelectedPedido(p)} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-all" title="Ver detalhes"><Eye size={14} /></button>
                        <button onClick={() => printReceipt(p)} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 transition-all" title="Imprimir"><Printer size={14} /></button>
                        {p.status !== 'Entregue' && p.status !== 'Cancelado' && (
                          <button onClick={() => setStatusModal(p)} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 transition-all" title="Status"><ChevronRight size={14} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={!!selectedPedido} onClose={() => setSelectedPedido(null)} title={`Pedido #${selectedPedido?.id}`} size="md" footer={<Button icon={Printer} onClick={() => printReceipt(selectedPedido)}>Imprimir Recibo</Button>}>
        {selectedPedido && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Cliente</p><p className="text-sm font-bold text-gray-900 dark:text-white">{selectedPedido.cliente}</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Mesa</p><p className="text-sm font-bold text-gray-900 dark:text-white">{selectedPedido.mesa}</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Status</p><Badge variant={statusVariant[selectedPedido.status]} dot>{selectedPedido.status}</Badge></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Pagamento</p><p className="text-sm text-gray-700 dark:text-gray-300">{selectedPedido.formaPagamento}</p></div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Itens</p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {selectedPedido.itens.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center gap-2"><span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded">{item.qty}x</span><span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.nome}</span></div>
                    <span className="text-sm font-mono font-bold text-gray-700 dark:text-gray-300">{fmt(item.preco * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-base font-bold text-gray-600 dark:text-gray-400">Total</span>
              <span className="text-2xl font-mono font-extrabold text-gray-900 dark:text-white">{fmt(selectedPedido.total)}</span>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!statusModal} onClose={() => setStatusModal(null)} title={`Alterar Status — #${statusModal?.id}`} size="sm">
        {statusModal && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">Status atual: <Badge variant={statusVariant[statusModal.status]} dot>{statusModal.status}</Badge></p>
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Avançar para:</p>
            <div className="space-y-2">
              {STATUS_FLOW.map((status, i) => {
                const currentIdx = STATUS_FLOW.indexOf(statusModal.status)
                const isNext = i === currentIdx + 1
                const isFuture = i > currentIdx
                const isCurrent = i === currentIdx
                if (!isFuture && !isCurrent) return null
                return (
                  <button key={status} onClick={() => isFuture ? handleUpdateStatus(statusModal.id, status) : null} disabled={isCurrent}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${isCurrent ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10 cursor-default' : isNext ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 cursor-pointer' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCurrent ? 'bg-orange-500 text-white' : isNext ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>{i + 1}</div>
                    <div><span className={`text-sm font-bold ${isCurrent ? 'text-orange-700 dark:text-orange-400' : isNext ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{status}</span>{isCurrent && <span className="text-xs text-orange-500 ml-2">(atual)</span>}{isNext && <span className="text-xs text-green-500 ml-2">← próximo</span>}</div>
                  </button>
                )
              })}
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => handleCancel(statusModal.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><XIcon size={14} />Cancelar Pedido</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
