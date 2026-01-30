import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { IUser } from '@/types/user.types'
import usePostFn from '@/hooks/usePostFn'
import { updateUserPasswordByAdmin } from '@/services/user'

interface UpdatePasswordDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
}

export function UpdatePasswordDialog({ open, onOpenChange, user }: UpdatePasswordDialogProps) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { postData, loading } = usePostFn(updateUserPasswordByAdmin)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            toast.error('No user selected')
            return
        }

        if (!password || !confirmPassword) {
            toast.error('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        }

        try {
            const res = await postData({id: user._id,password: password})
            if(res.success) toast.success("Password update successfuly")
        } catch (error) {
            toast.error(error as string)
        }
    }

    const handleClose = () => {
        setPassword('')
        setConfirmPassword('')
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Password</DialogTitle>
                    <DialogDescription>
                        Update password for <span className="font-medium text-foreground">{user?.username}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
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
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
