const BASE = "/hrm"

const DEPARTMENTS = "departments"
const DESIGNATIONS = "designations"
const EMP_TYPES = "emp-types"

export const HRM_DEPARTMENT_API = {
    DEPARTMENTS: `${BASE}/${DEPARTMENTS}`,
    CREATE: `${BASE}/${DEPARTMENTS}`,
    UPDATE: (id: string) => `${BASE}/${DEPARTMENTS}/${id}`,
    DELETE: (id: string) => `${BASE}/${DEPARTMENTS}/${id}`,
}

export const HRM_DESIGNATION_API = {
    DESIGNATIONS: `${BASE}/${DESIGNATIONS}`,
    CREATE: `${BASE}/${DESIGNATIONS}`,
    UPDATE: (id: string) => `${BASE}/${DESIGNATIONS}/${id}`,
    DELETE: (id: string) => `${BASE}/${DESIGNATIONS}/${id}`,
}

export const HRM_EMP_TYPE_API = {
    EMP_TYPES: `${BASE}/${EMP_TYPES}`,
    CREATE: `${BASE}/${EMP_TYPES}`,
    UPDATE: (id: string) => `${BASE}/${EMP_TYPES}/${id}`,
    DELETE: (id: string) => `${BASE}/${EMP_TYPES}/${id}`,
}