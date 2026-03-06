export const ROUTES = {
    LOGIN: '/',
    DASHBOARD: 'dashboard',
    PROFILE: '/profile',
    GATE_PASS: {
        IN: 'gate-pass-in',
        OUT: 'outward-gate-pass',
        CREATE_OGP: 'outward-gate-pass/create',
        VIEW: "outward-gate-pass/:id",
        EDIT: "outward-gate-pass/edit/:id",
    },
    HRM: {
        DEPARTMENTS: 'hrm-departments',
        DESIGNATIONS: 'hrm-designations',
        EMP_TYPE: 'hrm-emp-types',
    },
    ADMIN : {
        USER_MANAGEMENT: 'user-management',
        AUDIT_LOGS: 'audit-logs',
        ERROR_LOGS: 'error-logs',
    },
}