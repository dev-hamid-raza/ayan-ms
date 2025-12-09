import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import React, { useState } from 'react'

function Login() {
  const [Loading, setLoading] = useState(false)
  return (
    <div>
        <Button className='w-full' onClick={() => setLoading((perv) => !perv)} variant="default">
          
            {Loading ? ("Loading...") : ("Log In")} 
           <Spinner className={`size-0 ${Loading && "size-7 fade-in"} transition-all`} />
        </Button>
        <Input />

    </div>
  )
}

export default Login
