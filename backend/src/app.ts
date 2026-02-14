import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import path from "path"
import { fileURLToPath } from "url"

import { errorHandler } from "./middlewares/errorHandler.middleware.js"

// import routes
import userRouter from "./routes/user.route.js"
import outwardGatePassRouter from "./routes/outwardGatePass.route.js"

dotenv.config({
    path: "./.env"
    path: "./.env"
})

export const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/health", (_req, res) => {

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: true
    })
})



app.use("/api/v1/users", userRouter)
app.use("/api/v1/outward-gate-pass", outwardGatePassRouter)


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const frontendPath = path.join(__dirname, "../../frontend/dist")

// Serve static files
app.use(express.static(frontendPath))

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
})


app.use(errorHandler)