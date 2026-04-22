const variants = {
  success:   'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  warning:   'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
  error:     'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400',
  info:      'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400',
  neutral:   'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  pending:   'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
  preparo:   'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400',
  pronto:    'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  entregue:  'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
  cancelado: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400',
}

const dotColors = {
  success: 'bg-emerald-500', warning: 'bg-amber-500', error: 'bg-red-500',
  info: 'bg-blue-500', neutral: 'bg-gray-400', pending: 'bg-amber-500',
  preparo: 'bg-blue-500', pronto: 'bg-emerald-500', entregue: 'bg-gray-400',
  cancelado: 'bg-red-500',
}

export default function Badge({ children, variant = 'neutral', dot = false, className = '' }) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
      ${variants[variant]} ${className}
    `}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  )
}
