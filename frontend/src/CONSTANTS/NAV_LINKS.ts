import { MODULES } from "@/types/user.types";
import type { NavGroup } from "@/types/nav.types";
import { ArrowDownToLine, ArrowUpFromLine, Bot, Scissors, ShieldUser, SquareTerminal } from "lucide-react";

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
                permission: MODULES.GATE_PASS_IN,
                icon: ArrowDownToLine,
            },
            {
                title: "Gate Pass Out",
                url: "/outward-gate-pass",
                permission: MODULES.GATE_PASS_OUT,
                icon: ArrowUpFromLine,
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
                permission: MODULES.STITCHING_RATES,
                icon: Scissors,
            },
        ],
    },
    {
        title: "Admin",
        url: "/user-management",
        icon: ShieldUser,
        permission: MODULES.ADMIN_PANEL,
    },
]