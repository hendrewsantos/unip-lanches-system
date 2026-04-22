import { PackageOpen } from 'lucide-react'
import Button from './Button'

export default function EmptyState({ icon: Icon = PackageOpen, title, description, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon size={28} className="text-gray-400" />
      </div>
      <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs mb-4">{description}</p>}
      {action && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>{action}</Button>
      )}
    </div>
  )
}
