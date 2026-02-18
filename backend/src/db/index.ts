import mongoose from "mongoose";
import { logger } from "../config/logger.js";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB connected & DB HOST: ", connectionInstance.connection.host)
        logger.info("MongoDB connected & DB HOST: " + connectionInstance.connection.host)
    } catch (error) {
        logger.fatal(
            {
                message: "MongoDB connection failed",
                error
            }
        )
        console.log("MongoDB connection failed", error)
        process.exit(1)
    }
}