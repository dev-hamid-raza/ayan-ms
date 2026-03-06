import Header from "@/components/common/Header"
import InputDialog from "@/components/common/InputDialog"
import { PrimaryTable } from "@/components/common/PrimaryTable"
import { SkeletonHeader } from "@/components/common/SkeletonHeader"
import { SkeletonTable } from "@/components/common/SkeletonTable"
import { DesignationColumns } from "@/components/TableColumns/hrm/designationColumns"
import { useAuth } from "@/contexts/AuthContext"
import useFetchFn from "@/hooks/useFetch"
import usePostFn from "@/hooks/usePostFn"
import { createDesignation, fetchDesignations } from "@/services/hrm/hrmDesignations"
import { ACTIONS, MODULES } from "@/types/user.types"
import { hasActionPermission } from "@/utils/permission"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function DesignationsHrm() {
    const [isOpen, setIsOpen] = useState(false)
    const { data, loading, refetch } = useFetchFn(fetchDesignations)
    const [designationError, setDesignationError] = useState(false)
    const { postData, loading: createDesignationLoading } = usePostFn(createDesignation)
    const { user } = useAuth()
    const canCreate = hasActionPermission(user, MODULES.HRM, ACTIONS.CREATE)
    const columns = DesignationColumns({ onSubmitted: () => refetch() })

    useEffect(() => {
        setDesignationError(false)
    }, [isOpen])

    const handleSubmit = async (value: string) => {
        try {
            const res = await postData({ designationName: value })
            if (res.success) {
                toast.success("Department is create successfully")
                refetch()
                setIsOpen(false)
            }
        } catch (error) {
            setDesignationError(true)
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
                        title='Designations'
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
                description="Designation name must be unique"
                title="Create Designation"
                inputLabel="Designation Name"
                placeholder="Enter new designation name"
                initialValue={""}
                maxLength={50}
                loading={createDesignationLoading}
                hasError={designationError}
                onConfirm={(value) => handleSubmit(value)}
            />
        </div>
    )
}

export default DesignationsHrm