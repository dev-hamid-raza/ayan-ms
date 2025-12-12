"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { NavGroup } from "@/types/nav.types"
import { MODULES } from "@/types/auth.types"
import { useAuth } from "@/contexts/AuthContext"
import { hasPermission } from "@/utils/permission"
import LoadingPage from "./common/LoadingPage"

const navItem: NavGroup = [
    {
      title: "Gate Pass",
      url: "/gate-pass",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Gate Pass In",
          url: "#",
          permission: MODULES.GATE_PASS_IN
        },
        {
          title: "Gate Pass Out",
          url: "#",
          permission: MODULES.GATE_PASS_OUT
        },
      ],
    },
    {
      title: "Rate List",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Stitching Rate",
          url: "#",
          permission: MODULES.STITCHING_RATES
        },
      ],
    },
  ]




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {user , loading} = useAuth()
    const navData = hasPermission(user,navItem)
    console.log(navData, "data")
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
