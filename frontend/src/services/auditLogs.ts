import { AUDIT_LOGS_API } from "@/CONSTANTS/API/AUDIT_LOGS"
import { getApi } from "./apiClient"
import { IAuditErrorResponse } from "@/types/auditLogs.types"

export const fetchAuditLogs = async () => {
    const res = await getApi<IAuditErrorResponse>({
        url: AUDIT_LOGS_API.LOG
    })

    return res.data
}