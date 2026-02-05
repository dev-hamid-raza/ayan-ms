const BASE = "/outward-gate-pass"

export const OGP_API = {
    OGP: `${BASE}`,
    CREATE: `${BASE}/create`,
    GET: (id: string) => `${BASE}/${id}`,
}