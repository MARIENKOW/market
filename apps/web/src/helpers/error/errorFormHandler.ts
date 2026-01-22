import { getMessageKey } from "@myorg/shared/i18n";
import { ApiErrorResponse, FieldsErrors } from "@myorg/shared/dto";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function errorFormHandler<T extends FieldValues>(
    e: unknown,
    setError: UseFormSetError<T>,
) {
    console.error(e);

    if (e as ApiErrorResponse) {
        const err = e as ApiErrorResponse;
        const status = err.status;
        const code = err.code;
        const data = err.data;

        if (code === "VALIDATION_ERROR") {
            const fields = err.data as FieldsErrors<T>;
            for (const key in fields) {
                setError(key as Path<T>, {
                    type: "server",
                    message: data[key][0],
                });
            }
        } else {
            setError("root.server", {
                type: "server",
                message: getMessageKey("api.FALLBACK_ERR"),
            });
        }
    } else {
        setError("root.server", {
            type: "server",
            message: getMessageKey("api.FALLBACK_ERR"),
        });
    }
}
