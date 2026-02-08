import { ReactNode } from "react"
import PrimaryDialog from "./PrimaryDialog"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    loading?: boolean
    confirmVariant?: "default" | "destructive"
    children?: ReactNode
}

const ConfirmDialog = ({
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    loading = false,
    confirmVariant = "destructive",
    children,
}: ConfirmDialogProps) => {
    return (
        <PrimaryDialog
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            footer={
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        {cancelText}
                    </Button>
                    <Button variant={confirmVariant} onClick={onConfirm} disabled={loading}>
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
            {children}
        </PrimaryDialog>
    )
}

export default ConfirmDialog
