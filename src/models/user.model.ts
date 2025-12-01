import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { IUser } from "../types/user.types.js";
import { JwtExpiry } from "../types/common.types.js";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return 
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (err) {
        throw err
    }
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY as JwtExpiry
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY as JwtExpiry
        }
    )
}

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)