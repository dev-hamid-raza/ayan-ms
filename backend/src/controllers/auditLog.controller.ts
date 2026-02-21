import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AuditLog } from "../models/auditLog.model.js";

/**
 * Get audit logs for a specific document
 */
export const getAuditLogsForDocument = asyncHandler(async (
    req: Request<{ modelName: string; documentId: string }>,
    res: Response
) => {
    const { modelName, documentId } = req.params;

    // Validate inputs
    const validModels = ["outwardGatePass", "user"];
    if (!validModels.includes(modelName)) {
        throw new ApiError(400, `Invalid model name. Must be one of: ${validModels.join(", ")}`);
    }

    if (!documentId) {
        throw new ApiError(400, "Document ID is required");
    }

    const auditLogs = await AuditLog.find({
        modelName,
        documentId,
    }).sort({ timestamp: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(200, auditLogs, "Audit logs fetched successfully")
        );
});

/**
 * Get all audit logs (with pagination)
 */
export const getAllAuditLogs = asyncHandler(async (
    req: Request<{}, {}, {}, { page?: string; limit?: string; modelName?: string }>,
    res: Response
) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const { modelName } = req.query;

    const skip = (page - 1) * limit;
    const query: any = {};

    if (modelName) {
        const validModels = ["outwardGatePass", "user"];
        if (!validModels.includes(modelName)) {
            throw new ApiError(400, `Invalid model name. Must be one of: ${validModels.join(", ")}`);
        }
        query.modelName = modelName;
    }

    const [auditLogs, total] = await Promise.all([
        AuditLog.find(query)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit),
        AuditLog.countDocuments(query),
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200,
                {
                    data: auditLogs,
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages: Math.ceil(total / limit),
                    },
                },
                "Audit logs fetched successfully"
            )
        );
});

/**
 * Get audit logs for a specific user
 */
export const getAuditLogsByUser = asyncHandler(async (
    req: Request<{ userId: string }, {}, {}, { page?: string; limit?: string }>,
    res: Response
) => {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const skip = (page - 1) * limit;

    const [auditLogs, total] = await Promise.all([
        AuditLog.find({ "performedBy.userId": userId })
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit),
        AuditLog.countDocuments({ "performedBy.userId": userId }),
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200,
                {
                    data: auditLogs,
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages: Math.ceil(total / limit),
                    },
                },
                "Audit logs fetched successfully"
            )
        );
});
