import { getUserSessionId } from "@/actions/cookies.actions";
import { FetchBaseOptions } from "@/lib/api";
import { $apiClient } from "@/lib/api/fetch.client";

export const $apiUserClient = async (
    path: string,
    options: FetchBaseOptions,
) => {
    let newHeaders = options.headers || {};
    const sessionId = await getUserSessionId();

    const defaultOptions = {
        headers: { Authorization: `Bearer ${sessionId}` },
    };

    return $apiClient(path, {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...newHeaders },
    });
};
