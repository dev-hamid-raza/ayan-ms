import { MODULES } from "@/types/user.types";
import type { NavGroup } from "@/types/nav.types";
import { Bot, SquareTerminal, ShieldUser } from "lucide-react";

export const NAV_ITEM: NavGroup = [
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
                url: "/outward-gate-pass",
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
    {
        title: "Admin",
        url: "#",
        icon: ShieldUser,
        items: [
            {
                title: "User Management",
                url: "/user-management",
                permission: MODULES.ADMIN_PANEL
            },
        ],
    },
]