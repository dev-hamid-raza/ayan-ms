import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

import { errorHandler } from "./middlewares/errorHandler.middleware.js"

// import routes
import userRouter from "./routes/user.route.js"
import outwardGatePassRouter from "./routes/outwardGatePass.route.js"

dotenv.config({
    path: "./.env"
})

export const app = express()



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.get("/health", (_req, res) => {
    res.status(200).json({
        status: true
    })
})



app.use("/api/v1/users", userRouter)
app.use("/api/v1/outward-gate-pass", outwardGatePassRouter)



// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// backend runs from: backend/dist
// frontend build is at: frontend/dist
const frontendPath = path.join(__dirname, "../../frontend/dist")

// Only serve frontend if dist exists
if (fs.existsSync(frontendPath)) {

    app.use(express.static(frontendPath))

    // SPA fallback (modern safe version)
    app.use((req, res, next) => {

        if (
            req.method === "GET" &&
            !req.path.startsWith("/api") &&
            !req.path.startsWith("/health")
        ) {
            return res.sendFile(path.join(frontendPath, "index.html"))
        }

        next()
    })

} else {
    console.warn("Frontend dist folder not found. Skipping static serving.")
}


app.use(errorHandler)
