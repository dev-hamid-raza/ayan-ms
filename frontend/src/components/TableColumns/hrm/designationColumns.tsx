import ConfirmDialog from "@/components/common/ConfirmDialog";
import InputDialog from "@/components/common/InputDialog";
import PrimaryTooltip from "@/components/common/PrimaryTooltip";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import usePostFn from "@/hooks/usePostFn";
import { deleteDesignation, updateDesignation } from "@/services/hrm/hrmDesignations";
import { IDesignations } from "@/types/hrm";
import { ACTIONS, MODULES } from "@/types/user.types";
import { hasActionPermission } from "@/utils/permission";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type EditDesignationButtonProps = {
    id: string,
    designationName: string,
    onSubmitted?: () => void
}

type DesignationColumnsPros = {
    onSubmitted?: () => void
}

type DeleteDesignationButtonProps = {
    id: string,
    designationName: string
    onSubmitted?: () => void
}

const DeleteDesignationButton = ({ id, designationName, onSubmitted }: DeleteDesignationButtonProps) => {
    const [open, setOpen] = useState(false);
    const { postData, loading } = usePostFn(deleteDesignation);

    const handleDelete = async () => {
        try {
            const res = await postData(id);
            if (res.success) {
                toast.success("Designation deleted successfully");
                setOpen(false);
                onSubmitted?.();
            }
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <>
            <PrimaryTooltip content="Delete">
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
                title="Delete Department"
                description="This action cannot be undone."
                confirmText="Delete"
                onConfirm={handleDelete}
                loading={loading}
                confirmVariant="destructive"
            >
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete{designationName ? `${designationName} designation` : " this designation"}?
                </p>
            </ConfirmDialog>
        </>
    );
}

const EditDesignationButton = ({ designationName, id, onSubmitted }: EditDesignationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [designationError, setDesignationError] = useState(false)
    const { postData, loading } = usePostFn(updateDesignation)

    const handleSubmit = async (value: string) => {
        try {
            const res = await postData({ id, designationName: value })
            if (res.success) {
                toast.success("Designation is updated successfully")
                onSubmitted?.()
                setIsOpen(false)
            }
        } catch (error) {
            setDesignationError(true)
            toast.error(error as string)
        }
    }
    return (
        <>
            <PrimaryTooltip content="Edit">
                <Button
                    size={"icon-sm"}
                    variant={"ghost"}
                    onClick={() => setIsOpen(true)}
                >
                    <Pen className="w-4 h-4" />
                </Button>
            </PrimaryTooltip>
            <InputDialog
                confirmText="Update"
                open={isOpen}
                onOpenChange={setIsOpen}
                description="Designation name must be unique"
                title="Update Designation"
                inputLabel="Designation Name"
                placeholder="Enter designation name"
                initialValue={designationName}
                maxLength={50}
                loading={loading}
                hasError={designationError}
                onConfirm={(value) => handleSubmit(value)}
            />
        </>
    )
}

export const DesignationColumns = (options: DesignationColumnsPros): ColumnDef<IDesignations>[] => {

    const { user } = useAuth()
    const canEdit = hasActionPermission(user, MODULES.HRM, ACTIONS.UPDATE)
    const canDelete = hasActionPermission(user, MODULES.HRM, ACTIONS.DELETE)



    return [
        {
            accessorKey: "designationName",
            header: "Designation"
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {canEdit &&
                        <EditDesignationButton
                            onSubmitted={options.onSubmitted}
                            designationName={row.original.designationName}
                            id={row.original._id} />
                    }
                    {canDelete &&
                        <DeleteDesignationButton
                            onSubmitted={options.onSubmitted}
                            designationName={row.original.designationName}
                            id={row.original._id}
                        />
                    }
                </div>
            )
        },
    ]
}