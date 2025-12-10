import { Spinner } from "../ui/spinner"

function LoadingPage() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Spinner className="size-6" />
    </div>
  )
}

export default LoadingPage
