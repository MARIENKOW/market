import { ApiErrorResponse } from "@myorg/shared/dto";

export interface FetchBaseOptions extends Omit<RequestInit, "body"> {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: BodyInit | object | null;
    onRequest?: (init: RequestInit) => void | Promise<any>;
    onResponse?: (res: Response) => void | Promise<any>;
}

export type FetchCustom = (
    path: string,
    options: FetchBaseOptions,
) => Promise<any>;

export const fetchCustom: FetchCustom = async (path, options = {}) => {
    const { headers, body, onRequest, onResponse, ...rest } = options;

    const init: RequestInit = {
        ...rest,
        headers: {
            ...headers,
        },
        body:
            body instanceof FormData ||
            body instanceof Blob ||
            typeof body === "string"
                ? body
                : body && typeof body === "object"
                  ? JSON.stringify(body)
                  : body,
    };

    await onRequest?.(init);

    const res = await fetch(path, init);

    await onResponse?.(res);

    if (!res.ok) {
        let data: any = null;
        try {
            data = await res.json();
        } catch {}

        throw {
            status: res.status,
            code: data?.code,
            data: data?.data,
            timestamp: data?.timestamp,
            path: data?.path,
            message: data?.message ?? res.statusText,
        } satisfies ApiErrorResponse;
    }
    const text = await res.text();

    try {
        const json = JSON.parse(text);
        return json;
    } catch {}
    return text;
};
