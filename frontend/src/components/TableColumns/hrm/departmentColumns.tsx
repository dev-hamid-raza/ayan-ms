import ConfirmDialog from "@/components/common/ConfirmDialog";
import InputDialog from "@/components/common/InputDialog";
import PrimaryTooltip from "@/components/common/PrimaryTooltip";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import usePostFn from "@/hooks/usePostFn";
import { deleteDepartment, updateDepartment } from "@/services/hrm/hrmDepartments";
import { IDepartments } from "@/types/hrm";
import { ACTIONS, MODULES } from "@/types/user.types";
import { hasActionPermission } from "@/utils/permission";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type EditDepartmentButtonProps = {
    id: string,
    departmentName: string,
    onSubmitted?: () => void
}

type DepartmentColumnsPros = {
    onSubmitted?: () => void
}

type DeleteDepartmentButtonProps = {
    id: string,
    departmentName: string
    onSubmitted?: () => void
}

const DeleteDepartmentButton = ({ id, departmentName, onSubmitted }: DeleteDepartmentButtonProps) => {
    const [open, setOpen] = useState(false);
    const { postData, loading } = usePostFn(deleteDepartment);

    const handleDelete = async () => {
        try {
            const res = await postData(id);
            if (res.success) {
                toast.success("Department deleted successfully");
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
                    Are you sure you want to delete {departmentName ? `${departmentName} Department` : " this department"}?
                </p>
            </ConfirmDialog>
        </>
    );
}

const EditDepartmentButton = ({ departmentName, id, onSubmitted }: EditDepartmentButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [departmentError, setDepartmentError] = useState(false)
    const { postData, loading } = usePostFn(updateDepartment)

    const handleSubmit = async (value: string) => {
        try {
            const res = await postData({ id, departmentName: value })
            if (res.success) {
                toast.success("Department is updated successfully")
                onSubmitted?.()
                setIsOpen(false)
            }
        } catch (error) {
            setDepartmentError(true)
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
                description="Department name must be unique"
                title="Update Department"
                inputLabel="Department Name"
                placeholder="Enter department name"
                initialValue={departmentName}
                maxLength={50}
                loading={loading}
                hasError={departmentError}
                onConfirm={(value) => handleSubmit(value)}
            />
        </>
    )
}

export const DepartmentColumns = (options: DepartmentColumnsPros): ColumnDef<IDepartments>[] => {

    const { user } = useAuth()
    const canEdit = hasActionPermission(user, MODULES.HRM, ACTIONS.UPDATE)
    const canDelete = hasActionPermission(user, MODULES.HRM, ACTIONS.DELETE)



    return [
        {
            accessorKey: "departmentName",
            header: "Department"
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {canEdit &&
                        <EditDepartmentButton
                            onSubmitted={options.onSubmitted}
                            departmentName={row.original.departmentName}
                            id={row.original._id} />
                    }
                    {canDelete &&
                        <DeleteDepartmentButton
                            onSubmitted={options.onSubmitted}
                            departmentName={row.original.departmentName}
                            id={row.original._id}
                        />
                    }
                </div>
            )
        },
    ]
}