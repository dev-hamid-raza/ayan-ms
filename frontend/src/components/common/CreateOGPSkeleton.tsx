import { Skeleton } from '@/components/ui/skeleton'

const CreateOGPSkeleton = () => {
    return (
        <div className='flex flex-col h-screen'>
            <div className='sticky top-0 z-50 border-b bg-background'>
                <div className='flex items-center justify-between px-5 h-20'>
                    <div className='flex items-center gap-4'>
                        <Skeleton className='h-10 w-10 rounded-md' />
                        <div className='space-y-2'>
                            <Skeleton className='h-7 w-48' />
                            <Skeleton className='h-4 w-28' />
                        </div>
                    </div>
                    <div className='flex gap-8'>
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className='flex flex-col items-center gap-2'>
                                <Skeleton className='h-3 w-16' />
                                <Skeleton className='h-6 w-12' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex-1 overflow-y-auto p-6 space-y-8'>
                <div className='bg-card p-6 rounded-lg border space-y-4'>
                    <Skeleton className='h-6 w-40' />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className='space-y-2'>
                                <Skeleton className='h-4 w-24' />
                                <Skeleton className='h-9 w-full' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-card p-6 rounded-lg border space-y-4'>
                    <Skeleton className='h-6 w-32' />
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className='border-b pb-4 mb-4 last:border-b-0'>
                            <Skeleton className='h-5 w-20 mb-3' />
                            <div className='flex gap-3'>
                                {[...Array(6)].map((__, cellIndex) => (
                                    <Skeleton key={cellIndex} className='h-9 w-full' />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='sticky bottom-0 bg-background border-t p-4 shadow-lg'>
                <div className='flex gap-4 w-full'>
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-10 w-full' />
                </div>
            </div>
        </div>
    )
}

export default CreateOGPSkeleton
