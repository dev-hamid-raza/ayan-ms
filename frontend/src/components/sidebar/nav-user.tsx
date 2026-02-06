import {
    ChevronsUpDown,
    LogOut,
    Moon,
    Sun,
    Laptop,
    Loader2,
    Key,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { ROLES, type IUser } from "@/types/user.types"
import { toast } from "sonner"
import { logout, updateUserPassword } from "@/services/user"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/components/ui/theme-provider"
import { useState, useEffect } from "react"
import usePostFn from "@/hooks/usePostFn"
import PrimaryDialog from "@/components/common/PrimaryDialog"

export function NavUser({
    user,
}: { user: IUser }) {
    const { postData, loading } = usePostFn(updateUserPassword)
    const { isMobile } = useSidebar()
    const { setIsAuthenticated, setUser } = useAuth()
    const { setTheme } = useTheme()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [fieldErrors, setFieldErrors] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    // Reset form when dialog closes
    useEffect(() => {
        if (!showChangePassword) {
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            setFieldErrors({ currentPassword: false, newPassword: false, confirmPassword: false })
        }
    }, [showChangePassword])

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            const res = await logout()
            if (res.success) {
                setIsAuthenticated(false)
                setUser({
                    firstName: '',
                    lastName: '',
                    username: '',
                    permissions: [],
                    role: ROLES.USER,
                    _id: ""
                })
            }
        } catch (error) {
            toast.error(error as string)
        } finally {
            setIsLoggingOut(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Reset field errors
        setFieldErrors({
            currentPassword: false,
            newPassword: false,
            confirmPassword: false
        })

        // Validate fields
        const newFieldErrors = {
            currentPassword: false,
            newPassword: false,
            confirmPassword: false
        }

        if (!passwordData.currentPassword) {
            newFieldErrors.currentPassword = true
            toast.error('Current password is required')
            setFieldErrors(newFieldErrors)
            return
        }

        if (!passwordData.newPassword) {
            newFieldErrors.newPassword = true
            toast.error('New password is required')
            setFieldErrors(newFieldErrors)
            return
        }
        
        if (passwordData.newPassword.length < 6) {
            newFieldErrors.newPassword = true
            toast.error('Password must be at least 6 characters')
            setFieldErrors(newFieldErrors)
            return
        }

        if (!passwordData.confirmPassword) {
            newFieldErrors.confirmPassword = true
            toast.error('Please confirm your password')
            setFieldErrors(newFieldErrors)
            return
        }
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newFieldErrors.confirmPassword = true
            toast.error("Passwords don't match")
            setFieldErrors(newFieldErrors)
            return
        }

        try {
            const res = await postData({
                oldPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            })
            if (res.success) {
                toast.success("Password changed successfully")
                setShowChangePassword(false)
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                setFieldErrors({ currentPassword: false, newPassword: false, confirmPassword: false })
            }
        } catch (error) {
            toast.error(error as string)
            setShowChangePassword(false)
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                <AvatarFallback className="rounded-lg">{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                                <span className="truncate text-xs">{user.username}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarFallback className="rounded-lg">{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                                    <span className="truncate text-xs">{user.username}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setShowChangePassword(true)}>
                                <Key />
                                Change Password
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="px-2 text-xs text-muted-foreground">Theme</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                <Sun />
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon />
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Laptop />
                                System
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                            {isLoggingOut ? <Loader2 className="animate-spin" /> : <LogOut />}
                            {isLoggingOut ? "Logging out..." : "Log out"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>

            <PrimaryDialog
                open={showChangePassword}
                onOpenChange={setShowChangePassword}
                title="Change Password"
                description="Enter your current password and choose a new one."
                footer={
                    <>
                        <Button variant="outline" onClick={() => setShowChangePassword(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button form="update-password" type="submit" onClick={handleChangePassword} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Changing...
                                </>
                            ) : (
                                'Change Password'
                            )}
                        </Button>
                    </>
                }
            >
                <form id="update-password">
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="current-password" className="text-sm font-medium">
                                Current Password
                            </label>
                            <Input
                                id="current-password"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                aria-invalid={fieldErrors.currentPassword}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="new-password" className="text-sm font-medium">
                                New Password
                            </label>
                            <Input
                                id="new-password"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                aria-invalid={fieldErrors.newPassword}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="confirm-password" className="text-sm font-medium">
                                Confirm New Password
                            </label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                aria-invalid={fieldErrors.confirmPassword}
                            />
                        </div>
                    </div>
                </form>
            </PrimaryDialog>
        </SidebarMenu>
    )
}
