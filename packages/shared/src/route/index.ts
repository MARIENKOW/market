import { buildFullPaths } from "../endpoints";

export const ROUTE = {
    path: "",
    login: { path: "login" },
    activate: { path: "activate" },
    forgotPasssword: { path: "forgot-password" },
    changePasssword: { path: "change-password" },
    register: { path: "register" },
    profile: {
        path: "profile",
        settings: {
            path: "settings",
            profile: { path: "profile" },
            password: { path: "password" },
            sessions: { path: "sessions" },
        },
    },
    admin: {
        path: "admin",
        profile: {
            path: "profile",
        },
        settings: { path: "settings" },
        login: {
            path: "login",
        },
        forgotPasssword: { path: "forgot-password" },
        changePasssword: { path: "change-password" },
    },
} as const;

type Route = typeof ROUTE;

export const FULL_PATH_ROUTE = buildFullPaths<Route>(ROUTE);

export const PRIVATE_USER_PATH: string[] = [FULL_PATH_ROUTE.profile.path];
export const PRIVATE_ADMIN_PATH: string[] = [
    FULL_PATH_ROUTE.admin.profile.path, //!неправильно
];
export const ADMIN_PATH: string[] = [FULL_PATH_ROUTE.admin.path];

export const USER_PRIVATE_FALLBACK_ROUTE: string = FULL_PATH_ROUTE.login.path;

export const USER_PUBLIC_FALLBACK_ROUTE: string = FULL_PATH_ROUTE.profile.path;

export const ADMIN_PRIVATE_FALLBACK_ROUTE: string =
    FULL_PATH_ROUTE.admin.login.path;

export const ADMIN_PUBLIC_FALLBACK_ROUTE: string = FULL_PATH_ROUTE.admin.path;
