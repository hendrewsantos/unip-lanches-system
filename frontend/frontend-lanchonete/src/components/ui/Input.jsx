import { forwardRef } from 'react'

const base = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all'

export const Input = forwardRef(function Input({ label, error, icon: Icon, className = '', size = 'md', ...props }, ref) {
  const sizes = { sm: 'h-8 text-xs px-3', md: 'h-10 text-sm px-3', lg: 'h-12 text-base px-4' }
  return (
    <div className={className}>
      {label && <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        <input
          ref={ref}
          className={`${base} ${sizes[size]} ${Icon ? 'pl-9' : ''} ${error ? 'border-red-400 focus:ring-red-500/20' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
})

export const Select = forwardRef(function Select({ label, error, children, className = '', ...props }, ref) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>}
      <select
        ref={ref}
        className={`${base} h-10 text-sm px-3 pr-8 ${error ? 'border-red-400' : ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea({ label, error, className = '', ...props }, ref) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>}
      <textarea
        ref={ref}
        className={`${base} text-sm px-3 py-2.5 min-h-[80px] resize-none ${error ? 'border-red-400' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
})
