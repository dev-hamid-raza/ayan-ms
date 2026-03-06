import { ApiResponse } from "./api.types"

export interface IDepartments {
    _id: string
    departmentName: string
}

export type IDepartmentsApiResponse = ApiResponse<IDepartments[]>

export interface IDesignations {
    _id: string
    designationName: string
}

export type IDesignationsApiResponse = ApiResponse<IDesignations[]>