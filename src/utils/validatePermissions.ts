// src/utils/validatePermissions.ts
import { ACTIONS, MODULES } from '../config/accessControl';
import { IPermission } from '../types/user.types'; 

const validModules = new Set<string>(Object.values(MODULES));
const validActions = new Set<string>(Object.values(ACTIONS));

export interface PermissionValidationResult {
    valid: boolean;
    errors: string[];
}

/**
 * Validate a raw permissions payload (from req.body).
 * Returns { valid: boolean, errors: string[] }
 */
export function validatePermissionsInput(raw: unknown): PermissionValidationResult {
    const errors: string[] = [];

    if (!Array.isArray(raw)) {
        return { valid: false, errors: ['permissions must be an array'] };
    }

    const seenModules = new Set<string>();

    raw.forEach((perm, index) => {
        if (typeof perm !== 'object' || perm === null) {
            errors.push(`permissions[${index}] must be an object`);
            return;
        }

        const { module, actions } = perm as { module?: string; actions?: unknown };

        // module checks
        if (!module || typeof module !== 'string') {
            errors.push(`permissions[${index}].module must be a string`);
        } else if (!validModules.has(module)) {
            errors.push(`permissions[${index}].module "${module}" is invalid`);
        } else {
            if (seenModules.has(module)) {
                errors.push(`Duplicate module "${module}" in permissions`);
            } else {
                seenModules.add(module);
            }
        }

        // actions checks
        if (!Array.isArray(actions) || actions.length === 0) {
            errors.push(`permissions[${index}].actions must be a non-empty array`);
        } else {
            const actionSet = new Set<string>();
            actions.forEach((action, aIndex) => {
                if (typeof action !== 'string') {
                    errors.push(
                        `permissions[${index}].actions[${aIndex}] must be a string`
                    );
                    return;
                }

                if (!validActions.has(action)) {
                    errors.push(
                        `permissions[${index}].actions[${aIndex}] "${action}" is invalid`
                    );
                }

                if (actionSet.has(action)) {
                    errors.push(
                        `Duplicate action "${action}" in permissions[${index}].actions`
                    );
                } else {
                    actionSet.add(action);
                }
            });
        }
    });

    return {
        valid: errors.length === 0,
        errors,
    };
}
