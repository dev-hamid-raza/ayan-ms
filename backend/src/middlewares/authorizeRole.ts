import { Response, NextFunction, Request } from 'express';
import { ROLES } from '../config/accessControl';

export const authorizeRole =
    (...allowedRoles: ROLES[]) =>
        (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden: admin only' });
            }

            next();
        };
