import Header from '@/components/common/Header'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { SkeletonTable } from '@/components/common/SkeletonTable'
import { SkeletonHeader } from '@/components/common/SkeletonHeader'
import { outwardGatePassColumns } from '@/components/TableColumns/outwardGatePassColumns'
import useFetchFn from '@/hooks/useFetch'
import { fetchOGP } from '@/services/outwardGatePass'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/CONSTANTS/ROUTES'

function OutwardGatePass() {
  const navigate = useNavigate()
  const { data, loading, refetch } = useFetchFn(fetchOGP)

  const columns = outwardGatePassColumns({ onDeleted: () => refetch() })
  const handleClick = () => {
    navigate(`/${ROUTES.GATE_PASS.CREATE_OGP}`)
  }
  return (
    <div>
      <div className='sticky top-0 z-50 bg-background'>
        {loading ? (
          <SkeletonHeader showButton={true} />
        ) : (
          <Header title='Outward Gate Pass' buttonText='Create OGP' onClick={handleClick} />
        )}
      </div>
      <div className='px-5 mt-5'>
        {loading ? (
          <SkeletonTable rows={8} columns={9} />
        ) :
          data?.data &&
          <PrimaryTable columns={columns} data={data?.data} />
        }
      </div>
    </div>
  )
}

export default OutwardGatePass
