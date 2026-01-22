"use server";

import {
    getAllCookieToClient,
    getUserSessionId,
} from "@/actions/cookies.actions";
import { FetchBaseOptions } from "@/lib/api";
import { $apiServer } from "@/lib/api/fetch.server";

export const $apiUserServer = async (
    path: string,
    options: FetchBaseOptions,
) => {
    let newHeaders = options.headers || {};
    const sessionId = await getUserSessionId();

    const defaultOptions = {
        headers: { Authorization: `Bearer ${sessionId}` },
    };

    return $apiServer(path, {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...newHeaders },
    });
};
