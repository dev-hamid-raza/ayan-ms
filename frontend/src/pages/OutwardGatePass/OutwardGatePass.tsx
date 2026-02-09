import Header from '@/components/common/Header'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { SkeletonTable } from '@/components/common/SkeletonTable'
import { SkeletonHeader } from '@/components/common/SkeletonHeader'
import { outwardGatePassColumns } from '@/components/TableColumns/outwardGatePassColumns'
import useFetchFn from '@/hooks/useFetch'
import { fetchOGP } from '@/services/outwardGatePass'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/CONSTANTS/ROUTES'
import { Plus } from 'lucide-react'
import { hasActionPermission } from '@/utils/permission'
import { useAuth } from '@/contexts/AuthContext'
import { ACTIONS, MODULES } from '@/types/user.types'

function OutwardGatePass() {
  const navigate = useNavigate()
  const { data, loading, refetch } = useFetchFn(fetchOGP)
  const { user } = useAuth()
  const canCreate = hasActionPermission(user, MODULES.GATE_PASS_OUT, ACTIONS.CREATE)

  const columns = outwardGatePassColumns({ onDeleted: () => refetch() })
  const handleClick = () => {
    navigate(`/${ROUTES.GATE_PASS.CREATE_OGP}`)
  }
  return (
    <div className='flex flex-col h-screen'>
      <div className='sticky top-0 z-50 bg-background'>
        {loading ? (
          <SkeletonHeader showButton={true} />
        ) : (
          <Header
            title='Outward Gate Pass'
            buttonText='Create OGP'
            buttonIcon={<Plus className='h-4 w-4' />}
            showButton={canCreate}
            onClick={handleClick}
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
    </div>
  )
}

export default OutwardGatePass
