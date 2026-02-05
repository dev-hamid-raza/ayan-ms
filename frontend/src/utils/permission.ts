import type { IUser } from "@/types/user.types";
import { ACTIONS, MODULES, ROLES } from "@/types/user.types";
import type { NavGroup } from "@/types/nav.types";

function isDefined<T>(v: T | undefined): v is T {
    return v !== undefined;
}

export function hasPermission(user: IUser, groups: NavGroup) {
    if (user.role === "admin") return groups;

    return groups
        .map(group => {
            if (!group.items || group.items.length === 0) {
                if (!group.permission) return undefined;
                const allowed = user.permissions.some(p => p.module === group.permission);
                return allowed ? group : undefined;
            }

            const allowedItems = group.items.filter(subItem =>
                user.permissions.some(p => p.module === subItem.permission)
            );

            return allowedItems.length ? { ...group, items: allowedItems } : undefined;
        })
        .filter(isDefined);
}

export function hasActionPermission(
    user: IUser,
    module: MODULES,
    action: ACTIONS
): boolean {
    if (user.role === ROLES.ADMIN) return true;

    return (user.permissions ?? []).some((p) => {
        if (p.module !== module) return false;
        const actions = p.actions ?? [];
        return actions.includes(action);
    });
}
