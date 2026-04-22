export function Skeleton({ className = '', rounded = 'rounded-lg' }) {
  return (
    <div
      className={`bg-gradient-to-r from-secondary-100 via-secondary-50 to-secondary-100 bg-[length:200%_100%] animate-shimmer ${rounded} ${className}`}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-secondary-100 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10" rounded="rounded-xl" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="bg-white rounded-xl border border-secondary-100 overflow-hidden">
      <div className="bg-secondary-50 px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="px-4 py-3.5 flex gap-4 border-t border-secondary-50">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
