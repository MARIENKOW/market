import { clientEnv } from "@/config/env.client";
import { FetchBaseOptions, fetchCustom, FetchCustomReturn } from "@/utils/api";

const BASE_URL = `${clientEnv.NEXT_PUBLIC_API_ORIGIN_CLIENT}/${clientEnv.NEXT_PUBLIC_API_GLOBAL_PREFIX}`;

const DEFAULT_OPTIONS: FetchBaseOptions = {
    credentials: "include",

};

export const $apiClient = <T>(
    path: string,
    options: FetchBaseOptions,
): FetchCustomReturn<T> =>
    fetchCustom<T>(`${BASE_URL}${path}`, {
        ...DEFAULT_OPTIONS,
        ...options,
        headers: { ...DEFAULT_OPTIONS.headers, ...options.headers },
    });
