import { buildFullPaths } from "../endpoints";

export const ROUTE = {
    path: "",
    login: { path: "login" },
    register: { path: "register" },
    profile: { path: "profile" },
    admin: {
        path: "admin",
    },
    superadmin: {
        path: "superadmin",
    },
} as const;

type Route = typeof ROUTE;

export const FULL_PATH_ROUTE = buildFullPaths<Route>(ROUTE);

export const PRIVATE_USER_PATH: string[] = [FULL_PATH_ROUTE.profile.path];

export const USER_PRIVATE_FALLBACK_ROUTE: string = FULL_PATH_ROUTE.login.path;

export const USER_PUBLIC_FALLBACK_ROUTE: string = FULL_PATH_ROUTE.profile.path;
