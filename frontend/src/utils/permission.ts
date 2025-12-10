import type { IUser, MODULES } from "@/types/auth.types";

export const canAccessModule = (user: IUser, module?: MODULES): boolean => {
    if (!module) return true; // if no module required → visible
    return user.permissions.some(p => p.module === module);
};
