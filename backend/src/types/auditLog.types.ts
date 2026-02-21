import { Document } from "mongoose";

export type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export interface IAuditLogChange {
    field: string;
    oldValue: any;
    newValue: any;
}

export interface IAuditLog extends Document {
    modelName: string;
    documentId: string;
    action: AuditAction;
    changes: IAuditLogChange[];
    performedBy: {
        userId: string;
        userName: string;
        userEmail: string;
    };
    timestamp: Date;
    ipAddress?: string;
    userAgent?: string;
}
