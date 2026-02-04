import { check } from "zod";

// packages/shared/src/routing/routes.ts
export const ENDPOINT = {
    path: "",
    auth: {
        path: "auth",
        user: {
            path: "user",
            login: {
                path: "login",
            },
            forgotPassword: {
                path: "forgot-password",
            },
            activate: {
                path: "activate",
            },
            changePassword: {
                path: "change-password",
            },
            register: {
                path: "register",
            },
            logout: {
                path: "logout",
            },
        },
    },
    user: {
        path: "user",
        me: {
            path: "me",
        },
    },
    resetPasswordToken: {
        path: "reset-password-token",
        user: {
            check: { path: "check" },
            path: "user",
        },
    },
} as const;

type EdpointConfigType = typeof ENDPOINT;

type WithStringPath<T> = {
    [K in keyof T]: T[K] extends { path: any }
        ? { path: string } & WithStringPath<Omit<T[K], "path">>
        : T[K];
};

export function buildFullPaths<T extends Record<string, any>>(
    obj: T,
    result: any = {},
    parentPath: string = "",
): WithStringPath<T> {
    const currentPath =
        parentPath === "/"
            ? `${parentPath}${obj.path}`
            : `${parentPath}/${obj.path}`;
    result.path = currentPath;
    for (const key in obj) {
        const value = obj[key];

        if (typeof value === "object") {
            buildFullPaths(obj[key], (result[key] = {}), currentPath);
        }
    }

    return result;
}

export const FULL_PATH_ENDPOINT = buildFullPaths<EdpointConfigType>(ENDPOINT);

ENDPOINT.auth.user.login.path;
FULL_PATH_ENDPOINT.auth.user.login.path;
