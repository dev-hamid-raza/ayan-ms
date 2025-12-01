import { Document } from "mongoose";

export interface IUser extends Document {
    username: string
    firstName: string
    lastName: string
    password: string
    refreshToken: string
    createdAt: Date
    updatedAt: Date

    comparePassword(password: string): Promise<boolean>
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export interface IRegisterRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILoginBody {
    username: string;
    password: string;
}