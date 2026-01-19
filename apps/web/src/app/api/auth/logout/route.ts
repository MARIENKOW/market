import { getCookieValue } from "@/actions/cookies.actions";
import { NextResponse } from "next/server";

export async function POST() {
    const sessionId = getCookieValue("session_id");

    if (sessionId) {
        await db.session.update({
            where: { id: sessionId },
            data: { revokedAt: new Date() },
        });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.delete("session_id");
    return res;
}
