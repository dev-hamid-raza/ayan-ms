import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonTableProps {
  rows?: number
  columns?: number
}

export const SkeletonTable = ({ rows = 8, columns = 9 }: SkeletonTableProps) => {
  return (
    <div className='h-full overflow-hidden rounded-lg border border-x'>
      {/* Table Header Skeleton */}
      <div className='flex items-center gap-4 p-3 border-b bg-secondary'>
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={`header-${i}`} className='h-4 w-20' />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div className='space-y-2 p-2'>
        {[...Array(rows)].map((_, i) => (
          <div key={`row-${i}`} className='flex items-center gap-4 p-3 border-b hover:bg-accent/50'>
            <Skeleton className='h-4 w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}
