import Header from '@/components/common/Header'
import { CreateUserSidebar } from '@/components/userManagement/CreateUserSidebar'
import React from 'react'

function UserManagement() {
    return (
        <div>
            <Header title='User Management' button={ <CreateUserSidebar />} />
            <div className='px-5'>
                This is
               
            </div>
        </div>
    )
}

export default UserManagement
