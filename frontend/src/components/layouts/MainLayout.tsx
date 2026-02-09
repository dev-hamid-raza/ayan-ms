import { Outlet } from 'react-router-dom'
import { AppSidebar } from '../sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'

function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
