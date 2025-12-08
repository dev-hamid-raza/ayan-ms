import { Request, NextFunction } from 'express'
import jwt, { JwtPayload } from "jsonwebtoken"

import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const verifyJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken

        if (!token) {
            throw new ApiError(401, 'Unauthorized request')
        }

        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as JwtPayload
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')

        if (!user) {
            throw new ApiError(401, 'Invalid access token')
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, (error as Error).message || 'Invalid access token')
    }
})