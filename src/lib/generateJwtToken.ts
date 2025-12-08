import { Types } from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const generateAccessTokenAndRefreshToken = async (userId: Types.ObjectId) => {
    try {
        const user = await User.findById(userId)
        if(!user) {
            throw new ApiError(404,"User cannot find")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh token")
    }
}