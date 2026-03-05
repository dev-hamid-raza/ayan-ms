import { ApiResponse } from "./api.types"

export interface IDepartments {
    _id: string
    departmentName: string
}

export type IDepartmentsApiResponse = ApiResponse<IDepartments[]>