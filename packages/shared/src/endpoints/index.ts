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
} as const;

type EdpointConfigType = typeof ENDPOINT;

export function buildFullPaths<T extends Record<string, any>>(
    obj: T,
    result: any = {},
    parentPath: string = "",
): T {
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
