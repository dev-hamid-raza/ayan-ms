import { IOutwardGatePass } from "@/types/outwardGatePass.types";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTooltip from "../common/PrimaryTooltip";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

export const outwardGatePassColumns = ():ColumnDef<IOutwardGatePass>[] => [
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
        cell: ({row}) => (
            <div className="flex gap-2">
                <PrimaryTooltip content="Edit User">
                    <Button
                        size="icon-sm"
                        variant="ghost"
                        // onClick={() => onEdit(row.original)}
                    >
                        <Pen className="w-4 h-4" />
                    </Button>
                </PrimaryTooltip>
            </div>
        )
    }
] 
