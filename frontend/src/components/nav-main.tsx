"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { IUser, MODULES } from "@/types/auth.types"
import { canAccessModule } from "@/utils/permission"

type NavItem = {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    module?: MODULES   // <-- only this
    items?: {
        title: string
        url: string
        module?: MODULES  // <-- only this
    }[]
}

export function NavMain({
  items,
  user,
}: {
  items: NavItem[]
  user: IUser
}) {

  const visibleItems = items
    .map(item => {
      // Filter subitems based on module
      const visibleSubItems = item.items?.filter(sub =>
        canAccessModule(user, sub.module)
      );

      // Check parent permission
      const canSeeParent = canAccessModule(user, item.module);

      // Hide whole section if parent module not allowed
      if (!canSeeParent) return null;

      // If no visible children, hide
      if (visibleSubItems && visibleSubItems.length === 0) return null;

      return { ...item, items: visibleSubItems };
    })
    .filter(Boolean) as NavItem[];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {visibleItems.map(item => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

