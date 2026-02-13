import { Document } from "mongoose";
import { ACTIONS, MODULES, ROLES } from "../config/accessControl.js";

export interface IPermission {
    module: MODULES;
    actions: ACTIONS[];
}

export interface IUser extends Document {
    username: string
    firstName: string
    lastName: string
    password: string
    refreshToken: string
    createdAt: Date
    updatedAt: Date
    role: ROLES;
    permissions: IPermission[];

    comparePassword(password: string): Promise<boolean>
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export interface IRegisterRequestBody {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: ROLES;
    permissions: IPermission[];
}

export interface IUpdateUserRequestBody {
    firstName?: string;
    lastName?: string;
    username?: string;
    permissions?: IPermission[];
}

export interface ILoginBody {
    username: string;
    password: string;
}

export interface IUpdatePasswordBody {
    oldPassword: string;
    newPassword: string;
}