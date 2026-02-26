"use server";

import { getAllCookieToClient } from "@/actions/cookies.actions";
import { FetchBaseOptions, fetchCustom } from "@/lib/api";

export const $apiServer = async (path: string, options: FetchBaseOptions) => {
    const cookie = await getAllCookieToClient();

    const defaultOptions: FetchBaseOptions = {
        headers: {
            "Content-Type": "application/json",
            cookie,
        },
    };

    let newHeaders = options.headers || {};

    return await fetchCustom(
        "http://localhost:" +
            process.env.NEXT_PUBLIC_SERVER_PORT +
            "/" +
            process.env.NEXT_PUBLIC_GLOBAL_PREFIX +
            path,
        {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...newHeaders },
        },
    );
};
