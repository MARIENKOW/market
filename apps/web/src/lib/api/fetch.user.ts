import { getUserSessionId } from "@/actions/cookies.actions";
import { FetchBaseOptions } from "@/lib/api";
import { $api } from "@/lib/api/fetch";

export const $apiUser = async (path: string, options: FetchBaseOptions) => {
    const sessionId = await getUserSessionId();

    return $api(path, {
        headers: { Authorization: `Bearer ${sessionId}` },
        ...options,
    });
};
