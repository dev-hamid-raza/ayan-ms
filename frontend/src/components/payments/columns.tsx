import { IUser, IPermission, ROLES } from "@/types/user.types"
import type { ColumnDef } from "@tanstack/react-table"
import { formatModuleName } from "@/utils/text"
import { Badge } from "../ui/badge"

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
                        variant={"info"}
                    >
                        <span className="font-semibold">{formatModuleName(perm.module || "")}</span>
                        {perm.actions && perm.actions.length > 0 && (
                            <span className="ml-1 text-blue-600">
                                ({perm.actions.join(", ")})
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

export const columns: ColumnDef<IUser>[] = [
    {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: "Full Name",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => <span className="capitalize">{String(getValue())}</span>
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row }) => (
            <PermissionCell
                permissions={row.getValue("permissions")}
                role={row.original.role}
            />
        ),
    },
]