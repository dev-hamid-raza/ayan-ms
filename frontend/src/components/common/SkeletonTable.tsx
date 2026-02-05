import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonTableProps {
  rows?: number
  columns?: number
}

export const SkeletonTable = ({ rows = 8, columns = 9 }: SkeletonTableProps) => {
  return (
    <div className='overflow-hidden rounded-lg border border-x'>
      {/* Table Header Skeleton */}
      <div className='flex items-center gap-4 p-3 border-b bg-secondary'>
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={`header-${i}`} className='h-4 w-20' />
        ))}
      </div>
      
      {/* Table Rows Skeleton */}
      {[...Array(rows)].map((_, i) => (
        <div key={`row-${i}`} className='flex items-center gap-4 p-3 border-b hover:bg-accent/50'>
          {[...Array(columns)].map((_, j) => (
            <Skeleton key={`cell-${i}-${j}`} className='h-4 w-20' />
          ))}
        </div>
      ))}
    </div>
  )
}
