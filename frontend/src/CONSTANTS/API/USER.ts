const BASE = '/users'

export const USER_API = {
    LOGIN: `${BASE}/login`,
    CHECK_SESSION: `${BASE}/check-session`,
    LOGOUT: `${BASE}/logout`,
    REGISTER: `${BASE}/register`,
    USERS: `${BASE}`,
    UPDATE: (id: string) => `${BASE}/${id}`,
    UPDATE_PASSWORD: (id: string) => `${BASE}/${id}/password`,
}