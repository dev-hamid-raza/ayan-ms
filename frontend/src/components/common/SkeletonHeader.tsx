import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonHeaderProps {
  showButton?: boolean
}

export const SkeletonHeader = ({ showButton = true }: SkeletonHeaderProps) => {
  return (
    <div className='border-b h-20 flex items-center justify-between px-5'>
      <Skeleton className='h-8 w-64' />
      {showButton && <Skeleton className='h-10 w-32' />}
    </div>
  )
}
