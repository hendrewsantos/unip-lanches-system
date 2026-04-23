export default function Card({ children, className = '', hover = false, onClick, padding = 'p-5', ...props }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm
        ${hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'transition-colors'}
        ${padding} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`flex items-center justify-between mb-4 ${className}`}>{children}</div>
} 

export function CardTitle({ children, icon: Icon, className = '' }) {
  return (
    <h3 className={`flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white ${className}`}>
      {Icon && <Icon size={16} className="text-orange-500" />}   
      {children}
    </h3>
  )
}
