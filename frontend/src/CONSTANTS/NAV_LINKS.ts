import { MODULES } from "@/types/user.types";
import type { NavGroup } from "@/types/nav.types";
import { ArrowDownToLine, ArrowUpFromLine, Bot, CalendarCheck2, ClockFading, Landmark, Logs, Scissors, Shapes, ShieldUser, SquareTerminal, Tag, TriangleAlert, User2, UserCog2, UsersRound } from "lucide-react";

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
        title: "HRM",
        url: "#",
        icon: UserCog2,
        items: [
            {
                title: "Employees",
                url: "#",
                permission: MODULES.HRM,
                icon: UsersRound,
            },
            {
                title: "Departments",
                url: "/hrm-departments",
                permission: MODULES.HRM,
                icon: Landmark,
            },
            {
                title: "Designations",
                url: "/hrm-designations",
                permission: MODULES.HRM,
                icon: Tag,
            },
            {
                title: "Shifts",
                url: "#",
                permission: MODULES.HRM,
                icon: ClockFading,
            },
            {
                title: "Attendance",
                url: "#",
                permission: MODULES.HRM,
                icon: CalendarCheck2,
            },
            {
                title: "Employee Types",
                url: "/hrm-emp-types",
                permission: MODULES.HRM,
                icon: Shapes,
            },
        ],
    },
    {
        title: "Admin",
        url: "/user-management",
        icon: ShieldUser,
        // permission: MODULES.ADMIN_PANEL,
        items: [
            {
                title: "User Management",
                url: "/user-management",
                permission: MODULES.USER_MANAGEMENT,
                icon: User2,
            },
            {
                title: "Audit Logs",
                url: "/audit-logs",
                permission: MODULES.AUDIT_LOGS,
                icon: Logs,
            },
            {
                title: "Error Logs",
                url: "/error-logs",
                permission: MODULES.ERROR_LOGS,
                icon: TriangleAlert,
            },
        ]
    },
]