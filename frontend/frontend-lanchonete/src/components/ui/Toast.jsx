import { CheckCircle, AlertTriangle, XCircle, X, Info } from 'lucide-react'
import { useToast } from '../../contexts/ToastContext'

const config = {
  success: { icon: CheckCircle, bg: 'bg-success-600', ring: 'ring-success-400/30' },
  warning: { icon: AlertTriangle, bg: 'bg-accent-600', ring: 'ring-accent-400/30' },
  error:   { icon: XCircle,      bg: 'bg-danger-600',  ring: 'ring-danger-400/30' },
  info:    { icon: Info,          bg: 'bg-primary-600', ring: 'ring-primary-400/30' },
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => {
        const { icon: Icon, bg, ring } = config[toast.type] ?? config.success
        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ring-1
              ${bg} ${ring} text-white min-w-[280px] max-w-[400px]
              ${toast.exiting ? 'animate-toast-out' : 'animate-toast-in'}
            `}
          >
            <Icon size={18} className="shrink-0 opacity-90" />
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
