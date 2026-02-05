import { IOutwardGatePass } from "@/types/outwardGatePass.types";
import { ColumnDef } from "@tanstack/react-table";

export const outwardGatePassColumns = ():ColumnDef<IOutwardGatePass>[] => [
    {
        accessorKey: "OGPNumber",
        header: "No."
    },
    {
        accessorKey: "date",
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
] 
