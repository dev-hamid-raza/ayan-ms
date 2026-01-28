import Header from '@/components/common/Header'
import { columns } from '@/components/payments/columns'
import { DataTable } from '@/components/payments/data-table'
import { CreateUserSidebar } from '@/components/userManagement/CreateUserSidebar'
import useFetchFn from '@/hooks/useFetch'
import { fetchUsers } from '@/services/user'
import React from 'react'

function UserManagement() {
    const { data, error, loading } = useFetchFn(fetchUsers)
    console.log(data)
    return (
        <div>
            <Header title='User Management' button={<CreateUserSidebar />} />
            <div>
                {data?.data &&
                    <DataTable columns={columns} data={data?.data} />
                }
            </div>
        </div>
    )
}

export default UserManagement
