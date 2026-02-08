const BASE = "/outward-gate-pass"

export const OGP_API = {
    OGP: `${BASE}`,
    CREATE: `${BASE}/create`,
    GET: (id: string) => `${BASE}/${id}`,
    UPDATE: (id: string) => `${BASE}/${id}`,
    DELETE: (id: string) => `${BASE}/${id}`,
}