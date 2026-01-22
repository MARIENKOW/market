import { FetchBaseOptions, fetchCustom } from "@/lib/api";

export const $apiClient = async (path: string, options: FetchBaseOptions) => {
    const defaultOptions: FetchBaseOptions = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let newHeaders = options.headers || {};

    return fetchCustom(process.env.NEXT_PUBLIC_SERVER_API + path, {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...newHeaders },
    });
};
