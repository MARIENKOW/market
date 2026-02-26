import { getCookieValue } from "@/actions/cookies.actions";
import {
    isApiErrorResponse,
    isUnauthorizedError,
} from "@/helpers/error/error.type.helper";
import { FetchBaseOptions, fetchCustom } from "@/lib/api";
import { $apiClient } from "@/utils/api/fetch.client";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";

export const $apiUserClient = async (
    path: string,
    options: FetchBaseOptions,
) => {
    const accessToken = getCookieValue("accessToken");
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

    try {
        return $apiClient(path, {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...newHeaders },
        });
    } catch (error) {
        if (
            isApiErrorResponse(error) &&
            isUnauthorizedError(error as ApiErrorResponse)
        ) {
            try {
            } catch (error) {
                throw error;
            }
        }
    }
};
