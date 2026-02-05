import type { LucideIcon } from "lucide-react"
import type { MODULES } from "./user.types"

export interface NavItem {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    permission?: MODULES
    items?: {
        title: string
        url: string
        permission: MODULES
        icon?: LucideIcon
    }[]
}

export type NavGroup  = NavItem[];