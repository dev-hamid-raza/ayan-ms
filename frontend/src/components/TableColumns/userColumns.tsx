import { IUser, IPermission, ROLES, ACTIONS } from "@/types/user.types"
import type { ColumnDef } from "@tanstack/react-table"
import { formatModuleName } from "@/utils/text"
import { Badge } from "../ui/badge"
import { Key, Pen, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import PrimaryTooltip from "../common/PrimaryTooltip"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const PermissionCell = ({
    permissions,
    role,
}: {
    permissions: IPermission[]
    role: ROLES
}) => {
    const actionVariantMap: Record<ACTIONS, "success" | "info" | "warning" | "danger"> = {
        [ACTIONS.CREATE]: "success",
        [ACTIONS.READ]: "info",
        [ACTIONS.UPDATE]: "warning",
        [ACTIONS.DELETE]: "danger",
    }

    const actionLabelMap: Record<ACTIONS, string> = {
        [ACTIONS.CREATE]: "C",
        [ACTIONS.READ]: "R",
        [ACTIONS.UPDATE]: "U",
        [ACTIONS.DELETE]: "D",
    }

    // For admin with no permissions array, show full access
    if (role === ROLES.ADMIN && (!permissions || permissions.length === 0)) {
        return (
            <Badge>
                All Permissions
            </Badge>
        )
    }

    return (
        <div className="flex flex-wrap gap-2">
            {permissions && permissions.length > 0 ? (
                permissions.map((perm, index) => (
                    <Badge
                        key={index}
                        variant={"secondary"}
                    >
                        <span className="font-semibold">{formatModuleName(perm.module || "")}</span>
                        {perm.actions && perm.actions.length > 0 && (
                            <span className="ml-2 flex flex-wrap gap-1">
                                {perm.actions.map((action) => (
                                    <Badge key={action} variant={actionVariantMap[action]}>
                                        {actionLabelMap[action]}
                                    </Badge>
                                ))}
                            </span>
                        )}
                    </Badge>
                ))
            ) : (
                <Badge variant={"warning"}>No permissions</Badge>
            )}
        </div>
    )
}

export const userColumns = (
    onEdit: (user: IUser) => void, 
    onDelete: (user: IUser) => void,
    onUpdatePassword: (user: IUser) => void
): ColumnDef<IUser>[] => [
    {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: "Full Name",
        size: 180,
    },
    {
        accessorKey: "username",
        header: "Username",
        size: 140,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => <span className="capitalize">{String(getValue())}</span>,
        size: 110,
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
        size: 420,
        cell: ({ row }) => (
            <PermissionCell
                permissions={row.getValue("permissions")}
                role={row.original.role}
            />
        ),
    },
    {
        id: "actions",
        header: "Actions",
        size: 140,
        cell: ({ row }) => (
            <div className="flex gap-2">
                <PrimaryTooltip content="Edit User">
                    <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => onEdit(row.original)}
                    >
                        <Pen className="w-4 h-4" />
                    </Button>
                </PrimaryTooltip>

                <PrimaryTooltip content="Reset Password">
                    <Button size="icon-sm" variant="ghost" onClick={() => onUpdatePassword(row.original)}>
                        <Key className="w-4 h-4" />
                    </Button>
                </PrimaryTooltip>

                <PrimaryTooltip content="Delete User">
                    <Button size="icon-sm" variant="ghost" onClick={() => onDelete(row.original)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                </PrimaryTooltip>
            </div>
        ),
    },
]