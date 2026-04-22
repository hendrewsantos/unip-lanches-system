import { createContext, useContext, useState, useCallback } from 'react'
import { pedidos as initialPedidos } from '../data/mockData'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(initialPedidos)

  // Gera o próximo ID baseado no maior ID existente
  const nextId = useCallback(() => {
    const maxId = orders.reduce((max, o) => Math.max(max, o.id), 0)
    return maxId + 1
  }, [orders])

  // Cria um novo pedido a partir do carrinho finalizado
  const createOrder = useCallback(({ itens, total, formaPagamento, cliente, mesa }) => {
    const now = new Date()
    const dataStr = now.toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace('T', ' ')

    const newOrder = {
      id: nextId(),
      cliente: cliente || 'Cliente Balcão',
      mesa: mesa || 'Balcão',
      itens,
      total,
      formaPagamento,
      status: 'Pendente',
      data: dataStr,
    }

    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }, [nextId])

  // Atualiza o status de um pedido
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }, [])

  // Cancela um pedido
  const cancelOrder = useCallback((orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelado' } : o))
  }, [])

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used inside OrderProvider')
  return ctx
}
