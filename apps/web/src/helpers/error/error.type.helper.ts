import { ApiErrorResponse, FieldMap, FieldsErrors } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";
import { MessageKeyType } from "@myorg/shared/i18n";
import { FieldValues } from "react-hook-form";

export function isApiErrorResponse(error: unknown) {
    return (
        error &&
        typeof error === "object" &&
        "errorType" in error &&
        error.errorType === "ApiErrorResponse"
    );
}

export function isUnuathorizedError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.Unauthorized.status;
}
export function isNotFoundError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.NotFound.status;
}
export function isNetworkError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.NetworkError.status;
}
export function isInternalServerError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.InternalServerError.status;
}
export function isForbiddenError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.Forbidden.status;
}
export function isBadRequestError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.BadRequest.status;
}
export function isValidationFailedError(error: ApiErrorResponse) {
    return (
        error.status === HTTP_STATUSES.ValidationFailed.status &&
        error.code === HTTP_STATUSES.ValidationFailed.code
    );
}

export type FallbackType = {
    root?: MessageKeyType;
    forbidden?: MessageKeyType;
    network?: MessageKeyType;
};

export function normalizeError<T extends Record<string, any> | never = never>({
    error,
    t,
    fallback = {},
}: {
    error: unknown;
    t: (key: MessageKeyType, options?: Record<string, any>) => string;
    fallback?: FallbackType;
}): FieldsErrors<T> {
    if (!isApiErrorResponse(error))
        return { root: [fallback.root || t("api.FALLBACK_ERR")] };

    const apiError = error as ApiErrorResponse;
    if (isNetworkError(apiError))
        return { root: [fallback.network || t("api.ERR_NETWORK")] };
    if (isForbiddenError(apiError))
        return { root: [fallback.forbidden || t("api.FORBIDDEN")] };
    if (isInternalServerError(apiError))
        return { root: [fallback.root || t("api.FALLBACK_ERR")] };

    if (isBadRequestError(apiError)) {
        if (isValidationFailedError(apiError)) {
            return apiError.data as FieldsErrors<T>;
        }
    }

    return { root: [fallback.root || t("api.FALLBACK_ERR")] };
}
