import * as React from "react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PermissionCard } from "../common/UserPermissionCard"
import { ACTIONS, MODULES, type IPermission } from "@/types/user.types"
import { toast } from "sonner"
import { registerUser } from "@/services/user"
import usePostFn from "@/hooks/usePostFn"
import { Spinner } from "../ui/spinner"

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

export function CreateUserSidebar() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { loading, postData } = usePostFn(registerUser)

    // ✅ enum-safe: module -> actions[]
    const [permissionsByModule, setPermissionsByModule] = useState<
        Partial<Record<MODULES, ACTIONS[]>>
    >({})

    // ✅ convert to API format: IPermission[]
    const permissionsArray: IPermission[] = useMemo(() => {
        return MODULE_LIST
            .map((module) => ({
                module,
                actions: permissionsByModule[module] ?? [],
            }))
            .filter((p) => p.actions.length > 0) // ✅ removes empty modules
    }, [permissionsByModule])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }


        const payload = {
            username,
            firstName,
            lastName,
            password,
            permissions: permissionsArray,
        }
        try {
            const res = await postData(payload)
            console.log(res, "res")
        } catch (error) {
            toast.error(error as string)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Create User</Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader className="border-b">
                    <SheetTitle>Create New User</SheetTitle>
                </SheetHeader>

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

                    <SheetFooter className="border-t">
                        <Button onClick={handleSubmit}>{loading ? <Spinner /> : "Save changes"}</Button>

                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </SheetClose>
                    </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
