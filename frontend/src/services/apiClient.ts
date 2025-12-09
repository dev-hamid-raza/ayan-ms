import type { AxiosResponse } from "axios"
import { axiosInstance } from "./axiosInstance"
import type { GetApiResponse, PostApiParams } from "@/types/api.types"



export const getApi = async <T>({
    url,
    options = {},
    data = {}
}: GetApiResponse
): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, {
        params: data,
        ...options
    })
}

export const postApi = <T>({
    url,
    body = {},
    data = {},
    options = {}
}: PostApiParams): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(url,body,{
        data,
        ...options
    })
}