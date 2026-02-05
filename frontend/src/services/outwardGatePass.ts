import { IOutwardGatePass, IOutwardGatePassResponse } from "@/types/outwardGatePass.types"
import { getApi, postApi } from "./apiClient"
import { OGP_API } from "@/CONSTANTS/API/OGP"

export const fetchOGP = async () => {
    const res = await getApi<IOutwardGatePassResponse>({
        url: OGP_API.OGP,
    })
    return res.data
}

export const createOGP = async (data: Partial<IOutwardGatePass>) => {
    const res = await postApi<IOutwardGatePassResponse>({
        url: OGP_API.CREATE,
        body: { ...data},
    })
    return res.data
}