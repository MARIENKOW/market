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

export type ErrorNormalizeContext =
    | "unknown"
    | "network"
    | "forbidden"
    | "internal"
    | "validation"
    | "notfound"
    | "unauthorized"
    | "other";

type NormilizeError<T extends Record<string, any> | never = never> = {
    messages: FieldsErrors<T>;
    context: ErrorNormalizeContext;
};
export function normalizeError<T extends Record<string, any> | never = never>({
    error,
    t,
}: {
    error: unknown;
    t: (key: MessageKeyType, options?: Record<string, any>) => string;
}): NormilizeError<T> {
    if (!isApiErrorResponse(error))
        return {
            messages: { root: [t("api.FALLBACK_ERR")] },
            context: "unknown",
        };

    const apiError = error as ApiErrorResponse;
    if (isNetworkError(apiError))
        return {
            messages: { root: [t("api.ERR_NETWORK")] },
            context: "network",
        };
    if (isForbiddenError(apiError))
        return {
            messages: { root: [t("api.FORBIDDEN")] },
            context: "forbidden",
        };
    if (isUnuathorizedError(apiError))
        return {
            messages: { root: [t("api.UNAUTHORIZED")] },
            context: "unauthorized",
        };
    if (isNotFoundError(apiError))
        return {
            messages: { root: [t("api.NOT_FOUND")] },
            context: "notfound",
        };
    if (isInternalServerError(apiError))
        return {
            messages: { root: [t("api.FALLBACK_ERR")] },
            context: "internal",
        };

    if (isBadRequestError(apiError)) {
        if (isValidationFailedError(apiError)) {
            return {
                messages: apiError.data as FieldsErrors<T>,
                context: "validation",
            };
        }
    }

    return {
        messages: { root: [t("api.FALLBACK_ERR")] },
        context: "other",
    };
}
