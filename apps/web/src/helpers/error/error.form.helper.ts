import { getMessageKey, MessageKeyType } from "@myorg/shared/i18n";
import { ApiErrorResponse, FieldMap, FieldsErrors } from "@myorg/shared/dto";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import {
    FallbackType,
    isApiErrorResponse,
    isBadRequestError,
    isForbiddenError,
    isInternalServerError,
    isNetworkError,
    isValidationFailedError,
    normalizeError,
} from "@/helpers/error/error.type.helper";

export function errorFormHandler<T extends FieldValues>({
    error,
    setError,
    fallback = {},
}: {
    error: unknown;
    setError: UseFormSetError<T>;
    fallback?: { root?: MessageKeyType };
}) {
    console.error(error);

    if (isApiErrorResponse(error)) {
        const apiError = error as ApiErrorResponse;
        const data = apiError.data;

        if (isNetworkError(apiError))
            return setError("root.server", {
                type: "server",
                message: getMessageKey("api.ERR_NETWORK"),
            });
        if (isForbiddenError(apiError))
            return setError("root.server", {
                type: "server",
                message: getMessageKey("api.FORBIDDEN"),
            });
        if (isInternalServerError(apiError))
            return setError("root.server", {
                type: "server",
                message: fallback.root || getMessageKey("api.FALLBACK_ERR"),
            });
        if (isBadRequestError(apiError)) {
            if (isValidationFailedError(apiError)) {
                const fields = apiError.data as FieldsErrors<T>;
                for (const key in fields) {
                    setError(key as Path<T>, {
                        type: "server",
                        message: data[key][0],
                    });
                }
            }
        }
        return setError("root.server", {
            type: "server",
            message: fallback.root || getMessageKey("api.FALLBACK_ERR"),
        });
    } else {
        return setError("root.server", {
            type: "server",
            message: fallback.root || getMessageKey("api.FALLBACK_ERR"),
        });
    }
}

import { snackbarError } from "@/utils/snackbar/snackbar.error";
import { unknown } from "zod";

export function errorHandlerSnackbar({
    error,
    t,
    fallback,
}: {
    error: unknown;
    t: (key: MessageKeyType) => string;
    fallback?: FallbackType;
}) {
    const errors = normalizeError({ error, fallback });
    const rootMsg = errors?.root?.[0];

    if (rootMsg) {
        snackbarError(t(rootMsg));
    }
}

export function errorFormHandlerWithAlert<T extends FieldValues>({
    error,
    setError,
    fallback,
}: {
    error: unknown;
    setError: UseFormSetError<T>;
    fallback?: { root?: MessageKeyType };
}) {
    const errors = normalizeError<T>({ error, fallback });

    if (errors.root?.[0]) {
        setError("root.server", {
            type: "server",
            message: getMessageKey(errors.root[0]),
        });
    }

    if (errors.fields) {
        const fields = errors.fields as FieldMap;
        for (const key in fields) {
            setError(key as Path<T>, {
                type: "server",
                message: fields?.[key]?.[0],
            });
        }
    }
}
