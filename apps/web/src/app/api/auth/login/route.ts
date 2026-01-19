import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const res = await fetch(`${process.env.NEST_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "INVALID_CREDENTIALS" },
            { status: 401 },
        );
    }

    const { sessionId } = await res.json();

    const response = NextResponse.json({ ok: true });

    response.cookies.set("session_id", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });

    return response;
}
