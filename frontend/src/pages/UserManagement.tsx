import Header from '@/components/common/Header'
import { userColumns } from '@/components/TableColumns/userColumns'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { SkeletonHeader } from '@/components/common/SkeletonHeader'
import { SkeletonTable } from '@/components/common/SkeletonTable'
import { CreateUserSidebar } from '@/components/userManagement/CreateUserSidebar'
import { UpdatePasswordDialog } from '@/components/userManagement/UpdatePasswordDialog'
import useFetchFn from '@/hooks/useFetch'
import { fetchUsers } from '@/services/user'
import { toast } from 'sonner'
import { useState } from 'react'
import { IUser } from '@/types/user.types'

function UserManagement() {
    const [open, setOpen] = useState(false)
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [selectedUserForPassword, setSelectedUserForPassword] = useState<IUser | null>(null)
    const { data, loading, refetch } = useFetchFn(fetchUsers)
    
    const handleEdit = (user: IUser) => {
        setSelectedUser(user)
        setOpen(true)
    }

    const handleUpdatePassword = (user: IUser) => {
        setSelectedUserForPassword(user)
        setPasswordDialogOpen(true)
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
    
    const columns = userColumns(handleEdit, handleDelete, handleUpdatePassword)

    return (
        <div>
            <div className='sticky top-0 z-50 bg-background'>
                {loading ? (
                    <SkeletonHeader showButton={true} />
                ) : (
                    <Header title='User Management' buttonText="Create User" onClick={() => {
                        setSelectedUser(null)
                        setOpen(true)
                    }} />
                )}
            </div>
            <div className='px-5 mt-5'>
                {loading ? (
                    <SkeletonTable rows={8} columns={7} />
                ) :
                    data?.data &&
                    <PrimaryTable columns={columns} data={data?.data} />
                }
            </div>
            <CreateUserSidebar open={open} onOpen={setOpen} selectedUser={selectedUser} onSuccess={refetch} />
            <UpdatePasswordDialog 
                open={passwordDialogOpen} 
                onOpenChange={setPasswordDialogOpen} 
                user={selectedUserForPassword}
            />
        </div>
    )
}

export default UserManagement
