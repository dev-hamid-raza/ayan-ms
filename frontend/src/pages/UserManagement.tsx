import Header from '@/components/common/Header'
import { userColumns } from '@/components/TableColumns/userColumns'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { CreateUserSidebar } from '@/components/userManagement/CreateUserSidebar'
import useFetchFn from '@/hooks/useFetch'
import { fetchUsers } from '@/services/user'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

function UserManagement() {
    const { data, error, loading } = useFetchFn(fetchUsers)
    if (error) {
        toast.error(error)
    }

    return (
        <div>
            <Header title='User Management' button={<CreateUserSidebar />} />
            <div className='px-5 mt-5'>
                {loading ? <Spinner /> :
                    data?.data &&
                    <PrimaryTable columns={userColumns} data={data?.data} />
                }
            </div>
        </div>
    )
}

export default UserManagement
