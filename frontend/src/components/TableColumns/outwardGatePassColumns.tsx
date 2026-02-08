import { IOutwardGatePass } from "@/types/outwardGatePass.types";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTooltip from "../common/PrimaryTooltip";
import { Button } from "../ui/button";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { hasActionPermission } from "@/utils/permission";
import { ACTIONS, MODULES } from "@/types/user.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/CONSTANTS/ROUTES";
import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import { deleteOGP } from "@/services/outwardGatePass";
import usePostFn from "@/hooks/usePostFn";
import { toast } from "sonner";

type OutwardGatePassColumnsOptions = {
    onDeleted?: () => void;
};

type DeleteOGPButtonProps = {
    id: string;
    ogpNumber?: number;
    onDeleted?: () => void;
};

const DeleteOGPButton = ({ id, ogpNumber, onDeleted }: DeleteOGPButtonProps) => {
    const [open, setOpen] = useState(false);
    const { postData, loading } = usePostFn(deleteOGP);

    const handleDelete = async () => {
        try {
            const res = await postData(id);
            if (res.success) {
                toast.success("Outward gate pass deleted successfully");
                setOpen(false);
                onDeleted?.();
            }
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <>
            <PrimaryTooltip content="Delete OGP">
                <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => setOpen(true)}
                >
                    <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
            </PrimaryTooltip>
            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title="Delete Outward Gate Pass"
                description="This action cannot be undone."
                confirmText="Delete"
                onConfirm={handleDelete}
                loading={loading}
                confirmVariant="destructive"
            >
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete{ogpNumber ? ` OGP #${ogpNumber}` : " this gate pass"}?
                </p>
            </ConfirmDialog>
        </>
    );
};

export const outwardGatePassColumns = (options: OutwardGatePassColumnsOptions = {}):ColumnDef<IOutwardGatePass>[] => {
    const { user } = useAuth();
    const canEdit = hasActionPermission(user, MODULES.GATE_PASS_OUT, ACTIONS.UPDATE);
    const canDelete = hasActionPermission(user, MODULES.GATE_PASS_OUT, ACTIONS.DELETE);
    const navigate = useNavigate()

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
        cell: ({row}) => (
            <div className="flex gap-2">
                <PrimaryTooltip content="View">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => navigate(`/${ROUTES.GATE_PASS.VIEW.replace(":id", row.original._id)}`)}
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                    </PrimaryTooltip>
                {canEdit && (
                    <PrimaryTooltip content="Edit OGP">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                             onClick={() => navigate(`/${ROUTES.GATE_PASS.EDIT.replace(":id", row.original._id)}`)}
                        >
                            <Pen className="w-4 h-4" />
                        </Button>
                    </PrimaryTooltip>
                )}
                {canDelete && (
                    <DeleteOGPButton
                        id={row.original._id}
                        ogpNumber={row.original.OGPNumber}
                        onDeleted={options.onDeleted}
                    />
                )}
            </div>
        )
    }
    ];
}
