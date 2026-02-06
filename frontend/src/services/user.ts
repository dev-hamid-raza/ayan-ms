import { USER_API } from "@/CONSTANTS/API/USER" 
import { getApi, postApi } from "./apiClient"
import type { IUserListResponse, IUserResponse } from "@/types/user.types"
import type { ApiResponse } from "@/types/api.types"

export const login = async (body: {
    username: string
    password: string
}) => {
    const res = await postApi<IUserResponse>({
        url: USER_API.LOGIN,
        body
    })
    return res.data
}

export const checkSession = async () => {
    const res = await getApi<IUserResponse>({
        url: USER_API.CHECK_SESSION,
    })
    return res.data
}

export const logout = async () => {
    const res = await getApi<ApiResponse<void>>({
        url: USER_API.LOGOUT,
    })
    return res.data
}

export const registerUser = async (body: {
    username: string
    firstName: string
    lastName: string
    password: string
    permissions: {
        module?: string;
        actions?: string[];
    }[];
}) => {
    const res = await postApi<ApiResponse<IUserResponse>>({
        url: USER_API.REGISTER,
        body
    })
    return res.data
}

export const updateUser = async (body: {
    id: string
    username: string
    firstName: string
    lastName: string
    password?: string
    permissions: {
        module?: string;
        actions?: string[];
    }[];
}) => {
    const { id, ...payload } = body
    const res = await postApi<ApiResponse<null>>({
        url: USER_API.UPDATE(id),
        body: payload
    })
    return res.data
}

export const updateUserPasswordByAdmin = async (body: {
    id: string
    password: string

}) => {
    const { id, ...payload } = body
    const res = await postApi<ApiResponse<null>>({
        url: USER_API.UPDATE_PASSWORD(id),
        body: payload
    })
    return res.data
}

export const updateUserPassword = async (body: {
    oldPassword: string
    newPassword: string

}) => {
    const res = await postApi<ApiResponse<null>>({
        url: USER_API.UPDATE_OWN_PASSWORD,
        body
    })
    return res.data
}

export const fetchUsers = async () => {
    const res = await getApi<IUserListResponse>({
        url: USER_API.USERS,
    })
    return res.data
}