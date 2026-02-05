import { IOutwardGatePassResponse } from "@/types/outwardGatePass.types"
import { getApi } from "./apiClient"
import { OGP_API } from "@/CONSTANTS/API/OGP"

export const fetchOGP = async () => {
    const res = await getApi<IOutwardGatePassResponse>({
        url: OGP_API.OGP,
    })
    return res.data
}