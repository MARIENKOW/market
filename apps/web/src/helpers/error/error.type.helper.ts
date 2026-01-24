import { ApiErrorResponse } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";

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
