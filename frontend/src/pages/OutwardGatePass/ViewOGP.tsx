import Header from '@/components/common/Header'
import useFetchFn from '@/hooks/useFetch'
import { fetchOGPById } from '@/services/outwardGatePass'
import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

function ViewOGP() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, loading } = useFetchFn(() => fetchOGPById(id!), undefined, [id])
    
    const ogp = data?.data

    if (loading) {
        return (
            <div>
                <div className='border-b h-20 flex items-center px-5'>
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="p-6 space-y-6 bg-background min-h-screen">
                    {/* Header Section Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-6 w-32 mb-4" />
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-6 w-40 mb-4" />
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prepared By Skeleton */}
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>

                    {/* Items Table Skeleton */}
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-6 w-20 mb-4" />
                        <div className="space-y-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-20" />
                                    <Skeleton className="h-10 w-20" />
                                    <Skeleton className="h-10 w-24" />
                                    <Skeleton className="h-10 w-24" />
                                    <Skeleton className="h-10 flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!ogp) {
        return <div className="flex items-center justify-center h-screen">Gate Pass not found</div>
    }

    return (
        <div>
            <div className='sticky top-0 z-50 bg-background'>
                <Header 
                    title="Outward Gate Pass Details"
                    showBackButton
                    onBack={() => navigate(-1)}
                />
            </div>
            
            <div className="p-6 space-y-6 bg-background min-h-screen">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg border border-border p-6">
                        <h3 className="text-base font-semibold mb-4 text-foreground">Basic Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">OGP Number:</span>
                                <span className="font-semibold text-foreground">{ogp?.OGPNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Date:</span>
                                <span className="font-semibold text-foreground">
                                    {new Date(ogp?.date).toLocaleDateString('en-PK', { 
                                        day: '2-digit', 
                                        month: 'long', 
                                        year: 'numeric' 
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="font-semibold text-foreground">{ogp?.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Purpose:</span>
                                <span className="font-semibold text-foreground">{ogp?.purpose}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-lg border border-border p-6">
                        <h3 className="text-base font-semibold mb-4 text-foreground">Recipient & Vehicle Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Name (To):</span>
                                <span className="font-semibold text-foreground">{ogp?.nameTo}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Mobile Number:</span>
                                <span className="font-semibold text-foreground">{ogp?.mobileNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Vehicle Number:</span>
                                <span className="font-semibold text-foreground">{ogp?.vehicleNumber}</span>
                            </div>
                            {ogp?.containerNumber && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Container Number:</span>
                                    <span className="font-semibold text-foreground">{ogp?.containerNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Issued By */}
                <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="text-base font-semibold mb-4 text-foreground">Prepared By</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-semibold text-foreground">{ogp?.issuedBy}</span>
                        </div>
                        {ogp?.createdAt && (
                            <>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Date:</span>
                                    <span className="font-semibold text-foreground">
                                        {new Date(ogp?.createdAt).toLocaleDateString('en-PK', { 
                                            day: '2-digit', 
                                            month: 'long', 
                                            year: 'numeric' 
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Time:</span>
                                    <span className="font-semibold text-foreground">
                                        {new Date(ogp?.createdAt).toLocaleTimeString('en-PK', { 
                                            hour: '2-digit', 
                                            minute: '2-digit', 
                                            second: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="text-base font-semibold mb-4 text-foreground">Items</h3>
                    <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-border bg-secondary">
                                    <th className="text-left py-3 px-4 text-secondary-foreground">Description</th>
                                    <th className="text-center py-3 px-4 text-secondary-foreground">Pack</th>
                                    <th className="text-center py-3 px-4 text-secondary-foreground">Unit</th>
                                    <th className="text-center py-3 px-4 text-secondary-foreground">Quantity</th>
                                    <th className="text-center py-3 px-4 text-secondary-foreground">Net Weight</th>
                                    <th className="text-left py-3 px-4 text-secondary-foreground">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ogp?.items?.map((item, index) => (
                                    <tr key={index} className="border-b border-border hover:bg-accent/50">
                                        <td className="py-3 px-4 text-foreground">{item.description}</td>
                                        <td className="text-center py-3 px-4 text-foreground">{item.pack}</td>
                                        <td className="text-center py-3 px-4 text-foreground">{item.unit}</td>
                                        <td className="text-center py-3 px-4 text-foreground">{item.quantity}</td>
                                        <td className="text-center py-3 px-4 text-foreground">{item.netWeight || '-'}</td>
                                        <td className="py-3 px-4 text-foreground">{item.remarks || '-'}</td>
                                    </tr>
                                ))}
                                <tr className="border-t-2 border-border bg-secondary">
                                    <td className="py-3 px-4 text-secondary-foreground font-semibold">Total</td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground font-semibold">
                                        {ogp?.items?.reduce((sum, item) => sum + item.pack, 0)}
                                    </td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground"></td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground font-semibold">
                                        {ogp?.items?.reduce((sum, item) => sum + item.quantity, 0)}
                                    </td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground font-semibold">
                                        {ogp?.items?.reduce((sum, item) => sum + (item.netWeight || 0), 0)}
                                    </td>
                                    <td className="py-3 px-4 text-secondary-foreground"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOGP
