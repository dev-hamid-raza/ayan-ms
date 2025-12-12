import type { LucideIcon } from "lucide-react"
import type { MODULES } from "./auth.types"

export interface NavItem {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
        title: string
        url: string
        permission: MODULES
    }[]
}

export type NavGroup  = NavItem[];