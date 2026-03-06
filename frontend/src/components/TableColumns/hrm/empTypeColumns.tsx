import ConfirmDialog from "@/components/common/ConfirmDialog";
import InputDialog from "@/components/common/InputDialog";
import PrimaryTooltip from "@/components/common/PrimaryTooltip";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import usePostFn from "@/hooks/usePostFn";
import { deleteEmpType, updateEmpType } from "@/services/hrm/hrmEmpType";
import { IEmpType } from "@/types/hrm";
import { ACTIONS, MODULES } from "@/types/user.types";
import { hasActionPermission } from "@/utils/permission";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type EditEmpTyeButtonProps = {
    id: string,
    empType: string,
    onSubmitted?: () => void
}

type EmpTypeColumnsPros = {
    onSubmitted?: () => void
}

type EmpTypeButtonProps = {
    id: string,
    empType: string
    onSubmitted?: () => void
}

const DeleteEmpTypeButton = ({ id, empType, onSubmitted }: EmpTypeButtonProps) => {
    const [open, setOpen] = useState(false);
    const { postData, loading } = usePostFn(deleteEmpType);

    const handleDelete = async () => {
        try {
            const res = await postData(id);
            if (res.success) {
                toast.success("Employee type deleted successfully");
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
                title="Delete Employee Type"
                description="This action cannot be undone."
                confirmText="Delete"
                onConfirm={handleDelete}
                loading={loading}
                confirmVariant="destructive"
            >
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete {empType ? `${empType} employee type` : " this employee type"}?
                </p>
            </ConfirmDialog>
        </>
    );
}

const EditEmpTypeButton = ({ empType, id, onSubmitted }: EditEmpTyeButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [empTypeError, setEmpTypeError] = useState(false)
    const { postData, loading } = usePostFn(updateEmpType)

    const handleSubmit = async (value: string) => {
        try {
            const res = await postData({ id, empType: value })
            if (res.success) {
                toast.success("Employee type is updated successfully")
                onSubmitted?.()
                setIsOpen(false)
            }
        } catch (error) {
            setEmpTypeError(true)
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
                description="Employee type must be unique"
                title="Update Employee Type"
                inputLabel="Employee Type"
                placeholder="Enter employee type name"
                initialValue={empType}
                maxLength={50}
                loading={loading}
                hasError={empTypeError}
                onConfirm={(value) => handleSubmit(value)}
            />
        </>
    )
}

export const EmpTypeColumns = (options: EmpTypeColumnsPros): ColumnDef<IEmpType>[] => {

    const { user } = useAuth()
    const canEdit = hasActionPermission(user, MODULES.HRM, ACTIONS.UPDATE)
    const canDelete = hasActionPermission(user, MODULES.HRM, ACTIONS.DELETE)



    return [
        {
            accessorKey: "empType",
            header: "Employee Type"
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {canEdit &&
                        <EditEmpTypeButton
                            onSubmitted={options.onSubmitted}
                            empType={row.original.empType}
                            id={row.original._id} />
                    }
                    {canDelete &&
                        <DeleteEmpTypeButton
                            onSubmitted={options.onSubmitted}
                            empType={row.original.empType}
                            id={row.original._id}
                        />
                    }
                </div>
            )
        },
    ]
}