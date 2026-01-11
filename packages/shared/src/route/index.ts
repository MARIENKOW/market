// packages/shared/src/routing/routes.ts
export const route = {
    public: {
        main: "/",
        signin: "/signin",
        signup: "/signup",
        profile: "/profile",
    },
    admin: {
        main: "/admin",
    },
    superadmin: {
        main: "/superadmin",
    },
} as const;

export const AUTH_PRIVATE_ROUTE = [route.public.signup, route.public.signin];
export const PUBLIC_PRIVATE_ROUTE = [route.public.profile];

type Paths<T> = T extends object
    ? { [K in keyof T]: T[K] extends string ? T[K] : Paths<T[K]> }[keyof T]
    : never;

export type RoutePaths = Paths<typeof route>; // '/' | '/signin' | ... | '/admin'
