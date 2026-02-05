import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { hasPermission } from "@/utils/permission"
import LoadingPage from "../common/LoadingPage"
import { NAV_ITEM } from "@/CONSTANTS/NAV_LINKS"






export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {user , loading} = useAuth()
    const navData = hasPermission(user,NAV_ITEM)
  return (
    <Sidebar collapsible="icon" {...props}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:justify-center">
          <h2 className="text-lg font-semibold whitespace-nowrap transition-all duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">Ayan MS</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
        </>
      )}
    </Sidebar>
  )
}
