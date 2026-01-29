import Header from '@/components/common/Header'
import { userColumns } from '@/components/TableColumns/userColumns'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { CreateUserSidebar } from '@/components/userManagement/CreateUserSidebar'
import useFetchFn from '@/hooks/useFetch'
import { fetchUsers } from '@/services/user'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useState, useEffect } from 'react'
import { IUser } from '@/types/user.types'

function UserManagement() {
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const { data, error, loading, refetch } = useFetchFn(fetchUsers)
    
    const handleEdit = (user: IUser) => {
        setSelectedUser(user)
        setOpen(true)
    }

    const handleDelete = (user: IUser) => {
        // TODO: Implement delete functionality
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: `Deleting ${user.username}...`,
                success: `${user.username} deleted successfully`,
                error: 'Failed to delete user',
            }
        )
    }
    
    if (error) {
        toast.error(error)
    }

    const columns = userColumns(handleEdit, handleDelete)

    return (
        <div>
            <Header title='User Management' buttonText="Create User" onClick={() => {
                setSelectedUser(null)
                setOpen(true)
            }} />
            <div className='px-5 mt-5'>
                {loading ? <Spinner /> :
                    data?.data &&
                    <PrimaryTable columns={columns} data={data?.data} />
                }
            </div>
            <CreateUserSidebar open={open} onOpen={setOpen} selectedUser={selectedUser} onSuccess={refetch} />
        </div>
    )
}

export default UserManagement
