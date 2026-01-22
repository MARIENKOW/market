import {
    getAllCookieToClient,
    getUserSessionId,
} from "@/actions/cookies.actions";
import { FetchBaseOptions } from "@/lib/api";
import { $api } from "@/lib/api/fetch";

export const $apiUser = async (path: string, options: FetchBaseOptions) => {
    const sessionId = await getUserSessionId();

    const cookie = await getAllCookieToClient();

    return $api(path, {
        headers: { Authorization: `Bearer ${sessionId}`, cookie },
        ...options,
    });
};
