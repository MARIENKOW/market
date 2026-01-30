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
