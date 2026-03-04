import Header from "@/components/common/Header"
import { SkeletonHeader } from "@/components/common/SkeletonHeader"
import { Plus } from "lucide-react"

function DepartmentsHrm() {
    const loading = false
    return (
        <div className='flex flex-col h-screen'>
            <div className='sticky top-0 z-50 bg-background'>
                {loading ? (
                    <SkeletonHeader showButton={true} />
                ) : (
                    <Header
                        title='Departments'
                        buttonText='Create'
                        buttonIcon={<Plus className='h-4 w-4' />}
                        // showButton={canCreate}
                        // onClick={handleClick}
                    />
                )}
            </div>
            {/* <div className='flex-1 min-h-0 px-5 pt-5 pb-5'>
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
            </div> */}
        </div>
    )
}

export default DepartmentsHrm
