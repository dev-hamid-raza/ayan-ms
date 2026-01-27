import type { IUser } from "@/types/user.types";
import type { NavGroup } from "@/types/nav.types";

function isDefined<T>(v: T | undefined): v is T {
    return v !== undefined;
}

export function hasPermission(user: IUser, groups: NavGroup) {
    if (user.role === "admin") return groups;

    return groups
        .map(group => {
            if (!group.items) return undefined;

            const allowedItems = group.items.filter(subItem =>
                user.permissions.some(p => p.module === subItem.permission)
            );

            return allowedItems.length ? { ...group, items: allowedItems } : undefined;
        })
        .filter(isDefined);
}
