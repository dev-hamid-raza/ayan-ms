import { useMemo, useState, useEffect } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { PermissionCard } from "../common/UserPermissionCard"
import { ACTIONS, MODULES, type IPermission, type IUser } from "@/types/user.types"
import { toast } from "sonner"
import { registerUser, updateUser } from "@/services/user"
import usePostFn from "@/hooks/usePostFn"
import PrimarySheetSidebar from "../common/PrimarySheetSidebar"

// ✅ your enums + types

// ✅ Friendly names (what you want to display)
const MODULE_LABELS: Record<MODULES, string> = {
    [MODULES.GATE_PASS_IN]: "Gate Pass In",
    [MODULES.GATE_PASS_OUT]: "Gate Pass Out",
    [MODULES.STITCHING_RATES]: "Stitching Rate",
    [MODULES.ADMIN_PANEL]: "Admin Panel",
}

// ✅ choose which modules to show here (and in what order)
const MODULE_LIST: MODULES[] = [
    MODULES.GATE_PASS_IN,
    MODULES.GATE_PASS_OUT,
    MODULES.STITCHING_RATES,
    MODULES.ADMIN_PANEL,
]

interface CreateUserSidebarProp {
    open: boolean
    onOpen: (open: boolean) => void
    selectedUser?: IUser | null
    onSuccess?: () => void
}

export function CreateUserSidebar({ onOpen, open, selectedUser, onSuccess }:CreateUserSidebarProp) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const { loading: createLoading, postData: createUser } = usePostFn(registerUser)
    const { loading: updateLoading, postData: updateExistingUser } = usePostFn(updateUser)

    // ✅ enum-safe: module -> actions[]
    const [permissionsByModule, setPermissionsByModule] = useState<
        Partial<Record<MODULES, ACTIONS[]>>
    >({})

    // Populate form when editing a user
    useEffect(() => {
        if (selectedUser && open) {
            setFirstName(selectedUser.firstName || "")
            setLastName(selectedUser.lastName || "")
            setUsername(selectedUser.username || "")
            setPassword("")
            setConfirmPassword("")
            setIsEditing(true)
            
            // Populate permissions
            if (selectedUser.permissions && selectedUser.permissions.length > 0) {
                const permMap: Partial<Record<MODULES, ACTIONS[]>> = {}
                selectedUser.permissions.forEach(perm => {
                    if (perm.module) {
                        permMap[perm.module as MODULES] = perm.actions
                    }
                })
                setPermissionsByModule(permMap)
            }
        } else if (open && !selectedUser) {
            // Reset for new user
            setFirstName("")
            setLastName("")
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setIsEditing(false)
            setPermissionsByModule({})
        }
    }, [selectedUser, open])

    // ✅ convert to API format: IPermission[]
    const permissionsArray: IPermission[] = useMemo(() => {
        return MODULE_LIST
            .map((module) => ({
                module,
                actions: permissionsByModule[module] ?? [],
            }))
            .filter((p) => p.actions.length > 0) // ✅ removes empty modules
    }, [permissionsByModule])

    const handleSubmit = async () => {
        if (!isEditing && password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {
            if (isEditing) {
                if (!selectedUser?._id) {
                    toast.success("User id is missing")
                    return
                }

                const payload = {
                    id: selectedUser._id,
                    username,
                    firstName,
                    lastName,
                    permissions: permissionsArray,
                }
                const res = await updateExistingUser(payload)
                if(res.success) {
                    toast.success("User updated successfully")
                    onSuccess?.()
                    onOpen(false)
                }
            } else {
                const payload = {
                    username,
                    firstName,
                    lastName,
                    password,
                    permissions: permissionsArray,
                }
                const res = await createUser(payload)
                if(res.success) {
                    toast.success("User created successfully")
                    onSuccess?.()
                    onOpen(false)
                }
            }
        } catch (error) {
            toast.error(error as string)
        }
    }

    return (
        <PrimarySheetSidebar
        open={open}
        loading={isEditing ? updateLoading : createLoading}
        onOpenChange={onOpen}
        onSubmit={handleSubmit}
        title={isEditing ? "Edit User" : "Create New User"}
        >
            <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-auto">

                    <div className="">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                            id="first-name"
                            placeholder="Enter User First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                            id="last-name"
                            placeholder="Enter User Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Username must be unique"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {!isEditing && (
                        <>
                            <div className="">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter User Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm User Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                        <div className="grid gap-3">
                            {MODULE_LIST.map((m) => (
                                <PermissionCard
                                    key={m}
                                    module={m} // ✅ MODULES enum
                                    title={MODULE_LABELS[m]} // ✅ friendly display name
                                    value={permissionsByModule[m] ?? []}
                                    onChange={(next: ACTIONS[]) =>
                                        setPermissionsByModule((prev) => ({ ...prev, [m]: next }))
                                    }
                                />
                            ))}
                        </div>
                    </div>
        </PrimarySheetSidebar>
    )
}
