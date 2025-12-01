import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError.js"; // adjust path

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            data: null,
        });
    } else {
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
            errors: [],
            data: null,
        });
    }
};
