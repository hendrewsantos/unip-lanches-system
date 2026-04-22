export function Table({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-secondary-100 shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  )
}

export function Thead({ children }) {
  return (
    <thead className="bg-secondary-50 border-b border-secondary-100">
      {children}
    </thead>
  )
}

export function Tbody({ children }) {
  return <tbody className="divide-y divide-secondary-50">{children}</tbody>
}

export function Tr({ children, onClick, className = '' }) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-primary-50/30 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  )
}

export function Th({ children, className = '' }) {
  return (
    <th className={`px-4 py-3 text-left text-[11px] font-bold text-secondary-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  )
}

export function Td({ children, className = '' }) {
  return (
    <td className={`px-4 py-3 text-sm text-secondary-700 ${className}`}>
      {children}
    </td>
  )
}
