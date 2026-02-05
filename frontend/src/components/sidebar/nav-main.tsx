"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { NavGroup } from "@/types/nav.types"
import { Link, useLocation } from "react-router-dom"

export function NavMain({items}: {items: NavGroup}) {
  const location = useLocation()
  const { state } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Check if any child is active
          const hasActiveChild = item.items?.some((subItem) => 
            location.pathname === subItem.url || location.pathname.startsWith(subItem.url + '/')
          )

          return (
            item.items && item.items.length > 0 ? (
              state === "collapsed" ? (
                // Dropdown menu for collapsed state
                <SidebarMenuItem key={item.title}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        size="lg"
                        className="hover:cursor-pointer py-3 text-base [&>svg]:size-5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                      >
                        {item.icon && <item.icon />}
                        <span className="text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                        <ChevronRight className="ml-auto h-5 w-5 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="min-w-48">
                      {item.items?.map((subItem) => {
                        const isActive = location.pathname === subItem.url || location.pathname.startsWith(subItem.url + '/')
                        
                        return (
                          <DropdownMenuItem key={subItem.title} asChild>
                            <Link to={subItem.url} className={isActive ? "bg-accent" : ""}>
                              {subItem.icon && <subItem.icon className="mr-2 h-5 w-5" />}
                              <span className="text-base">{subItem.title}</span>
                            </Link>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ) : (
                // Collapsible for expanded state
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={hasActiveChild}
                  className="group/collapsible"
                >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      size="lg"
                      className="hover:cursor-pointer py-3 text-base [&>svg]:size-5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                    >
                      {item.icon && <item.icon />}
                      <span className="text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                      <ChevronRight className="ml-auto h-5 w-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isActive = location.pathname === subItem.url || location.pathname.startsWith(subItem.url + '/')
                        
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={isActive} className="h-auto! py-1.5!">
                              <Link to={subItem.url}>
                                {subItem.icon && <subItem.icon className="h-5 w-5" />}
                                <span className="text-base">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                size="lg"
                isActive={location.pathname === item.url || location.pathname.startsWith((item.url || '') + '/')}
                className="hover:cursor-pointer py-3 text-base [&>svg]:size-6 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 font-normal data-[active=true]:font-normal"
              >
                <Link to={item.url || '#'}>
                  {item.icon && <item.icon />}
                  <span className="text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )})}
      </SidebarMenu>
    </SidebarGroup>
  )
}
