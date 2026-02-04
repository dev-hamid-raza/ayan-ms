import { getApi } from "./apiClient"

export const fetchOGP = async () => {
    const res = await getApi<IUserListResponse>({
        url: USER_API.USERS,
    })
    return res.data
}