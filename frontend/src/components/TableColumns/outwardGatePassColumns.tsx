import { IOutwardGatePass } from "@/types/outwardGatePass.types";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTooltip from "../common/PrimaryTooltip";
import { Button } from "../ui/button";
import { Eye, Pen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { hasActionPermission } from "@/utils/permission";
import { ACTIONS, MODULES } from "@/types/user.types";

export const outwardGatePassColumns = ():ColumnDef<IOutwardGatePass>[] => {
    const { user } = useAuth();
    const canEdit = hasActionPermission(user, MODULES.GATE_PASS_OUT, ACTIONS.UPDATE);
    
    return [
    {
        accessorKey: "OGPNumber",
        header: "No."
    },
    {
        accessorFn: (row) => new Date(row.date).toLocaleDateString("en-PK", { day: "2-digit", month: "long", year: "numeric" }),
        header: "Date"
    },
    {
        accessorKey: "nameTo",
        header: "Name (To)"
    },
    {
        accessorKey: "mobileNumber",
        header: "Mobile No."
    },
    {
        accessorKey: "vehicleNumber",
        header: "Vehicle No."
    },
    {
        accessorKey: "purpose",
        header: "Purpose"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "issuedBy",
        header: "Prepared by"
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <div className="flex gap-2">
                <PrimaryTooltip content="View">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            // onClick={() => onEdit(row.original)}
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                    </PrimaryTooltip>
                {canEdit && (
                    <PrimaryTooltip content="Edit OGP">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            // onClick={() => onEdit(row.original)}
                        >
                            <Pen className="w-4 h-4" />
                        </Button>
                    </PrimaryTooltip>
                )}
            </div>
        )
    }
    ];
}
