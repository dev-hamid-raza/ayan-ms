import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
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
