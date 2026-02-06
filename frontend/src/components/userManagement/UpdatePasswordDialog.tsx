import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { IUser } from '@/types/user.types'
import usePostFn from '@/hooks/usePostFn'
import { updateUserPasswordByAdmin } from '@/services/user'
import PrimaryDialog from '@/components/common/PrimaryDialog'
import { Loader2 } from 'lucide-react'

interface UpdatePasswordDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
}

export function UpdatePasswordDialog({ open, onOpenChange, user }: UpdatePasswordDialogProps) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fieldErrors, setFieldErrors] = useState({
        password: false,
        confirmPassword: false
    })
    const { postData, loading } = usePostFn(updateUserPasswordByAdmin)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Reset field errors
        setFieldErrors({
            password: false,
            confirmPassword: false
        })

        if (!user) {
            toast.error('No user selected')
            return
        }

        const newFieldErrors = {
            password: false,
            confirmPassword: false
        }

        if (!password) {
            newFieldErrors.password = true
            toast.error('Password is required')
            setFieldErrors(newFieldErrors)
            return
        }

        if (password.length < 6) {
            newFieldErrors.password = true
            toast.error('Password must be at least 6 characters long')
            setFieldErrors(newFieldErrors)
            return
        }

        if (!confirmPassword) {
            newFieldErrors.confirmPassword = true
            toast.error('Please confirm the password')
            setFieldErrors(newFieldErrors)
            return
        }

        if (password !== confirmPassword) {
            newFieldErrors.confirmPassword = true
            toast.error('Passwords do not match')
            setFieldErrors(newFieldErrors)
            return
        }

        try {
            const res = await postData({id: user._id,password: password})
            if(res.success) {
                toast.success("Password updated successfully")
                onOpenChange(false)
                setPassword('')
                setConfirmPassword('')
                setFieldErrors({ password: false, confirmPassword: false })
            }
        } catch (error) {
            toast.error(error as string)
        }
    }

    return (
        <PrimaryDialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    setPassword('')
                    setConfirmPassword('')
                    setFieldErrors({ password: false, confirmPassword: false })
                }
                onOpenChange(isOpen)
            }}
            title="Update Password"
            description={
                user?.username
                    ? `Update password for ${user.username}`
                    : 'Update password'
            }
            footer={
                <>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setPassword('')
                            setConfirmPassword('')
                            setFieldErrors({ password: false, confirmPassword: false })
                            onOpenChange(false)
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button form="update-password-form" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Updating...
                            </>
                        ) : (
                            'Update Password'
                        )}
                    </Button>
                </>
            }
        >
            <form id="update-password-form" onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            disabled={loading}
                            autoComplete="new-password"
                            aria-invalid={fieldErrors.password}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            disabled={loading}
                            autoComplete="new-password"
                            aria-invalid={fieldErrors.confirmPassword}
                        />
                    </div>
                </div>
            </form>
        </PrimaryDialog>
    )
}
