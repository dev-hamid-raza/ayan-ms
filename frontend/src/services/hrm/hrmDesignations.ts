import { IDesignations, IDesignationsApiResponse } from "@/types/hrm"
import { deleteApi, getApi, postApi } from "../apiClient"
import { HRM_DESIGNATION_API } from "@/CONSTANTS/API/HRM"
import { ApiResponse } from "@/types/api.types"

export const fetchDesignations = async () => {
    const res = await getApi<IDesignationsApiResponse>({
        url: HRM_DESIGNATION_API.DESIGNATIONS
    })
    return res.data
}

export const createDesignation = async (payload: {designationName: string}) => {
    const res = await postApi<ApiResponse<IDesignations>>({
        url: HRM_DESIGNATION_API.DESIGNATIONS,
        body: payload
    })
    return res.data
}

export const updateDesignation = async (payload: {id: string, designationName: string}) => {
    const res = await postApi<ApiResponse<IDesignations>>({
        url: HRM_DESIGNATION_API.UPDATE(payload.id),
        body: {designationName: payload.designationName}
    })
    return res.data
}

export const deleteDesignation = async (id: string) => {
    const res = await deleteApi<ApiResponse<null>>({
        url: HRM_DESIGNATION_API.DELETE(id)
    })
    return res.data
}