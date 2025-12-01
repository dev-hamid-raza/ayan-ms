import dotenv from "dotenv"

import { app } from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 4000

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log("server is running at port", port)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed",error)
    })