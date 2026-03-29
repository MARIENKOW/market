"use server";

import { getAllCookieToClient } from "@/actions/cookies.actions";
import { clientEnv } from "@/config/env.client";
import { serverEnv } from "@/config/env.server";
import { FetchBaseOptions, fetchCustom, FetchCustomReturn } from "@/utils/api";

const BASE_URL = `${serverEnv.API_ORIGIN_SERVER}/${clientEnv.NEXT_PUBLIC_API_GLOBAL_PREFIX}`;

const DEFAULT_HEADERS: FetchBaseOptions["headers"] = {};

export const $apiServer = async <T>(
    path: string,
    options: FetchBaseOptions,
): FetchCustomReturn<T> => {
    const cookie = await getAllCookieToClient();

    return fetchCustom<T>(`${BASE_URL}${path}`, {
        ...options,
        headers: { ...DEFAULT_HEADERS, cookie, ...options.headers },
    });
};
