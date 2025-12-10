// packages/shared/src/routing/routes.ts
export const route = {
    public: {
        main: "/",
        signin: "/signin",
        signup: "/signup",
    },
    admin: {
        main: "/admin",
    },
    superadmin: {
        main: "/superadmin",
    },
} as const;

export type PublicRoute = (typeof route.public)[keyof typeof route.public];

export type AdminRoute = (typeof route.admin)[keyof typeof route.admin];

export type SuperadminRoute =
    (typeof route.superadmin)[keyof typeof route.superadmin];
