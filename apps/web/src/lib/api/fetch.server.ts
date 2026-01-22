"use server";

import { getAllCookieToClient } from "@/actions/cookies.actions";
import { FetchBaseOptions, fetchCustom } from "@/lib/api";

export const $apiServer = async (path: string, options: FetchBaseOptions) => {
    const cookie = await getAllCookieToClient();
    const defaultOptions: FetchBaseOptions = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            cookie,
        },
    };

    let newHeaders = options.headers || {};

    return fetchCustom(process.env.NEXT_PUBLIC_SERVER_API + path, {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...newHeaders },
    });
};
