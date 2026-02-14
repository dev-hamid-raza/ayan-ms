import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    // Always log full error on server
    console.error("ERROR:", err);

    // Handle custom ApiError
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            data: null,
        });
        return;
    }

    // Handle MongoDB authorization error
    if (err?.code === 13) {
        res.status(403).json({
            success: false,
            message: "Database access denied",
            errors: [],
            data: null,
        });
        return;
    }

    // Handle MongoDB general errors
    if (err?.name === "MongoServerError") {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: [],
            data: null,
        });
        return;
    }

    // Production-safe default response
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        errors: [],
        data: null,
    });
};