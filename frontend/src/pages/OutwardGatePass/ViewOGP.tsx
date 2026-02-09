import useFetchFn from '@/hooks/useFetch'
import { fetchOGPById } from '@/services/outwardGatePass'
import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Printer } from 'lucide-react'
import { useMemo } from 'react'
import { useAuth } from '@/contexts/AuthContext'

function ViewOGP() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data, loading } = useFetchFn(() => fetchOGPById(id!), undefined, [id])
    
    const ogp = data?.data
    const printRowCount = 12
    const printItems = useMemo(() => {
        const items = ogp?.items ?? []
        if (items.length >= printRowCount) return items
        const emptyRows = Array.from({ length: printRowCount - items.length }, () => ({
            description: "",
            pack: 0,
            unit: "",
            quantity: 0,
            netWeight: 0,
            remarks: "",
        }))
        return [...items, ...emptyRows]
    }, [ogp?.items])

    const totals = useMemo(() => {
        const items = ogp?.items ?? []
        return {
            pack: items.reduce((sum, item) => sum + item.pack, 0),
            quantity: items.reduce((sum, item) => sum + item.quantity, 0),
            netWeight: items.reduce((sum, item) => sum + (item.netWeight || 0), 0),
        }
    }, [ogp?.items])

    const handlePrint = () => {
        window.print()
    }


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
            <div className='screen-area'>
                <div className='sticky top-0 z-50 bg-background'>
                    <div className='border-b h-20 flex items-center justify-between px-5'>
                        <div className='flex items-center gap-4'>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => navigate("/outward-gate-pass")}
                                className="hover:bg-secondary"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <h1 className='text-3xl font-semibold'>Outward Gate Pass Details</h1>
                        </div>
                        <div className='flex gap-3'>
                            <Button onClick={handlePrint}>
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                        </div>
                    </div>
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
                    <h3 className="text-base font-semibold mb-4 text-foreground">Printed By</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-semibold text-foreground">
                                {user ? `${user.firstName} ${user.lastName}` : '-'}
                            </span>
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
                                        {totals.pack}
                                    </td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground"></td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground font-semibold">
                                        {totals.quantity}
                                    </td>
                                    <td className="text-center py-3 px-4 text-secondary-foreground font-semibold">
                                        {totals.netWeight}
                                    </td>
                                    <td className="py-3 px-4 text-secondary-foreground"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>

            <div className="print-area">
                {[0, 1].map((copyIndex) => (
                    <div key={copyIndex} className="print-copy">
                                <div className="print-title text-center">OUTWARD GATE PASS</div>
                        <div className="print-header">
                            <div className="print-brand">
                                <div className="print-logo"><img src='/logo.svg' className='w-[60px]' /></div>
                            </div>
                            <div className="print-meta">
                                <div>Printed: {new Date().toLocaleString('en-PK')} | {user.firstName} {user.lastName}</div>
                            </div>
                        </div>

                        <div className="print-info">
                            <div className="print-block">
                                <div><span>Gate Pass #:</span> {ogp?.OGPNumber}</div>
                                <div><span>Purpose:</span> {ogp?.purpose}</div>
                                <div><span>Name (To):</span> {ogp?.nameTo}</div>
                                <div><span>Vehicle:</span> {ogp?.vehicleNumber}</div>
                            </div>
                            <div className="print-block">
                                <div><span>Date:</span> {ogp?.date ? new Date(ogp.date).toLocaleDateString('en-PK', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</div>
                                <div><span>Type:</span> {ogp?.type}</div>
                                <div><span>Mobile:</span> {ogp?.mobileNumber}</div>
                                <div><span>Container #:</span> {ogp?.containerNumber || '-'}</div>
                            </div>
                        </div>

                        <table className="print-table">
                            <thead>
                                <tr>
                                    <th>SR#</th>
                                    <th>Description</th>
                                    <th>Pack</th>
                                    <th>UOM</th>
                                    <th>Qty</th>
                                    <th>Net Weight</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {printItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{item.description || ''}</td>
                                        <td className='text-center'>{item.pack || ''}</td>
                                        <td className='text-center'>{item.unit || ''}</td>
                                        <td className='text-center'>{item.quantity || ''}</td>
                                        <td className='text-center'>{item.netWeight || ''}</td>
                                        <td>{item.remarks || ''}</td>
                                    </tr>
                                ))}
                                <tr className="print-total">
                                    <td colSpan={2}>TOTAL</td>
                                    <td className='text-center'>{totals.pack}</td>
                                    <td></td>
                                    <td className='text-center'>{totals.quantity}</td>
                                    <td className='text-center'>{totals.netWeight}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="print-signature">
                            <div>
                                <div className="print-line"></div>
                                <div>Prepared By</div>
                            </div>
                            <div>
                                <div className="print-line"></div>
                                <div>Received By</div>
                            </div>
                            <div>
                                <div className="print-line"></div>
                                <div>Approved By</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .print-area { display: none; }
                @media print {
                    @page { size: A4; margin: 0; }
                    body { margin: 0; }
                    .screen-area { display: none !important; }
                    .print-area { display: block !important; }
                    .print-copy { page-break-inside: avoid; page-break-after: avoid; }
                    .print-copy + .print-copy { border-top: 1px dashed #999; }
                    .print-copy { height: calc(297mm / 2); padding: 12mm 10mm; box-sizing: border-box; }
                    .print-header { display: flex; justify-content: space-between; align-items: center; }
                    .print-brand { display: flex; flex-direction: column; gap: 4px; }
                    .print-logo { font-weight: 700; font-size: 16px; letter-spacing: 0.5px; text-transform: lowercase; }
                    .print-title { font-weight: 700; font-size: 14px; letter-spacing: 1px; }
                    .print-meta { font-size: 11px; }
                    .print-info { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 8px; font-size: 11px; }
                    .print-block span { font-weight: 600; margin-right: 6px; }
                    .print-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10px; }
                    .print-table th, .print-table td { border: 1px solid #333; padding: 3px 5px; line-height: 1.2; }
                    .print-table th { background: #f0f0f0; text-transform: uppercase; font-size: 9px; }
                    .print-total td { font-weight: 700; background: #f5f5f5; }
                    .print-signature { display: flex; justify-content: space-between; margin-top: 12px; font-size: 11px; }
                    .print-line { width: 160px; border-bottom: 1px solid #333; margin-bottom: 4px; }
                    .print-area, .print-copy, .print-table { color: #111; }
                    .print-area { position: absolute; left: 0; top: 0; width: 210mm; }
                }
            `}</style>
        </div>
    )
}

export default ViewOGP
