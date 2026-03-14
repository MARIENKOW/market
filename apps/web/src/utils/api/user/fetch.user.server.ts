"use server";

import { getCookieValue } from "@/actions/cookies.actions";
import { FetchBaseOptions, FetchCustomReturn } from "@/lib/api";
import { $apiServer } from "@/utils/api/fetch.server";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";

export const $apiUserServer = async <T>(
    path: string,
    options: FetchBaseOptions,
): FetchCustomReturn<T> => {
    const accessToken = getCookieValue("accessTokenUser");
    if (!accessToken) {
        const UnauthorizedError: ApiErrorResponse = {
            code: HTTP_STATUSES.Unauthorized.code,
            status: HTTP_STATUSES.Unauthorized.status,
            message: HTTP_STATUSES.Unauthorized.statusText,
            data: null,
            timestamp: new Date().toISOString(),
            path,
            context: "NEXT",
            errorType: "ApiErrorResponse",
        };
        throw UnauthorizedError;
    }
    const defaultOptions: FetchBaseOptions = {
        headers: {
            Aauthorization: `Bearer ${accessToken}`,
        },
    };

    let newHeaders = options.headers || {};

    return await $apiServer<T>(path, {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...newHeaders },
    });
};
