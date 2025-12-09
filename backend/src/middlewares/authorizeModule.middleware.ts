// src/middleware/authorizeModule.ts
import { Response, NextFunction, Request } from 'express';
import { ROLES, MODULES, ACTIONS } from '../config/accessControl';
import { ApiError } from '../utils/ApiError';

export const authorizeModule =
    (module: MODULES, action: ACTIONS) =>
        (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;

            if (!user) {
                throw new ApiError(401, 'Not authenticated');
            }

            if (user.role === ROLES.ADMIN) {
                return next();
            }

            const hasPermission = user.permissions?.some((perm) => {
                return perm.module === module && perm.actions.includes(action);
            });

            if (!hasPermission) {
                throw new ApiError(403, `Forbidden: no ${action} access to ${module}`);
            }

            next();
        };
