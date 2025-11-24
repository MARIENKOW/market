// export const errorFormHandler = (e, setError) => {
//     console.error(e);
//     if (
//         (e?.response?.status === 400 || e?.response?.status === 500) &&
//         e?.response?.data
//     ) {
//         const errors = e.response.data;
//         for (let key in errors) {
//             setError(key, {
//                 type: "server",
//                 message: errors[key],
//             });
//         }
//         return;
//     }
//     setError("root.server", {
//         type: "server",
//         message: "api.FALLBACK_ERR",
//     });
// };

import { AxiosError } from "axios";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

/**
 * Универсальный helper для обработки ошибок сервера в форме
 * @param e - ошибка от axios
 * @param setError - setError из useForm
 */
export function errorFormHandler<T extends FieldValues>(
    e: unknown,
    setError: UseFormSetError<T>
) {
    console.error(e);

    // проверяем, что ошибка это AxiosError
    if ((e as AxiosError)?.response) {
        const axiosError = e as AxiosError<
            Record<string, string> & { root?: { server?: string } }
        >;
        const status = axiosError.response?.status;
        const data = axiosError.response?.data;

        if ((status === 400 || status === 500) && data) {
            for (const key in data) {
                if (key !== "root") {
                    setError(key as Path<T>, {
                        type: "server",
                        message: data[key],
                    });
                }
            }

            if (data.root?.server) {
                setError("root.server" as const, {
                    type: "server",
                    message: data.root.server,
                });
            }

            return;
        }
    }

    // fallback
    console.log('FALLBACK_ERR');
    setError("root.server" as const, {
        type: "server",
        message: "api.FALLBACK_ERR",
    });
}
