import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <div className='flex'>Sidebar</div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout
