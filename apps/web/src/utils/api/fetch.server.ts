"use server";

import { getAllCookieToClient } from "@/actions/cookies.actions";
import { clientEnv } from "@/config/env.client";
import { serverEnv } from "@/config/env.server";
import { FetchBaseOptions, fetchCustom, FetchCustomReturn } from "@/lib/api";

export const $apiServer = async <T>(
    path: string,
    options: FetchBaseOptions,
): FetchCustomReturn<T> => {
    const cookie = await getAllCookieToClient();

    const defaultOptions: FetchBaseOptions = {
        headers: {
            "Content-Type": "application/json",
            cookie,
        },
    };

    let newHeaders = options.headers || {};
    return await fetchCustom<T>(
        serverEnv.API_ORIGIN_SERVER +
            "/" +
            clientEnv.NEXT_PUBLIC_API_GLOBAL_PREFIX +
            path,
        {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...newHeaders },
        },
    );
};
