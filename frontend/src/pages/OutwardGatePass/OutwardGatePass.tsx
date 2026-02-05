import Header from '@/components/common/Header'
import { PrimaryTable } from '@/components/common/PrimaryTable'
import { outwardGatePassColumns } from '@/components/TableColumns/outwardGatePassColumns'
import { Spinner } from '@/components/ui/spinner'
import useFetchFn from '@/hooks/useFetch'
import { fetchOGP } from '@/services/outwardGatePass'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function OutwardGatePass() {
  const navigate = useNavigate()
  const { data, error, loading, refetch } = useFetchFn(fetchOGP)

  const columns = outwardGatePassColumns()
  const handleClick = () => {
    navigate("create")
  }
  return (
    <div>
      <Header title='Outward Gate Pass' buttonText='Create OGP' onClick={handleClick} />
      <div className='px-5 mt-5'>
        {loading ? <Spinner /> :
          data?.data &&
          <PrimaryTable columns={columns} data={data?.data} />
        }
      </div>
    </div>
  )
}

export default OutwardGatePass
