import { getMessageKey } from "@myorg/shared/i18n";
import { ApiErrorResponse } from "@myorg/shared/types";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function errorFormHandler<T extends FieldValues>(
    e: unknown,
    setError: UseFormSetError<T>,
) {
    console.error(e);

    if (e as ApiErrorResponse) {
        const err = e as ApiErrorResponse;
        const status = err.status;
        const data = err.data;
        // if (data instanceof Object) {
        //     console.log("object");
        // }
        // console.log(data);

        // if (status && data) {
        //     for (const key in data) {
        //         if (key !== "root") {
        //             console.log(key);
        //             setError(key as Path<T>, {
        //                 type: "server",
        //                 message: data[key],
        //             });
        //         }
        //     }

        //     if (data.root?.server) {
        //         setError("root.server", {
        //             type: "server",
        //             message: data.root.server,
        //         });
        //     }

        //     return;
        // }
    }

    setError("root.server", {
        type: "server",
        message: getMessageKey("api.FALLBACK_ERR"),
    });
}
