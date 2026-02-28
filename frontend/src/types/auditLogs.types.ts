import { ApiResponse } from "./api.types"

export type JsonPrimitive = string | number | boolean | null

export type JsonValue =
    | JsonPrimitive
    | { [key: string]: JsonValue }
    | JsonValue[]

export interface AuditChange {
    field: string
    oldValue: JsonValue
    newValue: JsonValue
}

export interface AuditLog {
    _id: string
    action: "CREATE" | "UPDATE" | "DELETE"
    modelName: string
    documentId: string
    changes: AuditChange[]
    timestamp: string
    performedBy: {
        userName: string
        userEmail: string
    }
}

export type IAuditErrorResponse = ApiResponse<{ data: AuditLog[] }>