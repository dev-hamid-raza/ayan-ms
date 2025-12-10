import { Outlet } from 'react-router-dom'
import { AppSidebar } from '../app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'

function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
