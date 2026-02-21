import { AuditLog } from "../models/auditLog.model.js";
import { IAuditLogChange, AuditAction } from "../types/auditLog.types.js";
import { Request } from "express";

interface AuditLogParams {
    modelName: string;
    documentId: string;
    action: AuditAction;
    changes: IAuditLogChange[];
    req: Request;
}

/**
 * Save audit log to database
 * @param params - Audit log parameters
 */
export const saveAuditLog = async (params: AuditLogParams): Promise<void> => {
    const { modelName, documentId, action, changes, req } = params;
    const user = req.user;

    if (!user) {
        console.warn("No user found in request for audit log");
        return;
    }

    try {
        const ipAddress = req.ip || req.socket.remoteAddress;
        const userAgent = req.get("user-agent");

        await AuditLog.create({
            modelName,
            documentId,
            action,
            changes,
            performedBy: {
                userId: user._id?.toString() || "unknown",
                userName: `${user.firstName} ${user.lastName}`,
                userEmail: user.username,
            },
            ipAddress,
            userAgent,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error("Failed to save audit log:", error);
        // Don't throw error to avoid disrupting main operation
    }
};

/**
 * Compare two objects and get changes
 * @param oldData - Previous data
 * @param newData - New data
 * @param fieldsToTrack - Fields to track (optional, tracks all if not provided)
 * @returns Array of changes
 */
export const getChanges = (
    oldData: any,
    newData: any,
    fieldsToTrack?: string[]
): IAuditLogChange[] => {
    const changes: IAuditLogChange[] = [];

    // If fieldsToTrack is provided, only check those fields
    const keysToCheck = fieldsToTrack || Object.keys(newData);

    for (const field of keysToCheck) {
        const oldValue = oldData?.[field];
        const newValue = newData?.[field];

        // Skip if values are the same
        if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
            continue;
        }

        // Skip internal fields
        if (["_id", "__v", "createdAt", "updatedAt"].includes(field)) {
            continue;
        }

        changes.push({
            field,
            oldValue: oldValue || null,
            newValue: newValue || null,
        });
    }

    return changes;
};
