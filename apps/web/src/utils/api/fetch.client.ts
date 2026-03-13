import { FetchBaseOptions, fetchCustom, FetchCustomReturn } from "@/lib/api";
import AuthUserService from "@/services/auth/user/auth.user.service";

export const $apiClient = async <T>(
    path: string,
    options: FetchBaseOptions,
): FetchCustomReturn<T> => {
    const defaultOptions: FetchBaseOptions = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let newHeaders = options.headers || {};

    return await fetchCustom<T>(
        "/" + process.env.NEXT_PUBLIC_GLOBAL_PREFIX + path,
        {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...newHeaders },
        },
    );
};
