import { IOutwardGatePass, IOutwardGatePassCreate, IOutwardGatePassCreatedResponse, IOutwardGatePassResponse } from "@/types/outwardGatePass.types"
import { deleteApi, getApi, postApi } from "./apiClient"
import { OGP_API } from "@/CONSTANTS/API/OGP"
import { ApiResponse } from "@/types/api.types"

export const fetchOGP = async () => {
    const res = await getApi<IOutwardGatePassResponse>({
        url: OGP_API.OGP,
    })
    return res.data
}

export const fetchOGPById = async (id: string) => {
    const res = await getApi<{ success: boolean; data: IOutwardGatePass }>({
        url: OGP_API.GET(id),
    })
    return res.data
}

export const createOGP = async (data: Partial<IOutwardGatePassCreate>) => {
    const res = await postApi<IOutwardGatePassCreatedResponse>({
        url: OGP_API.CREATE,
        body: { ...data},
    })
    return res.data
}

export const updateOGP = async (payload: { id: string; data: Partial<IOutwardGatePassCreate> }) => {
    const res = await postApi<IOutwardGatePassCreatedResponse>({
        url: OGP_API.UPDATE(payload.id),
        body: { ...payload.data },
    })
    return res.data
}

export const deleteOGP = async (id: string) => {
    const res = await deleteApi<ApiResponse<null>>({
        url: OGP_API.DELETE(id),
    })
    return res.data
}