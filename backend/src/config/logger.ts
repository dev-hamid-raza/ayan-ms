import path from "path";
import fs from "fs"
import pino from "pino";

const logDir = path.join(process.cwd(), "logs")

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

export const logger = pino(
    {
        level: process.env.LOG_LEVEL || "info"
    },
    pino.destination(path.join(logDir, "app.log"))
)