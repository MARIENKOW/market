import { isAbort, isAbortError } from "@/helpers/error/error.type.helper";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";

export interface FetchBaseOptions extends RequestInit {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: BodyInit | null;
}

export type FetchCustom = (
    path: string,
    options: FetchBaseOptions,
) => Promise<any>;

export const fetchCustom: FetchCustom = async (path, options = {}) => {
    const { ...rest } = options;

    const init: RequestInit = {
        ...rest,
    };

    let res;
    try {
        res = await fetch(path, init);
    } catch (e) {
        if (isAbort(e)) {
            throw {
                status: HTTP_STATUSES.AbortError.status,
                code: HTTP_STATUSES.AbortError.code,
                message:
                    e instanceof Error
                        ? e.message
                        : HTTP_STATUSES.AbortError.statusText,
                data: undefined,
                timestamp: new Date().toISOString(),
                path,
                context: "NETWORK",
                errorType: "ApiErrorResponse",
            } satisfies ApiErrorResponse;
        }
        throw {
            status: HTTP_STATUSES.NetworkError.status,
            code: HTTP_STATUSES.NetworkError.code,
            message:
                e instanceof Error
                    ? e.message
                    : HTTP_STATUSES.NetworkError.statusText,
            data: undefined,
            timestamp: new Date().toISOString(),
            path,
            context: "NETWORK",
            errorType: "ApiErrorResponse",
        } satisfies ApiErrorResponse;
    }

    if (!res.ok) {
        let data: any = {};
        try {
            data = await res.json();
        } catch {}

        if (data.context === "NEXT") {
            throw {
                status: res.status,
                code: data.code,
                data: data.data,
                timestamp: data.timestamp,
                path: data.path,
                message: data.message,
                context: "NEXT",
                errorType: "ApiErrorResponse",
            } satisfies ApiErrorResponse;
        } else {
            throw {
                status: res.status,
                code: data?.code ?? data?.error ?? `HTTP_${res.status}`,
                message: data?.message ?? res.statusText ?? "Request failed",
                data:
                    data?.data ?? (typeof data === "object" ? data : undefined),
                timestamp: data?.timestamp ?? new Date().toISOString(),
                path: data?.path ?? res.url,
                context: "API",
                errorType: "ApiErrorResponse",
            } satisfies ApiErrorResponse;
        }
    }
    const text = await res.text();

    try {
        const json = JSON.parse(text);
        return json;
    } catch {}
    return text;
};
