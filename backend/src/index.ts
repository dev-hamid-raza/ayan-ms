import dotenv from "dotenv"
import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import { app } from "./app.js"
import { connectDB } from "./db/index.js"

dotenv.config()

const port = Number(process.env.PORT) || 4000

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to cert folder
const certPath = path.join(__dirname, "../certs")

const httpsOptions = {
    key: fs.readFileSync(path.join(certPath, "app.ayan-ms.com+1-key.pem")),
    cert: fs.readFileSync(path.join(certPath, "app.ayan-ms.com+1.pem")),
}

connectDB()
    .then(() => {
        https
            .createServer(httpsOptions, app)
            .listen(port, "0.0.0.0", () => {
                console.log(`HTTPS server running at https://app.ayan-ms.com:${port}`)
            })
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error)
    })
