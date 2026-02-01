import { getMessageKey, MessageKeyType } from "@myorg/shared/i18n";
import { FieldMap } from "@myorg/shared/dto";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import {
    FallbackType,
    normalizeError,
} from "@/helpers/error/error.type.helper";

import { snackbarError } from "@/utils/snackbar/snackbar.error";

export function errorHandlerSnackbar({
    error,
    t,
    fallback,
}: {
    error: unknown;
    t: (key: MessageKeyType, options?: Record<string, any>) => string;
    fallback?: FallbackType;
}) {
    const errors = normalizeError({ error, fallback, t });
    const rootMsg = errors?.root?.[0];

    if (rootMsg) {
        snackbarError(rootMsg);
    }
}

export function errorFormHandlerWithAlert<T extends FieldValues>({
    error,
    setError,
    t,
    fallback,
}: {
    error: unknown;
    setError: UseFormSetError<T>;
    t: (key: MessageKeyType, options?: Record<string, any>) => string;
    fallback?: { root?: MessageKeyType };
}) {
    const errors = normalizeError<T>({ error, fallback, t });

    if (errors.root?.[0]) {
        setError("root.server", {
            type: "server",
            message: errors.root[0],
        });
    }

    if (errors.fields) {
        const fields = errors.fields as FieldMap;
        for (const key in fields) {
            setError(key as Path<T>, {
                type: "server",
                message: fields[key]?.[0],
            });
        }
    }
}
