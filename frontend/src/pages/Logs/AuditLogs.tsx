import Header from '@/components/common/Header'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { SkeletonHeader } from '@/components/common/SkeletonHeader'
import { SkeletonTable } from '@/components/common/SkeletonTable'
import { auditColumns } from '@/components/TableColumns/auditColumns'
import useFetchFn from '@/hooks/useFetch'
import { fetchAuditLogs } from '@/services/auditLogs'

function AuditLogs() {

    const { data, loading } = useFetchFn(fetchAuditLogs)

    return (
        <div className='flex flex-col h-screen'>
            <div className='sticky top-0 z-50 bg-background'>
                {loading ? (
                    <SkeletonHeader showButton={false} />
                ) : (
                    <Header title='System Logs' />
                )}
            </div>
            <div className='flex-1 min-h-0 px-5 pt-5 pb-5'>
                <div className='h-full'>
                    {loading ? (
                        <SkeletonTable rows={15} columns={9} />
                    ) : (
                        data?.data &&
                        <PrimaryTable
                            columns={auditColumns}
                            data={data?.data.data}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuditLogs
