import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext(null)

const INITIAL = [
  { id: 1, msg: 'Pedido #1007 — Pendente aguardando preparo', time: '13:05', read: false, type: 'pedido' },
  { id: 2, msg: 'Pedido #1008 — Pendente aguardando preparo', time: '12:50', read: false, type: 'pedido' },
  { id: 3, msg: 'Estoque baixo: Pão de Hambúrguer', time: '12:00', read: true, type: 'estoque' },
  { id: 4, msg: 'Pedido #1004 — Pronto para entrega', time: '13:47', read: false, type: 'pedido' },
  { id: 5, msg: 'Pedido #1009 — Pronto para entrega', time: '12:35', read: true, type: 'pedido' },
]

export function NotificationProvider({ children }) {
  const [notifs, setNotifs] = useState(INITIAL)

  const unreadCount = notifs.filter(n => !n.read).length

  const addNotification = useCallback((msg, type = 'pedido') => {
    setNotifs(prev => [{ id: Date.now(), msg, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), read: false, type }, ...prev])
  }, [])

  const markRead = useCallback((id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => setNotifs([]), [])

  return (
    <NotificationContext.Provider value={{ notifs, unreadCount, addNotification, markRead, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be inside NotificationProvider')
  return ctx
}
