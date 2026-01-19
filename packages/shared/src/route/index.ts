import { buildFullPaths } from "../endpoints";

export const ROUTE = {
    path: "",
    login: { path: "login" },
    register: { path: "register" },
    admin: {
        path: "admin",
    },
    superadmin: {
        path: "superadmin",
    },
} as const;

type Paths<T> = T extends object
    ? { [K in keyof T]: T[K] extends string ? T[K] : Paths<T[K]> }[keyof T]
    : never;

type Route = typeof ROUTE;

export type RouteKeys = Paths<Route>; // '/' | '/signin' | ... | '/admin'

export const FULL_PATH_ROUTE = buildFullPaths<Route>(ROUTE);
