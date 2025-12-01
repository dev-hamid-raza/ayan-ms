import { Request, Response } from "express"

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ILoginBody, IRegisterRequestBody } from "../types/user.types.js"
import { generateAccessTokenAndRefreshToken } from "../lib/generateJwtToken.js" 

export const registerUser = asyncHandler(async (
    req: Request<{}, {}, IRegisterRequestBody>, res: Response
) => {

    const { firstName, lastName, email, password } = req.body

    if (
        [firstName, lastName, password, email].some((field) => typeof field !== 'string' || field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(400, "This email already taken")
    }


    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully")
        )
})


export const loginUser = asyncHandler(async (req: Request<{}, {}, ILoginBody>, res: Response) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(400, "Email and password is required")
    }

    const user = await User.findOne({ username })

    if (!user) {
        throw new ApiError(400, "Invalid username")
    }
    
    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        throw new ApiError(400, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id as number)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,{user:loggedInUser},"User logged in successfully")
        )
})

export const logoutUser = asyncHandler ( async (req: Request, res: Response) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(
            new ApiResponse(200, {}, 'User logout successful')
        )
})

export const checkAuthStatus = asyncHandler(async (req: Request, res: Response) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, 'User is authenticated')
        )
})