import { ApiErrorResponse, ErrorsWithMessages } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";
import { MessageKeyType } from "@myorg/shared/i18n";

export function isApiErrorResponse(error: unknown) {
    return (
        error &&
        typeof error === "object" &&
        "errorType" in error &&
        error.errorType === "ApiErrorResponse"
    );
}
export function isAbort(error: unknown) {
    return (
        error &&
        typeof error === "object" &&
        "name" in error &&
        error.name === "AbortError"
    );
}
export function isUnauthorizedError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.Unauthorized.status;
}
export function isNotFoundError(error: ApiErrorResponse) {
    return error.status === HTTP_STATUSES.NotFound.status;
}
export function isNetworkError(error: ApiErrorResponse) {
    return (
        error.status === HTTP_STATUSES.NetworkError.status &&
        error.code === HTTP_STATUSES.NetworkError.code
    );
}
export function isAbortError(error: ApiErrorResponse) {
    return (
        error.status === HTTP_STATUSES.AbortError.status &&
        error.code === HTTP_STATUSES.AbortError.code
    );
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
    | "cancel"
    | "network"
    | "forbidden"
    | "internal"
    | "validation"
    | "notfound"
    | "unauthorized";

export function normalizeError<T extends Record<string, any> | never = never>({
    error,
    t,
}: {
    error: unknown;
    t: (key: MessageKeyType, options?: Record<string, any>) => string;
}): ErrorsWithMessages<T> {
    const context = getErrorContext(error);
    switch (context) {
        case "cancel":
            return { root: [{ message: t("api.ABORT_ERROR"), type: "error" }] };
        case "forbidden":
            return { root: [{ message: t("api.FORBIDDEN"), type: "error" }] };
        case "internal":
            return {
                root: [{ message: t("api.FALLBACK_ERR"), type: "error" }],
            };
        case "network":
            return { root: [{ message: t("api.ERR_NETWORK"), type: "error" }] };
        case "notfound":
            return { root: [{ message: t("api.NOT_FOUND"), type: "error" }] };
        case "unauthorized":
            return {
                root: [{ message: t("api.UNAUTHORIZED"), type: "error" }],
            };
        case "validation":
            const apiiError = error as ApiErrorResponse;
            return apiiError.data as ErrorsWithMessages<T>;
        case "unknown":
            return {
                root: [{ message: t("api.FALLBACK_ERR"), type: "error" }],
            };
    }
}

export function getErrorContext(error: unknown): ErrorNormalizeContext {
    if (!isApiErrorResponse(error)) return "unknown";

    const apiError = error as ApiErrorResponse;
    // 1. transport level
    if (isAbortError(apiError)) return "cancel";
    if (isNetworkError(apiError)) return "network";

    // 2. domain-level (payload)
    if (isValidationFailedError(apiError)) return "validation";

    // 3. http semantics
    if (isUnauthorizedError(apiError)) return "unauthorized";
    if (isForbiddenError(apiError)) return "forbidden";
    if (isNotFoundError(apiError)) return "notfound";
    if (isInternalServerError(apiError)) return "internal";

    return "unknown";
}
