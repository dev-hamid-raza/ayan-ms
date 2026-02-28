import Header from '@/components/common/Header'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { SkeletonHeader } from '@/components/common/SkeletonHeader'
import { SkeletonTable } from '@/components/common/SkeletonTable'
import { logColumns } from '@/components/TableColumns/errorLogsColumns'
import useFetchFn from '@/hooks/useFetch'
import { fetchErrorLogs } from '@/services/errorLogs'
import { useMemo } from 'react'

function ErrorLogs() {
    const { data: logs, loading } = useFetchFn(fetchErrorLogs)
    const normalizedLogs = useMemo(() => {
        return logs?.data?.map((log) => ({
            level: log.level,
            time: log.time,
            pid: log.pid,
            hostname: log.hostname,
            text: log.message ?? log.msg ?? "No message",
            method: log.method ?? "",
            url: log.url ?? "",
            stack: log.stack ?? "",
        })) ?? [];
    }, [logs]);
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

                        <PrimaryTable
                            columns={logColumns}
                            data={normalizedLogs}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ErrorLogs
