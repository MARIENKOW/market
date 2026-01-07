import { getMessageKey } from "@myorg/shared/i18n";
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

    setError("root.server", {
        type: "server",
        message: getMessageKey("api.FALLBACK_ERR"),
    });
}
