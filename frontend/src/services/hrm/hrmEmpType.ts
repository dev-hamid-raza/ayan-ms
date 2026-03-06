import { IEmpType, IEmpTypeApiResponse } from "@/types/hrm"
import { deleteApi, getApi, postApi } from "../apiClient"
import { HRM_EMP_TYPE_API } from "@/CONSTANTS/API/HRM"
import { ApiResponse } from "@/types/api.types"

export const fetchEmpTypes = async () => {
    const res = await getApi<IEmpTypeApiResponse>({
        url: HRM_EMP_TYPE_API.EMP_TYPES
    })
    return res.data
}

export const createEmpType = async (payload: {empType: string}) => {
    const res = await postApi<ApiResponse<IEmpType>>({
        url: HRM_EMP_TYPE_API.EMP_TYPES,
        body: payload
    })
    return res.data
}

export const updateEmpType = async (payload: {id: string, empType: string}) => {
    const res = await postApi<ApiResponse<IEmpType>>({
        url: HRM_EMP_TYPE_API.UPDATE(payload.id),
        body: {empType: payload.empType}
    })
    return res.data
}

export const deleteEmpType = async (id: string) => {
    const res = await deleteApi<ApiResponse<null>>({
        url: HRM_EMP_TYPE_API.DELETE(id)
    })
    return res.data
}