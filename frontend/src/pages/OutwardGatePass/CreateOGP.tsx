import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePickerInput } from '@/components/common/PrimaryDatePicker'
import { IOutwardGatePass, IOutwardGatePassItems } from '@/types/outwardGatePass.types'
import { toast } from 'sonner'
import usePostFn from '@/hooks/usePostFn'
import { createOGP } from '@/services/outwardGatePass'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/contexts/AuthContext'


const emptyItem: IOutwardGatePassItems = {
    description: '',
    pack: 0,
    unit: '',
    quantity: 0,
    netWeight: 0,
    remarks: ''
}

export default function CreateOGP() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [errors, setErrors] = useState<{ [key: string]: boolean | { [key: string]: boolean }[] }>({})
    const { postData, loading } = usePostFn(createOGP)
    
    const [formData, setFormData] = useState<Partial<IOutwardGatePass>>({
        purpose: '',
        type: '',
        vehicleNumber: '',
        nameTo: '',
        items: [{ ...emptyItem }],
        issuedBy: `${user.firstName} ${user.lastName}`,
        date: new Date(),
        mobileNumber: '',
        containerNumber: ''
    })

    const handleBack = () => {
        navigate(-1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const nextValue = name === 'mobileNumber'
            ? value.replace(/\D/g, '').slice(0, 11)
            : value
        setFormData(prev => ({
            ...prev,
            [name]: nextValue
        }))
    }

    const handleItemChange = (index: number, field: keyof IOutwardGatePassItems, value: string | number) => {
        const newItems = [...(formData.items || [])]
        newItems[index] = {
            ...newItems[index],
            [field]: ['pack', 'quantity', 'netWeight'].includes(field) ? Number(value) : value
        }
        
        // Check if the last item is now complete and add a new one if needed
        const lastItem = newItems[newItems.length - 1]
        const isLastItemComplete = lastItem && 
            lastItem.description && 
            lastItem.pack > 0 && 
            lastItem.unit && 
            lastItem.quantity > 0
        
        // Add a new item if the last one is complete and we haven't reached the limit
        if (isLastItemComplete && newItems.length < 12) {
            newItems.push({ ...emptyItem })
        }
        
        setFormData(prev => ({
            ...prev,
            items: newItems
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const newErrors: { [key: string]: boolean | { [key: string]: boolean }[] } = {}
        
        // Validate required fields
        if (!formData.purpose) newErrors.purpose = true
        if (!formData.type) newErrors.type = true
        if (!formData.vehicleNumber) newErrors.vehicleNumber = true
        if (!formData.nameTo) newErrors.nameTo = true
        if (!formData.mobileNumber || formData.mobileNumber.length !== 11) newErrors.mobileNumber = true
        if (!formData.issuedBy) newErrors.issuedBy = true
        if (!formData.date) newErrors.date = true
        
        // Validate items - check each item that has any data entered
        const itemErrors: { [key: string]: boolean }[] = []
        let hasItemErrors = false
        let hasAtLeastOneCompleteItem = false
        
        formData.items?.forEach((item, index) => {
            const itemError: { [key: string]: boolean } = {}
            const hasAnyData = item.description || item.pack > 0 || item.unit || item.quantity > 0
            
            // Always validate the first item, or any item that has data entered
            if (index === 0 || hasAnyData) {
                // If any field is filled (or it's the first item), validate all required fields
                if (!item.description) itemError.description = true
                if (!item.pack || item.pack <= 0) itemError.pack = true
                if (!item.unit) itemError.unit = true
                if (!item.quantity || item.quantity <= 0) itemError.quantity = true
                
                if (Object.keys(itemError).length > 0) {
                    hasItemErrors = true
                } else {
                    hasAtLeastOneCompleteItem = true
                }
            }
            
            itemErrors[index] = itemError
        })
        
        if (hasItemErrors) {
            newErrors.items = itemErrors
        }
        
        // Filter out empty items
        const filledItems = formData.items?.filter(item => 
            item.description && item.pack > 0 && item.unit && item.quantity > 0
        )

        if (!filledItems || filledItems.length === 0 || !hasAtLeastOneCompleteItem) {
            if (!newErrors.items) {
                newErrors.items = itemErrors
            }
            setErrors(newErrors)
            toast.error("Please add at least one complete item")
            return
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            toast.error("Please fill in all required fields")
            return
        }
        
        setErrors({})

        const submitData = {
            ...formData,
            items: filledItems
        }

        try {
            await postData(submitData)
        } catch (error) {
            toast.error(error as string)
        }

    }

    return (
        <div className='flex flex-col h-screen'>
            <div className='border-b'>
                <div className='flex items-center justify-between px-5 h-20'>
                    <div className='flex items-center gap-4'>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleBack}
                            className="hover:bg-secondary"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Button>
                        <h1 className='text-3xl font-semibold'>Create OGP</h1>
                    </div>
                    
                    {/* Summary in Header */}
                    <div className='flex gap-8'>
                        <div className='flex flex-col items-center'>
                            <p className='text-xs text-muted-foreground'>Total Items</p>
                            <p className='text-lg font-bold'>
                                {formData.items
                                    ?.filter(item => item.description && item.pack > 0 && item.unit && item.quantity > 0)
                                    .length || 0}
                            </p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-xs text-muted-foreground'>Total Pack</p>
                            <p className='text-lg font-bold'>
                                {formData.items
                                    ?.filter(item => item.description && item.pack > 0 && item.unit && item.quantity > 0)
                                    .reduce((sum, item) => sum + (item.pack || 0), 0) || 0}
                            </p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-xs text-muted-foreground'>Total Quantity</p>
                            <p className='text-lg font-bold'>
                                {formData.items
                                    ?.filter(item => item.description && item.pack > 0 && item.unit && item.quantity > 0)
                                    .reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}
                            </p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-xs text-muted-foreground'>Total Net Weight</p>
                            <p className='text-lg font-bold'>
                                {(formData.items
                                    ?.filter(item => item.description && item.pack > 0 && item.unit && item.quantity > 0)
                                    .reduce((sum, item) => sum + (item.netWeight || 0), 0) || 0)
                                    .toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1 overflow-y-auto p-6'>
                <form id='createOGPForm' onSubmit={handleSubmit} className='space-y-8 pb-4'>
                    {/* Basic Information */}
                    <div className='bg-card p-6 rounded-lg border space-y-4'>
                        <h2 className='text-xl font-semibold mb-4'>Basic Information</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='purpose'>Purpose<span className='text-red-500'>*</span></Label>
                                <Input
                                    id='purpose'
                                    name='purpose'
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={errors.purpose ? 'true' : 'false'}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='type'>Type<span className='text-red-500'>*</span></Label>
                                <Input
                                    id='type'
                                    name='type'
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={errors.type ? 'true' : 'false'}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='vehicleNumber'>Vehicle Number<span className='text-red-500'>*</span></Label>
                                <Input
                                    id='vehicleNumber'
                                    name='vehicleNumber'
                                    value={formData.vehicleNumber}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={errors.vehicleNumber ? 'true' : 'false'}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='nameTo'>Name To<span className='text-red-500'>*</span></Label>
                                <Input
                                    id='nameTo'
                                    name='nameTo'
                                    value={formData.nameTo}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={errors.nameTo ? 'true' : 'false'}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='mobileNumber'>Mobile Number<span className='text-red-500'>*</span></Label>
                                <Input
                                    id='mobileNumber'
                                    name='mobileNumber'
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={errors.mobileNumber ? 'true' : 'false'}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label>Date<span className='text-red-500'>*</span></Label>
                                <div className='flex items-center gap-2'>
                                    <Input
                                        id='date'
                                        type='text'
                                        placeholder='Select date...'
                                        value={formData.date ? new Date(formData.date).toLocaleDateString("en-PK", { day: "2-digit", month: "long", year: "numeric" }) : ''}
                                        readOnly
                                        className='cursor-pointer'
                                        aria-invalid={errors.date ? 'true' : 'false'}
                                    />
                                    <DatePickerInput 
                                        date={formData.date}
                                        onDateChange={(date) => setFormData(prev => ({ ...prev, date }))}
                                    />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='containerNumber'>Container Number</Label>
                                <Input
                                    id='containerNumber'
                                    name='containerNumber'
                                    value={formData.containerNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className='bg-card p-6 rounded-lg border space-y-4'>
                        <h2 className='text-xl font-semibold mb-4'>Items (Minimum 1, Maximum 12)</h2>
                        {formData.items?.map((item, index) => (
                            <div key={index} className='border-b pb-4 mb-4 last:border-b-0'>
                                <h3 className='text-lg font-medium mb-3'>Item {index + 1}</h3>
                                <div className='flex gap-3 '>
                                    <div className='space-y-2 flex-1 min-w-[200px]'>
                                        <Label htmlFor={`description-${index}`}>Description<span className='text-red-500'>*</span></Label>
                                        <Input
                                            id={`description-${index}`}
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                            required
                                            aria-invalid={Array.isArray(errors.items) && errors.items[index]?.description ? 'true' : 'false'}
                                        />
                                    </div>
                                    <div className='space-y-2 min-w-[100px]'>
                                        <Label htmlFor={`pack-${index}`}>Pack<span className='text-red-500'>*</span></Label>
                                        <Input
                                            id={`pack-${index}`}
                                            type='number'
                                            min='0'
                                            value={item.pack || ''}
                                            onChange={(e) => handleItemChange(index, 'pack', e.target.value)}
                                            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                            required
                                            aria-invalid={Array.isArray(errors.items) && errors.items[index]?.pack ? 'true' : 'false'}
                                            className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        />
                                    </div>
                                    <div className='space-y-2 min-w-[100px]'>
                                        <Label htmlFor={`unit-${index}`}>Unit<span className='text-red-500'>*</span></Label>
                                        <Input
                                            id={`unit-${index}`}
                                            value={item.unit}
                                            onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                                            required
                                            aria-invalid={Array.isArray(errors.items) && errors.items[index]?.unit ? 'true' : 'false'}
                                        />
                                    </div>
                                    <div className='space-y-2 min-w-[100px]'>
                                        <Label htmlFor={`quantity-${index}`}>Quantity<span className='text-red-500'>*</span></Label>
                                        <Input
                                            id={`quantity-${index}`}
                                            type='number'
                                            min='0'
                                            value={item.quantity || ''}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                            required
                                            aria-invalid={Array.isArray(errors.items) && errors.items[index]?.quantity ? 'true' : 'false'}
                                            className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        />
                                    </div>
                                    <div className='space-y-2 min-w-[120px]'>
                                        <Label htmlFor={`netWeight-${index}`}>Net Weight</Label>
                                        <Input
                                            id={`netWeight-${index}`}
                                            type='number'                                            min='0'
                                            step='0.01'                                            value={item.netWeight || ''}
                                            onChange={(e) => handleItemChange(index, 'netWeight', e.target.value)}
                                            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                            className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        />
                                    </div>
                                    <div className='space-y-2 min-w-[180px]'>
                                        <Label htmlFor={`remarks-${index}`}>Remarks</Label>
                                        <Input
                                            id={`remarks-${index}`}
                                            value={item.remarks}
                                            onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {formData.items && formData.items.length < 12 && (
                            <p className='text-sm text-muted-foreground'>Fill the current item completely to add more items</p>
                        )}
                    </div>
                </form>
            </div>

            {/* Submit Buttons - Fixed at bottom */}
            <div className='sticky bottom-0 bg-background border-t p-4 shadow-lg'>
                <div className='flex gap-4 w-full'>
                    <Button type='button' variant='outline' onClick={handleBack} className='flex-1'>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={loading} form='createOGPForm' onClick={handleSubmit} className='flex-1'>
                        {loading ? <Spinner /> : "Create OGP"} 
                    </Button>
                </div>
            </div>
        </div>
    )
}
