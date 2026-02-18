import path from "path";
import fs from "fs"
import readline from "readline"
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getLogs = asyncHandler(async (req: Request<{} ,{}, {}, {limit: number, level: string}>, res: Response) => {
    const logPath = path.join(process.cwd(), "logs", "app.log")

    if(!fs.existsSync(logPath)) {
        throw new ApiError(404, "Log file not found")
    }

    const  limit = Number(req.query.limit) || 100
    const level = req.query.level

    const stream = fs.createReadStream(logPath)

    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    const logs = []

    for await(const line of rl) {
        const trimmedLine = line.trim()
        if (!trimmedLine) {
            continue
        }

        let parsed
        try {
            parsed = JSON.parse(trimmedLine)
        } catch {
            // Skip lines that are not valid JSON
            continue
        }

        if(!level || parsed.level == level) {
            logs.push(parsed)
        }

        if(logs.length > limit) {
            logs.shift()
        }
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200, logs.reverse(), "Logs fetched successfully")
            )
})