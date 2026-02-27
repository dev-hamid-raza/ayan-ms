import { ApiResponse } from "./api.types"

export type RawLog = {
    level: number
    time: number
    pid: number
    hostname: string
    message?: string
    msg?: string
    stack?: string
    method?: string
    url?: string
}

export type LogRow = {
    level: number
    time: number
    pid: number
    hostname: string
    text: string // message OR msg
    method: string
    url: string
    stack: string
}

export type IErrorLogResponse = ApiResponse<RawLog[]>