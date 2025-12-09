import type { AxiosRequestConfig } from "axios";

export interface PostApiParams {
    url: string;
    body?: Record<string, unknown> | FormData;
    data?: Record<string, unknown>;
    options?: AxiosRequestConfig;
}

export type RequestOptions = {
    params?: Record<string, string | number | boolean>
}

export interface GetApiResponse {
    url: string
    data?: Record<string, unknown>
    options?: AxiosRequestConfig
}

export interface ApiResponse<T> {
    data: T
    message: string
    statusCode: number
    success: boolean
}