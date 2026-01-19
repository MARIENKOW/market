import { cookies } from "next/headers";
import { getAccess } from "@/lib/auth/access";
import { getCookieValue } from "@/actions/cookies.actions";

export async function apiFetch(path: string, init?: RequestInit) {
    const sessionId = await getCookieValue("session_id");

    if (!sessionId) throw new Error("UNAUTHORIZED");

    const access = await getAccess(sessionId);

    return fetch(`${process.env.NEST_API}${path}`, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${access}`,
        },
    });
}
