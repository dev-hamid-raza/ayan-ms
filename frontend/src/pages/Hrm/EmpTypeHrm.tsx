import Header from "@/components/common/Header"
import InputDialog from "@/components/common/InputDialog"
import { PrimaryTable } from "@/components/common/PrimaryTable"
import { SkeletonHeader } from "@/components/common/SkeletonHeader"
import { SkeletonTable } from "@/components/common/SkeletonTable"
import { EmpTypeColumns } from "@/components/TableColumns/hrm/empTypeColumns"
import { useAuth } from "@/contexts/AuthContext"
import useFetchFn from "@/hooks/useFetch"
import usePostFn from "@/hooks/usePostFn"
import { createEmpType, fetchEmpTypes } from "@/services/hrm/hrmEmpType"
import { ACTIONS, MODULES } from "@/types/user.types"
import { hasActionPermission } from "@/utils/permission"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function EmpTypeHrm() {
    const [isOpen, setIsOpen] = useState(false)
    const { data, loading, refetch } = useFetchFn(fetchEmpTypes)
    const [empTypeError, setEmpTypeError] = useState(false)
    const { postData, loading: createEmpTypeLoading } = usePostFn(createEmpType)
    const { user } = useAuth()
    const canCreate = hasActionPermission(user, MODULES.HRM, ACTIONS.CREATE)
    const columns = EmpTypeColumns({ onSubmitted: () => refetch() })

    useEffect(() => {
        setEmpTypeError(false)
    }, [isOpen])

    const handleSubmit = async (value: string) => {
        try {
            const res = await postData({ empType: value })
            if (res.success) {
                toast.success("Employee type is create successfully")
                refetch()
                setIsOpen(false)
            }
        } catch (error) {
            setEmpTypeError(true)
            toast.error(error as string)
        }
    }

    return (
        <div className='flex flex-col h-screen'>
            <div className='sticky top-0 z-50 bg-background'>
                {loading ? (
                    <SkeletonHeader showButton={true} />
                ) : (
                    <Header
                        title='Employee Types'
                        buttonText='Create'
                        buttonIcon={<Plus className='h-4 w-4' />}
                        showButton={canCreate}
                        onClick={() => setIsOpen(true)}
                    />
                )}
            </div>
            <div className='flex-1 min-h-0 px-5 pt-5 pb-5'>
                {loading ? (
                    <div className='h-full'>
                        <SkeletonTable rows={15} columns={9} />
                    </div>
                ) : (
                    data?.data && (
                        <div className='h-full'>
                            <PrimaryTable columns={columns} data={data?.data} />
                        </div>
                    )
                )}
            </div>
            <InputDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                description="Employee type name must be unique"
                title="Create Employee Type"
                inputLabel="Employee Type"
                placeholder="Enter new employee type"
                initialValue={""}
                maxLength={50}
                loading={createEmpTypeLoading}
                hasError={empTypeError}
                onConfirm={(value) => handleSubmit(value)}
            />
        </div>
    )
}

export default EmpTypeHrm