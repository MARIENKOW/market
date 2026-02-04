import { getMessageKey, MessageKeyType } from "@myorg/shared/i18n";
import { FieldMap } from "@myorg/shared/dto";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import {
    ErrorNormalizeContext,
    normalizeError,
} from "@/helpers/error/error.type.helper";
import { snackbarError } from "@/utils/snackbar/snackbar.error";

type FallbackOptions = {
    message?: string;
    callback?: () => void;
    hideMessage?: boolean;
};

export type FallbackType = {
    [K in ErrorNormalizeContext]?: FallbackOptions;
};

export function errorHandler({
    error,
    t,
    fallback,
}: {
    error: unknown;
    t: (key: MessageKeyType, options?: Record<string, any>) => string;
    fallback?: FallbackType;
}) {
    const { messages, context } = normalizeError({ error, t });
    const rootMessages = messages.root || [];

    if (fallback?.[context]?.callback) fallback[context].callback();
    if (fallback?.[context]?.hideMessage) return;
    if (fallback?.[context]?.message) {
        snackbarError(fallback[context].message);
    } else {
        rootMessages.forEach((msg) => snackbarError(msg));
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
    const { messages } = normalizeError<T>({ error, t });

    if (messages.root?.[0]) {
        setError("root.server", {
            type: "server",
            message: messages.root[0],
        });
    }

    if (messages.fields) {
        const fields = messages.fields as FieldMap;
        for (const key in fields) {
            setError(key as Path<T>, {
                type: "server",
                message: fields[key]?.[0],
            });
        }
    }
}
