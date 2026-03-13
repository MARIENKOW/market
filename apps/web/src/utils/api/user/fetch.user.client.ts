import { getCookieValue } from "@/actions/cookies.actions";
import {
    isApiErrorResponse,
    isUnauthorizedError,
} from "@/helpers/error/error.type.helper";
import { FetchBaseOptions, fetchCustom, FetchCustomReturn } from "@/lib/api";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { $apiClient } from "@/utils/api/fetch.client";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";

let refreshPromise: null | FetchCustomReturn<true> = null;

export const $apiUserClient = async <T>(
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

    try {
        return await $apiClient<T>(path, {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...newHeaders },
        });
    } catch (error) {
        if (
            isApiErrorResponse(error) &&
            isUnauthorizedError(error as ApiErrorResponse)
        ) {
            if (refreshPromise === null) {
                const authUser = new AuthUserService($apiClient);
                refreshPromise = authUser.refresh();
            }
            try {
                await refreshPromise;
                refreshPromise = null;
            } catch (error) {
                refreshPromise = null;
                throw error;
            }
            return $apiClient<T>(path, {
                ...defaultOptions,
                ...options,
                headers: { ...defaultOptions.headers, ...newHeaders },
            });
        }
        throw error;
    }
};
