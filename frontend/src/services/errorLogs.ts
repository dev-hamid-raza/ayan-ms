import { ERROR_LOG_API } from "@/CONSTANTS/API/ERROR_LOGS"
import { getApi } from "./apiClient"
import { IErrorLogResponse } from "@/types/errorLogs.types"

export const fetchErrorLogs = async () => {
    const res = await getApi<IErrorLogResponse>({
        url: ERROR_LOG_API.LOG
    })

    return res.data
}