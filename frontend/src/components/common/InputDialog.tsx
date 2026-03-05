import { ReactNode, useState } from "react"
import PrimaryDialog from "./PrimaryDialog"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input"

interface InputDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    placeholder?: string
    initialValue?: string
    inputLabel?: string
    confirmText?: string
    cancelText?: string
    onConfirm: (value: string) => void
    loading?: boolean
    confirmVariant?: "default" | "destructive"
    inputType?: "text" | "email" | "password" | "number"
    maxLength?: number
    minLength?: number
    required?: boolean
    children?: ReactNode
    hasError: boolean
}

const InputDialog = ({
    open,
    onOpenChange,
    title,
    description,
    placeholder = "Enter value",
    initialValue = "",
    inputLabel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    loading = false,
    confirmVariant = "default",
    inputType = "text",
    maxLength,
    minLength,
    required = true,
    children,
    hasError,
}: InputDialogProps) => {
    const [inputValue, setInputValue] = useState(initialValue)

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault()
        if (required && !inputValue.trim()) {
            return
        }
        onConfirm(inputValue)
        setInputValue(initialValue)
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setInputValue(initialValue)
        }
        onOpenChange(newOpen)
    }

    const isValid = !required || inputValue.trim().length > 0
    const isMinLengthValid = !minLength || inputValue.length >= minLength
    const isMaxLengthValid = !maxLength || inputValue.length <= maxLength
    const isInputValid = isValid && isMinLengthValid && isMaxLengthValid

    return (
        <PrimaryDialog
            open={open}
            onOpenChange={handleOpenChange}
            title={title}
            description={description}
            footer={
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => handleOpenChange(false)} 
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        variant={confirmVariant} 
                        disabled={loading || !isInputValid}
                        type="submit"
                        form="departmentForm"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                {confirmText}...
                            </>
                        ) : (
                            confirmText
                        )}
                    </Button>
                </div>
            }
        >
            <form id="departmentForm" onSubmit={handleConfirm} className="space-y-4">
                {children}
                <div className="space-y-2">
                    {inputLabel && (
                        <label className="text-sm font-medium text-foreground">
                            {inputLabel}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}
                    <Input
                        type={inputType}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={placeholder}
                        disabled={loading}
                        maxLength={maxLength}
                        minLength={minLength}
                        aria-invalid={hasError}
                    />
                    {maxLength && (
                        <p className="text-xs text-muted-foreground">
                            {inputValue.length}/{maxLength}
                        </p>
                    )}
                </div>
            </form>
        </PrimaryDialog>
    )
}

export default InputDialog
