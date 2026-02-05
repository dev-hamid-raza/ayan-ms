import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

// import routes
import userRouter from "./routes/user.route.js"
import outwardGatePassRouter from "./routes/outwardGatePass.route.js"

dotenv.config({
    path: './.env'
})

export const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/outward-gate-pass", outwardGatePassRouter)

app.use(errorHandler)