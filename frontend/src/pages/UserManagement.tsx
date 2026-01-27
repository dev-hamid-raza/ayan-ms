import Header from '@/components/common/Header'
import { CreateUserSidebar } from '@/components/userManagement/CreateUserSidebar'
import useFetchFn from '@/hooks/useFetch'
import { fetchUsers } from '@/services/user'
import React from 'react'

function UserManagement() {
    const {data, error, loading} = useFetchFn(fetchUsers)
    console.log(data)
    return (
        <div>
            <Header title='User Management' button={ <CreateUserSidebar />} />
            <div className='px-5'>
               {data?.data.map((user, index) => {
                return (
                    <div className='flex gap-5'>
                        <h2>{index + 1}</h2>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <h2>{user.username}</h2>
                        <h2>{user.role}</h2>
                        <h2 className='flex gap-1'>{user.permissions.map((per) => {
                            return (
                                <div className='flex'>
                                <div>{per.module}</div>
                                <div>{per.actions?.map(act => act)}</div>
                                </div>
                            )
                        })}</h2>
                    </div>
                )
               })}
            </div>
        </div>
    )
}

export default UserManagement
