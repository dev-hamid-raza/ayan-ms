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
    ADMIN : {
        USER_MANAGEMENT: 'user-management',
    },
}