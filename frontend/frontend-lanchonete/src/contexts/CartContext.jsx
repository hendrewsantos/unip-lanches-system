import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const initialState = { items: {}, desconto: 0, formaPagamento: 'Dinheiro' }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const prev = state.items[action.produto.id]
      return {
        ...state,
        items: {
          ...state.items,
          [action.produto.id]: {
            produto: action.produto,
            qty: (prev?.qty ?? 0) + 1,
            obs: prev?.obs ?? '',
          },
        },
      }
    }
    case 'REMOVE': {
      const { [action.id]: _, ...rest } = state.items
      return { ...state, items: rest }
    }
    case 'DEC': {
      const item = state.items[action.id]
      if (!item || item.qty <= 1) {
        const { [action.id]: _, ...rest } = state.items
        return { ...state, items: rest }
      }
      return {
        ...state,
        items: { ...state.items, [action.id]: { ...item, qty: item.qty - 1 } },
      }
    }
    case 'SET_OBS': {
      const item = state.items[action.id]
      if (!item) return state
      return {
        ...state,
        items: { ...state.items, [action.id]: { ...item, obs: action.value } },
      }
    }
    case 'SET_DESCONTO':
      return { ...state, desconto: action.value }
    case 'SET_PAGAMENTO':
      return { ...state, formaPagamento: action.value }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem       = useCallback((produto) => dispatch({ type: 'ADD', produto }), [])
  const removeItem    = useCallback((id) => dispatch({ type: 'REMOVE', id }), [])
  const decItem       = useCallback((id) => dispatch({ type: 'DEC', id }), [])
  const setItemObs    = useCallback((id, value) => dispatch({ type: 'SET_OBS', id, value }), [])
  const setDesconto   = useCallback((value) => dispatch({ type: 'SET_DESCONTO', value }), [])
  const setPagamento  = useCallback((value) => dispatch({ type: 'SET_PAGAMENTO', value }), [])
  const clearCart      = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const entries = Object.values(state.items)
  const totalQty    = entries.reduce((s, i) => s + i.qty, 0)
  const subtotal    = entries.reduce((s, i) => s + i.produto.preco * i.qty, 0)
  const totalPrice  = Math.max(0, subtotal - state.desconto)

  return (
    <CartContext.Provider value={{
      items: state.items, entries, totalQty, subtotal, totalPrice,
      desconto: state.desconto, formaPagamento: state.formaPagamento,
      addItem, removeItem, decItem, setItemObs, setDesconto, setPagamento, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
