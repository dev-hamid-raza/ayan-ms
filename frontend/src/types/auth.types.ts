import type { ApiResponse } from "./api.types"

export enum ROLES {
    ADMIN = "admin",
    USER = "user"
}

export enum MODULES {
    GATE_PASS_IN = 'GATE_PASS_IN',
    GATE_PASS_OUT = 'GATE_PASS_OUT',
    STITCHING_RATES = 'STITCHING_RATES',
}

export enum ACTIONS {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export interface IPermission {
    module?: MODULES;
    actions?: ACTIONS[];
}

export interface IUser {
	username: string
	email: string
	firstName: string
	lastName: string
    permissions: IPermission[];
    role: ROLES;
}

export interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	user: IUser
	setUser: (value: IUser) => void
	setIsAuthenticated: (value: boolean) => void;
	setLoading: (value: boolean) => void;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface IUserDataResponse {
    user: IUser
}

export type IUserResponse = ApiResponse<IUserDataResponse>