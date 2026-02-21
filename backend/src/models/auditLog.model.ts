import mongoose, { Schema } from "mongoose";
import { IAuditLog } from "../types/auditLog.types.js";

const auditLogChangeSchema = new Schema(
    {
        field: {
            type: String,
            required: true,
        },
        oldValue: {
            type: Schema.Types.Mixed,
            default: null,
        },
        newValue: {
            type: Schema.Types.Mixed,
            default: null,
        },
    },
    { _id: false }
);

const auditLogSchema = new Schema<IAuditLog>(
    {
        modelName: {
            type: String,
            required: true,
            enum: ["outwardGatePass", "user"],
        },
        documentId: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: ["CREATE", "UPDATE", "DELETE"],
        },
        changes: [auditLogChangeSchema],
        performedBy: {
            userId: {
                type: String,
                required: true,
            },
            userName: {
                type: String,
                required: true,
            },
            userEmail: {
                type: String,
            },
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now,
        },
        ipAddress: String,
        userAgent: String,
    },
    { timestamps: false }
);

// Index for faster queries
auditLogSchema.index({ modelName: 1, documentId: 1 });
auditLogSchema.index({ "performedBy.userId": 1 });
auditLogSchema.index({ timestamp: -1 });

export const AuditLog = mongoose.model<IAuditLog>("auditLog", auditLogSchema);
