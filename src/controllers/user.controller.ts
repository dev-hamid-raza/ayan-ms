import { Request, Response } from "express"

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ILoginBody, IRegisterRequestBody, IUpdatePasswordBody, IUpdateUserRequestBody } from "../types/user.types.js"
import { generateAccessTokenAndRefreshToken } from "../lib/generateJwtToken.js"
import { validatePermissionsInput } from "../utils/validatePermissions.js"
import { ROLES } from "../config/accessControl.js"

export const registerUser = asyncHandler(async (
    req: Request<{}, {}, IRegisterRequestBody>, res: Response
) => {

    const { firstName, lastName, username, password, permissions } = req.body

    if (
        [firstName, lastName, password, username].some((field) => typeof field !== 'string' || field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const { valid, errors } = validatePermissionsInput(permissions)

    if (!valid) {
        throw new ApiError(400, "Invalid permissions payload", errors)
    }

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        throw new ApiError(400, "This username already taken")
    }


    const user = await User.create({
        firstName,
        lastName,
        username: username.toLowerCase().trim(),
        password,
        permissions,
        role: ROLES.USER
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

    if (!req.body) {
        throw new ApiError(400, "Request body is missing")
    }

    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(400, "Username and password is required")
    }

    const user = await User.findOne({ username })

    if (!user) {
        throw new ApiError(400, "Invalid username")
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        throw new ApiError(400, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

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
            new ApiResponse(200, { user: loggedInUser }, "User logged in successfully")
        )
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
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

export const updateMyPassword = asyncHandler(
    async (req: Request<{}, {}, IUpdatePasswordBody>, res: Response) => {

        if (!req.body) {
            throw new ApiError(400, "Old password and new password are required");
        }

        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            throw new ApiError(400, "Old password and new password are required");
        }

        if (!req.user?._id) {
            throw new ApiError(401, "Not authenticated");
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const isValidOld = await user.comparePassword(oldPassword);
        if (!isValidOld) {
            throw new ApiError(400, "Old password is incorrect");
        }

        // set new password – your pre-save hook should hash it
        user.password = newPassword;
        await user.save();

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Password updated successfully"));
    }
);

export const updateUser = asyncHandler(async (req: Request<{ id: string }, {}, IUpdateUserRequestBody>, res) => {
    const { id } = req.params
    const { firstName, lastName, username, permissions } = req.body

    const user = await User.findById(id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (typeof username === "string" && username.trim() !== "") {
        const existingUser = await User.findOne({ username, _id: { $ne: id } });
        if (existingUser) {
            throw new ApiError(400, "This username is already taken");
        }
        user.username = username.trim();
    }

    if (typeof firstName === "string" && firstName.trim() !== "") {
        user.firstName = firstName.trim();
    }

    if (typeof lastName === "string" && lastName.trim() !== "") {
        user.lastName = lastName.trim();
    }

    if (typeof permissions !== "undefined") {
        const { valid, errors } = validatePermissionsInput(permissions);
        if (!valid) {
            throw new ApiError(400, "Invalid permissions payload", errors);
        }
        user.permissions = permissions;
    }

    await user.save()

    const updatedUser = await User.findById(id).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUser, "User updated successfully")
        )
})

export const adminResetUserPassword = asyncHandler(async (req: Request<{ id: string }, {}, { password: string }>, res: Response) => {
        const { id } = req.params;
        const { password } = req.body;

        if (typeof password !== "string" || password.trim() === "") {
            throw new ApiError(400, "Password is required");
        }

        const user = await User.findById(id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        user.password = password.trim(); 
        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, null, "Password reset successfully by admin")
            );
    }
);