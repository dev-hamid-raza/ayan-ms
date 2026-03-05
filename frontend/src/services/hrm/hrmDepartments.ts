import { HRM_DEPARTMENT_API } from "@/CONSTANTS/API/HRM"
import { deleteApi, getApi, postApi } from "../apiClient"
import { IDepartments, IDepartmentsApiResponse } from "@/types/hrm"
import { ApiResponse } from "@/types/api.types"

export const fetchDepartments = async () => {
    const res = await getApi<IDepartmentsApiResponse>({
        url: HRM_DEPARTMENT_API.DEPARTMENTS
    })
    return res.data
}

export const createDepartment = async (payload: {departmentName: string}) => {
    const res = await postApi<ApiResponse<IDepartments>>({
        url: HRM_DEPARTMENT_API.DEPARTMENTS,
        body: payload
    })
    return res.data
}

export const updateDepartment = async (payload: {id: string, departmentName: string}) => {
    const res = await postApi<ApiResponse<IDepartments>>({
        url: HRM_DEPARTMENT_API.UPDATE(payload.id),
        body: {departmentName: payload.departmentName}
    })
    return res.data
}

export const deleteDepartment = async (id: string) => {
    const res = await deleteApi<ApiResponse<null>>({
        url: HRM_DEPARTMENT_API.DELETE(id)
    })
    return res.data
}